import React, { useState, useEffect } from 'react';
import { Leaf, Menu, X } from 'lucide-react';
import { NAVIGATION_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 100; // Height of navbar plus some breathing room
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-700 ease-in-out ${
        scrolled 
          ? 'bg-cream-100/90 backdrop-blur-md py-4 shadow-sm shadow-stone-200/20' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="cursor-pointer group" onClick={scrollToTop}>
              <span className={`text-3xl md:text-4xl font-serif tracking-wide transition-colors duration-300 ${scrolled ? 'text-forest-900' : 'text-forest-900'}`}>
                glow <span className="font-semibold italic text-sage-600 group-hover:text-forest-900 transition-colors duration-500">organic</span>.
              </span>
            </div>
            <a 
              href="#AdminPanel" 
              className="text-sage-500 opacity-60 hover:opacity-100 hover:text-forest-900 transition-all duration-300 transform hover:scale-110 px-2"
              title="Admin Portal"
            >
               <Leaf className="w-5 h-5 animate-pulse" />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            <div className="flex space-x-10">
              {NAVIGATION_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xs font-bold tracking-[0.2em] uppercase text-forest-800 hover:text-sage-600 transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-2 left-0 w-0 h-px bg-sage-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
            
            <a 
              href="#book"
              onClick={(e) => handleNavClick(e, '#book')}
              className="group relative overflow-hidden bg-forest-900 text-cream-50 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Book Visit</span>
              <div className="absolute inset-0 bg-sage-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-forest-900 hover:text-sage-600 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-8 w-8 stroke-1" /> : <Menu className="h-8 w-8 stroke-1" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-0 left-0 w-full h-screen bg-cream-50 z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
         <button
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-6 text-forest-900 focus:outline-none"
          >
            <X className="h-8 w-8 stroke-1" />
          </button>

        <div className="flex flex-col space-y-8 items-center text-center">
          {NAVIGATION_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-forest-900 text-3xl font-serif italic hover:text-sage-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="w-12 h-px bg-sage-300 my-4"></div>
          <a 
            href="https://book.squareup.com/appointments/y2pscmw5yy6gci/location/L0VK989FSAD40/services"
            onClick={(e) => handleNavClick(e, '#book')}
            className="text-sm font-bold uppercase tracking-widest text-forest-900 border-b border-forest-900 pb-1 cursor-pointer"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;