import React, { useEffect, useMemo, useState, Fragment } from 'react';
import { Leaf, Check, Clock, DollarSign, LogOut, ChevronRight, Save, Home, Plus } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { ServiceCategory, ServiceItem } from '../types';
import { getSupabaseClient } from '../services/supabaseClient';
import { useServiceMenu } from '../services/useServiceMenu';

const AdminPanel: React.FC = () => {
  const supabase = getSupabaseClient();
  const { categories, loading, error, usingFallback, reload } = useServiceMenu();
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [justSavedId, setJustSavedId] = useState<string | null>(null);
  const [editableCategories, setEditableCategories] = useState<ServiceCategory[]>([]);

  const adminEmails = useMemo(() => {
    const raw = (import.meta.env.VITE_ADMIN_EMAILS as string | undefined) ?? '';
    return raw
      .split(',')
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);
  }, []);

  const isAdmin =
    !!session?.user?.email &&
    (adminEmails.length === 0 || adminEmails.includes(session.user.email.toLowerCase()));

  useEffect(() => {
    setEditableCategories(categories);
  }, [categories]);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, [supabase]);

  const updateCategoryField = (categoryId: string, field: keyof ServiceCategory, value: string) => {
    setEditableCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId ? { ...category, [field]: value } : category
      )
    );
  };

  const updateItemField = (
    categoryId: string,
    itemId: string,
    field: keyof ServiceItem,
    value: string
  ) => {
    setEditableCategories((prev) =>
      prev.map((category) => {
        if (category.id !== categoryId) return category;
        return {
          ...category,
          items: category.items.map((item) =>
            item.id === itemId ? { ...item, [field]: value } : item
          )
        };
      })
    );
  };

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    setAuthError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      setAuthError(signInError.message);
    } else {
      setPassword('');
      window.location.hash = '#AdminPanel';
    }
  };

  const handleGoogleSignIn = async () => {
    if (!supabase) return;
    setAuthError(null);

    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/#AdminPanel'
      }
    });

    if (signInError) {
      setAuthError(signInError.message);
    }
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const handleSaveCategory = async (category: ServiceCategory): Promise<boolean> => {
    if (!supabase) return false;
    if (usingFallback) {
      setSaveError('Supabase is not connected. Edits cannot be saved.');
      return false;
    }
    setSavingId(category.id);
    setSaveError(null);

    const { data, error: updateError } = await supabase
      .from('service_categories')
      .update({
        title: category.title,
        description: category.description,
        sort_order: category.sortOrder ?? null
      })
      .eq('id', category.id)
      .select('id');

    if (updateError) {
      setSaveError(updateError.message);
      await reload();
      setSavingId(null);
      return false;
    } else if (!data || data.length === 0) {
      setSaveError('No rows updated. Ensure your account is listed in admin_users.');
      await reload();
      setSavingId(null);
      return false;
    } else {
      await reload();
      setSavingId(null);
      return true;
    }
  };

  const handleSaveItem = async (item: ServiceItem, categoryId: string): Promise<boolean> => {
    if (!supabase) return false;
    if (usingFallback) {
      setSaveError('Supabase is not connected. Edits cannot be saved.');
      return false;
    }
    setSavingId(item.id);
    setSaveError(null);

    const { data, error: updateError } = await supabase
      .from('service_items')
      .update({
        title: item.title,
        description: item.description,
        price: item.price,
        duration: item.duration,
        sort_order: item.sortOrder ?? null,
        category_id: categoryId
      })
      .eq('id', item.id)
      .select('id');

    if (updateError) {
      setSaveError(updateError.message);
      await reload();
      setSavingId(null);
      return false;
    } else if (!data || data.length === 0) {
      setSaveError('No rows updated. Ensure your account is listed in admin_users.');
      await reload();
      setSavingId(null);
      return false;
    } else {
      await reload();
      setSavingId(null);
      return true;
    }
  };

  const handleAddCategory = async () => {
    if (!supabase) return;
    if (usingFallback) {
      setSaveError('Supabase is not connected. New categories cannot be saved.');
      return;
    }
    setSavingId('new-category');
    
    const { data, error: insertError } = await supabase
      .from('service_categories')
      .insert({
        title: 'New Category',
        description: 'Describe this category',
        sort_order: editableCategories.length
      })
      .select()
      .single();

    if (insertError) {
      setSaveError(insertError.message);
    } else {
      await reload();
      if (data) setActiveCategoryId(data.id);
    }
    setSavingId(null);
  };

  const handleAddItem = async (categoryId: string) => {
    if (!supabase) return;
    if (usingFallback) {
      setSaveError('Supabase is not connected. New items cannot be saved.');
      return;
    }
    setSavingId('new-item');

    const activeCat = editableCategories.find(c => c.id === categoryId);
    if (!activeCat) return;

    const { error: insertError } = await supabase
      .from('service_items')
      .insert({
        category_id: categoryId,
        title: 'New Service',
        description: 'Service description',
        price: '$0.00',
        duration: '30 min',
        sort_order: activeCat.items.length
      });

    if (insertError) {
      setSaveError(insertError.message);
    } else {
      await reload();
    }
    setSavingId(null);
  };

  // Auto-select first category on load
  useEffect(() => {
    if (editableCategories.length > 0 && !activeCategoryId) {
      setActiveCategoryId(editableCategories[0].id);
    }
  }, [editableCategories, activeCategoryId]);

  // Also ensure selection when data loads after auth
  useEffect(() => {
    if (!loading && categories.length > 0 && !activeCategoryId) {
      setActiveCategoryId(categories[0].id);
    }
  }, [loading, categories, activeCategoryId]);

  const activeCategory = useMemo(() => 
    editableCategories.find(c => c.id === activeCategoryId),
    [editableCategories, activeCategoryId]
  );

  const onSaveComplete = (id: string) => {
    setJustSavedId(id);
    setTimeout(() => setJustSavedId(null), 2000);
  };

  const wrapSaveCategory = async (cat: ServiceCategory) => {
    const success = await handleSaveCategory(cat);
    if (success) onSaveComplete(cat.id);
  };

  const wrapSaveItem = async (item: ServiceItem, catId: string) => {
    const success = await handleSaveItem(item, catId);
    if (success) onSaveComplete(item.id);
  };


  if (!supabase) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-cream-200 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogOut className="text-red-500 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif text-forest-900 mb-4">Configuration Missing</h2>
          <p className="text-forest-800/60 text-sm leading-relaxed">
            Please add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your environment variables to enable the editor.
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="fixed inset-0 min-h-screen z-[100] bg-cream-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-forest-900/5 overflow-hidden flex flex-col md:flex-row border border-cream-200">
          
          {/* Branding Side */}
          <div className="md:w-1/2 bg-forest-900 p-12 text-cream-50 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sage-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-sage-500/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-12">
                 <Leaf className="w-8 h-8 text-sage-400" />
                 <span className="text-3xl font-serif tracking-widest text-cream-50">
                   glow <span className="italic font-light text-sage-400">organic</span>
                 </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-6">
                Owner <br/>
                <span className="italic text-sage-400">Portal</span>
              </h1>
              <p className="text-cream-200/60 font-light leading-relaxed max-w-xs">
                Secure access to manage your menu, pricing, and service descriptions.
              </p>
            </div>

            <div className="relative z-10 pt-12 text-[#9daaa2]">
               <a href="/" className="text-xs font-bold uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2">
                 ← Return to main site
               </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:w-1/2 p-12 flex flex-col justify-center">
            <div className="mb-10 text-center md:text-left text-[#102319]">
              <h2 className="text-2xl font-serif mb-2">Welcome Back</h2>
              <p className="text-forest-800/40 text-sm">Sign in to your administration panel</p>
            </div>

            <div className="space-y-6">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border border-cream-300 text-forest-900 text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-cream-50 hover:border-sage-300 transition-all duration-300 shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign in with Google
              </button>

              <div className="relative flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-cream-300"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#102319]/20">OR</span>
                <div className="flex-1 h-px bg-cream-300"></div>
              </div>

              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#102319]/60 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full bg-cream-50 border border-cream-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-sage-300 transition-all text-[#102319]"
                    placeholder="owner@gloworganic.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#102319]/60 ml-1">
                    Security Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full bg-cream-50 border border-cream-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-sage-300 transition-all text-[#102319]"
                    placeholder="••••••••"
                    required
                  />
                </div>
                
                {authError && (
                  <div className="bg-red-50 border border-red-100 p-3 rounded-xl text-xs text-red-600 animate-shake">
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-forest-900 text-cream-50 text-xs font-bold uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-forest-800 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-forest-900/10"
                >
                  Authenticate
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center p-6 text-[#102319]">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl border border-cream-200 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogOut className="text-red-500 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif mb-4">Access Restricted</h2>
          <p className="text-forest-800/60 text-sm leading-relaxed mb-8">
            Signed in as <span className="font-semibold">{session.user.email}</span>, but this address is not authorized for portal access.
          </p>
          <button onClick={handleSignOut} className="text-xs font-bold uppercase tracking-widest text-sage-600 border-b border-sage-200 pb-1">Sign in with different account</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCF9] flex flex-col text-[#102319]">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-[#F0EDE6] z-50 px-6 lg:px-10 flex items-center justify-between">
        <div className="flex items-center gap-6">
           <a href="/" className="flex items-center gap-2 p-2 px-3 hover:bg-[#F8F6F1] rounded-xl transition-colors text-forest-800">
              <Home className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Back to Site</span>
           </a>
           <div className="h-6 w-px bg-[#F0EDE6]"></div>
           <div className="flex items-center gap-3">
              <Leaf className="w-6 h-6 text-sage-500" />
              <h2 className="text-xl font-serif">Menu <span className="italic font-light text-sage-600 ml-1">Editor</span></h2>
           </div>
        </div>

        <div className="flex items-center gap-6">
           <span className="text-[10px] font-bold uppercase tracking-widest text-forest-800/40 hidden sm:block">
              Authenticated: <span className="text-forest-800/80">{session.user.email}</span>
           </span>
           <button
             onClick={handleSignOut}
             className="px-5 py-2.5 bg-forest-900 text-cream-50 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-forest-800 transition-all shadow-md shadow-forest-900/10 flex items-center gap-2"
           >
             <LogOut className="w-3.5 h-3.5" />
             Sign Out
           </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 pt-20 flex overflow-hidden">
        
        {/* Sidebar Navigation */}
        <aside className="w-80 bg-white border-r border-[#F0EDE6] hidden lg:flex flex-col overflow-y-auto">
          <div className="p-8">
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sage-600 mb-6 block">Categories</span>
             <nav className="space-y-1">
                {editableCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategoryId(category.id)}
                    className={`w-full text-left px-5 py-4 rounded-2xl transition-all flex items-center justify-between group ${
                      activeCategoryId === category.id 
                        ? 'bg-cream-100 text-forest-900 shadow-sm border border-[#E9E4D9]' 
                        : 'text-forest-800/50 hover:bg-[#FDFCF9] hover:text-forest-900'
                    }`}
                  >
                    <span className={`text-sm tracking-wide ${activeCategoryId === category.id ? 'font-semibold' : 'font-medium'}`}>
                      {category.title || 'Untitled Category'}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeCategoryId === category.id ? 'translate-x-1 opacity-100' : 'opacity-0'}`} />
                  </button>
                ))}
                 
                 <button
                   onClick={handleAddCategory}
                   disabled={savingId === 'new-category'}
                   className="w-full mt-4 flex items-center gap-3 px-5 py-4 text-sage-600 hover:text-forest-900 hover:bg-sage-50 rounded-2xl transition-all border border-dashed border-sage-200"
                 >
                   <Plus className="w-4 h-4" />
                   <span className="text-xs font-bold uppercase tracking-widest">Add Category</span>
                 </button>
              </nav>
          </div>
        </aside>

        {/* Editor Body */}
        <main className="flex-1 overflow-y-auto bg-[#FDFCF9] p-6 lg:p-12">
          {(usingFallback || error) && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                {usingFallback && (
                  <p>
                    Supabase data is not loading. You are seeing local fallback data and edits
                    cannot be saved.
                  </p>
                )}
                {error && (
                  <p className="mt-2 text-amber-900/80">
                    Supabase error: {error}
                  </p>
                )}
              </div>
            </div>
          )}
          {activeCategory ? (
            <div className="max-w-4xl mx-auto space-y-12">
              
              {/* Category Header Editor */}
              <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-[#F0EDE6]">
                 <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-sage-500">Selected Category</span>
                    <button
                      onClick={() => wrapSaveCategory(activeCategory)}
                      disabled={savingId === activeCategory.id}
                      className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                        justSavedId === activeCategory.id 
                          ? 'bg-sage-600 text-white' 
                          : 'bg-cream-100 text-forest-900 border border-[#E9E4D9] hover:bg-cream-200'
                      }`}
                    >
                      {justSavedId === activeCategory.id ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                      {savingId === activeCategory.id ? 'Updating...' : justSavedId === activeCategory.id ? 'Saved' : 'Save Category'}
                    </button>
                 </div>

                 <div className="space-y-6">
                    <input
                      value={activeCategory.title}
                      onChange={(e) => updateCategoryField(activeCategory.id, 'title', e.target.value)}
                      className="text-4xl md:text-5xl font-serif text-forest-900 w-full border-none focus:ring-0 p-0 placeholder-forest-900/10"
                      placeholder="Category Title"
                    />
                    <textarea
                      value={activeCategory.description}
                      onChange={(e) => updateCategoryField(activeCategory.id, 'description', e.target.value)}
                      className="w-full text-lg font-light text-forest-800/60 border-none focus:ring-0 p-0 resize-none min-h-[60px]"
                      placeholder="Describe this service category..."
                    />
                 </div>
              </section>

              {/* Service Items Grid/List */}
              <section className="space-y-6">
                 <div className="flex items-center justify-between px-2">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-forest-900">Service Items <span className="font-light text-forest-800/40 ml-1">({activeCategory.items.length})</span></h3>
                 </div>

                 <div className="grid gap-6">
                    {activeCategory.items.map((item) => (
                      <div 
                        key={item.id} 
                        className="group bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#F0EDE6] transition-all hover:shadow-md hover:border-sage-200"
                      >
                         <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
                            
                            {/* Information Inputs */}
                            <div className="flex-1 space-y-4">
                               <input
                                 value={item.title}
                                 onChange={(e) => updateItemField(activeCategory.id, item.id, 'title', e.target.value)}
                                 className="text-xl font-serif text-forest-900 w-full border-none focus:ring-0 p-0 placeholder-forest-900/20"
                                 placeholder="Service Name"
                               />
                               <textarea
                                 value={item.description}
                                 onChange={(e) => updateItemField(activeCategory.id, item.id, 'description', e.target.value)}
                                 className="w-full text-sm font-light text-forest-800/60 border-none focus:ring-0 p-0 resize-none min-h-[40px]"
                                 placeholder="Add a detailed description of the service..."
                               />
                            </div>

                            {/* Settings / Pricing */}
                            <div className="lg:w-80 grid grid-cols-2 gap-4">
                               <div className="relative">
                                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-sage-500" />
                                  <input
                                    value={item.price}
                                    onChange={(e) => updateItemField(activeCategory.id, item.id, 'price', e.target.value)}
                                    className="w-full bg-[#FDFCF9] border border-[#F0EDE6] rounded-xl pl-10 pr-4 py-3 text-xs font-bold text-forest-900 focus:border-sage-300 transition-colors"
                                    placeholder="0.00"
                                  />
                               </div>
                               <div className="relative">
                                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-sage-500" />
                                  <input
                                    value={item.duration}
                                    onChange={(e) => updateItemField(activeCategory.id, item.id, 'duration', e.target.value)}
                                    className="w-full bg-[#FDFCF9] border border-[#F0EDE6] rounded-xl pl-10 pr-4 py-3 text-xs font-bold text-forest-900 focus:border-sage-300 transition-colors"
                                    placeholder="55 min"
                                  />
                               </div>
                               <button
                                 onClick={() => wrapSaveItem(item, activeCategory.id)}
                                 disabled={savingId === item.id}
                                 className={`col-span-2 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                                   justSavedId === item.id 
                                     ? 'bg-sage-600 text-white shadow-lg shadow-sage-600/20' 
                                     : 'bg-forest-900 text-cream-50 hover:bg-forest-800'
                                 }`}
                               >
                                 {justSavedId === item.id ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                                 {savingId === item.id ? 'Saving...' : justSavedId === item.id ? 'Changes Saved' : 'Update Service'}
                               </button>
                            </div>

                         </div>
                       </div>
                     ))}

                     <button
                       onClick={() => handleAddItem(activeCategory.id)}
                       disabled={savingId === 'new-item'}
                       className="w-full py-10 bg-cream-50 border-2 border-dashed border-cream-200 rounded-[2rem] text-forest-900/40 hover:text-sage-600 hover:border-sage-200 hover:bg-sage-50/30 transition-all flex flex-col items-center justify-center gap-3 group"
                     >
                       <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                         <Plus className="w-6 h-6" />
                       </div>
                       <span className="text-xs font-bold uppercase tracking-[0.2em]">Add New Service Item</span>
                     </button>
                  </div>
              </section>

              {saveError && (
                 <div className="bg-red-50 border border-red-100 p-6 rounded-[2rem] flex items-center gap-4 text-red-700 animate-shake">
                    <LogOut className="w-6 h-6 rotate-180" />
                    <div>
                       <p className="font-bold text-sm">Update Failed</p>
                       <p className="text-xs opacity-80">{saveError}</p>
                    </div>
                 </div>
              )}

            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center">
               <div className="space-y-4">
                  <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-6">
                     <Leaf className="w-8 h-8 text-sage-400" />
                  </div>
                  <h3 className="text-2xl font-serif text-forest-900">Select a category</h3>
                  <p className="text-forest-800/40 max-w-xs mx-auto text-sm leading-relaxed">Choose a service classification from the sidebar to begin editing.</p>
               </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
