import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Machines from './components/Machines';
import About from './components/About';
import Owner from './components/Owner';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [isAdminPage, setIsAdminPage] = React.useState(window.location.hash === '#AdminPanel');
  const [showLoader, setShowLoader] = React.useState(true);

  React.useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setShowLoader(false);
    }, 2800); // Slightly longer than the internal loader timer to ensure smooth transition

    const handleHashChange = () => {
      setIsAdminPage(window.location.hash === '#AdminPanel');
      if (window.location.hash !== '#AdminPanel') {
         // Optionally scroll to top or target if needed when leaving admin
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearTimeout(loaderTimer);
    };
  }, []);

  if (isAdminPage) {
    return (
      <div className="min-h-screen bg-cream-50 selection:bg-sage-200 selection:text-sage-900">
        <AdminPanel />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden selection:bg-sage-200 selection:text-sage-900">
      {showLoader && <Loader />}
      <Navbar />
      <main className={`transition-opacity duration-1000 ${showLoader ? 'opacity-0' : 'opacity-100'}`}>
        <Hero />
        <Services />
        <Machines />
        <About />
        <Owner />
        <Contact />
      </main>
    </div>
  );
};

export default App;
