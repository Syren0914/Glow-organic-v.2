import React, { useEffect, useState } from 'react';
import { NavLink } from '../types';
import { ArrowDown } from 'lucide-react';
import Reveal from './Reveal';

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section id={NavLink.HOME} className="relative h-[95vh] min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-cream-100">
      
      {/* Background with Split Layout Design */}
      <div className="absolute inset-0 z-0 flex">
        {/* Left Side (Color Block on large screens) */}
        <div className="hidden lg:block w-[40%] bg-cream-200 h-full relative border-r border-cream-300">
             <div className="absolute inset-0 bg-noise opacity-50"></div>
        </div>
        
        {/* Right Side (Image) */}
        <div className="w-full lg:w-[60%] h-full relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop" 
            alt="Minimalist aesthetic skincare texture" 
            className={`w-full h-full object-cover opacity-90 transition-transform duration-[2s] ease-out ${loaded ? 'scale-100' : 'scale-110'}`}
          />
          <div className="absolute inset-0 bg-forest-900/10 mix-blend-multiply"></div>
        </div>
      </div>

      {/* Floating Content Card */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center">
        <div className="lg:w-1/2 flex flex-col justify-center items-start">
           <div className="bg-cream-100/80 backdrop-blur-sm p-8 md:p-12 lg:bg-transparent lg:p-0 rounded-2xl lg:rounded-2xl shadow-sm lg:shadow-none border border-cream-200 lg:border-none">
              <Reveal delay={0.2}>
                <span className="inline-block text-forest-800 text-xs font-bold tracking-[0.2em] uppercase mb-6 border border-forest-800/30 px-3 py-1 rounded-full">
                  Est. 2024 • Glow Organic Studio
                </span>
              </Reveal>
              
              <Reveal delay={0.4}>
                <h1 className="text-5xl md:text-7xl xl:text-8xl font-serif text-forest-900 leading-[0.95] mb-8">
                  Slow Beauty <br/>
                  <span className="italic font-light text-sage-600">Rituals</span>
                </h1>
              </Reveal>

              <Reveal delay={0.6}>
                <p className="text-lg text-forest-800/80 mb-10 max-w-md font-light leading-relaxed">
                  Reconnect with your skin’s innate rhythm through our curated selection of our treatments and botanical science.
                </p>
              </Reveal>
              
              <Reveal delay={0.8}>
                <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                  <a 
                    href="https://book.squareup.com/appointments/y2pscmw5yy6gci/location/L0VK989FSAD40/services"
                    className="px-10 py-4 bg-forest-900 text-cream-50 rounded-full font-medium tracking-wide hover:bg-forest-800 transition-all text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300"
                  >
                    Book Appointment
                  </a>
                  <a 
                    href={`#${NavLink.SERVICES}`}
                    className="px-10 py-4 border border-forest-900/30 text-forest-900 rounded-full font-medium tracking-wide hover:bg-forest-900 hover:text-cream-50 transition-all text-center hover:-translate-y-1 transform duration-300"
                  >
                    Explore Menu
                  </a>
                </div>
              </Reveal>
           </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 lg:left-12 lg:translate-x-0 z-20 animate-bounce">
        <Reveal delay={1.2}>
          <ArrowDown className="text-forest-900 h-6 w-6 opacity-60" />
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;