import React, { useState, useRef, useEffect } from 'react';
import { NavLink, ChatMessage } from '../types';
import { getSkincareAdvice } from '../services/geminiService';
import { Sparkles, Send, Bot, User, Loader2, ArrowRight } from 'lucide-react';

const GlowAI: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello. I am your personal skin concierge. How is your skin feeling today?" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userText = query;
    setQuery('');
    setLoading(true);

    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    const aiResponse = await getSkincareAdvice(userText);
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setLoading(false);
  };

  return (
    <section id={NavLink.CONSULT} className="py-32 bg-forest-900 relative overflow-hidden text-cream-50">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forest-800 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sage-900 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="text-center mb-16">
          <span className="text-sage-400 font-bold tracking-widest uppercase text-xs mb-4 block">Digital Consultation</span>
          <h2 className="text-4xl md:text-5xl font-serif text-cream-50 mb-6">
            Intelligent Skin <span className="italic text-sage-300">Analysis</span>
          </h2>
          <p className="text-cream-200/60 max-w-lg mx-auto font-light leading-relaxed">
            Our AI concierge is trained on our holistic protocols. Describe your concerns to receive a tailored regimen recommendation.
          </p>
        </div>

        <div className="bg-forest-800/30 backdrop-blur-md rounded-2xl border border-forest-800/50 overflow-hidden shadow-2xl flex flex-col h-[600px]">
          
          {/* Header */}
          <div className="p-4 border-b border-forest-800/50 bg-forest-900/50 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-cream-200">Glow Concierge Online</span>
            </div>
            <Sparkles className="h-4 w-4 text-sage-400" />
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8 scroll-smooth no-scrollbar">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                   <div className="flex-shrink-0 w-8 h-8 rounded-full border border-sage-500/30 flex items-center justify-center text-sage-300">
                     <Bot size={14} />
                   </div>
                )}
                
                <div 
                  className={`max-w-[85%] sm:max-w-[70%] p-5 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-cream-100 text-forest-900 rounded-2xl rounded-tr-none' 
                      : 'bg-forest-800/50 border border-forest-700 text-cream-50 rounded-2xl rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cream-100 flex items-center justify-center text-forest-900">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-4">
                 <div className="flex-shrink-0 w-8 h-8 rounded-full border border-sage-500/30 flex items-center justify-center text-sage-300">
                     <Bot size={14} />
                   </div>
                <div className="bg-forest-800/50 border border-forest-700 px-5 py-3 rounded-2xl rounded-tl-none flex items-center gap-3">
                  <Loader2 className="animate-spin text-sage-300" size={14} />
                  <span className="text-sage-300/70 text-xs tracking-wide">Analysing skin profile...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-forest-900/80 border-t border-forest-800">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your concern here..."
                className="w-full pl-6 pr-14 py-4 bg-forest-800/50 border border-forest-700 rounded-xl focus:outline-none focus:border-sage-500 text-cream-50 placeholder-forest-500/50 transition-colors font-light"
              />
              <button 
                type="submit" 
                disabled={loading || !query.trim()}
                className="absolute right-2 top-2 bottom-2 w-10 bg-cream-100 text-forest-900 rounded-lg flex items-center justify-center hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlowAI;