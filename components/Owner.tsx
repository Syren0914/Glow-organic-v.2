import React from 'react';
import Reveal from './Reveal';

const Owner: React.FC = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sage-50 rounded-bl-full -mr-16 -mt-16 z-0 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cream-50 rounded-tr-full -ml-24 -mb-24 z-0 opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Image Column */}
          <div className="w-full lg:w-5/12 relative group order-1">
             <Reveal delay={0.2}>
               {/* Image Frame */}
               <div className="relative aspect-[3/4] overflow-hidden rounded-[3rem] shadow-2xl shadow-forest-900/10">
                  <img 
                     src="/about.jpeg" 
                     alt="Zula, Founder of Glow Organic" 
                     className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />
                  {/* Overlay gradient for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/20 to-transparent mix-blend-multiply"></div>
               </div>
               
               {/* Floating Stats Badge */}
               <div className="absolute -bottom-8 -right-8 bg-cream-50 p-6 md:p-8 rounded-full shadow-xl border border-white hidden md:block hover:-translate-y-1 transition-transform duration-300">
                  <p className="text-center font-serif text-forest-900 text-sm leading-tight">
                      <span className="block text-3xl font-bold mb-1 text-sage-600">Pure</span>
                      Holistic<br/>Wellness
                  </p>
               </div>
             </Reveal>
          </div>

          {/* Text Column */}
          <div className="w-full lg:w-7/12 order-2">
            <Reveal>
              <div className="inline-flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-sage-500"></div>
                  <span className="text-sage-600 font-bold tracking-widest uppercase text-xs">The Founder</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-serif text-forest-900 mb-6 leading-none">
                Zula <br/><span className="italic text-sage-600 font-light">Owner & Founder</span>
              </h2>
              
              <div className="space-y-6 text-forest-900/80 font-light leading-relaxed text-lg border-l-2 border-cream-200 pl-6 md:pl-0 md:border-none">
                <p>
                  Welcome to Glow Organic! I'm Zula, the proud owner and founder of this skincare sanctuary. With a passion for holistic beauty and wellness, I created Glow Organic to provide a welcoming space where everyone can discover their healthiest skin.
                </p>
                
                <h4 className="text-xl font-serif text-forest-900 mt-8 mb-2">My Journey</h4>
                <p>
                  My journey in skincare began years ago when I realized the profound impact that self-care and proper skincare can have on one's confidence and overall well-being. Each treatment at Glow Organic is thoughtfully designed to address your unique skin concerns while promoting relaxation and rejuvenation.
                </p>

                <h4 className="text-xl font-serif text-forest-900 mt-8 mb-2">My Passion</h4>
                <p>
                  At Glow Organic, my mission is to empower my clients to embrace their inherent glow. I am committed to continuous education in the latest skincare techniques and trends, ensuring that you receive the highest quality care and the best results possible.
                </p>
              </div>

              <div className="mt-12 flex items-end gap-4 pt-8 border-t border-cream-200/50">
                 <div className="flex flex-col">
                     <p className="font-serif italic text-lg text-forest-900 opacity-90 mb-4">"I look forward to guiding you on your journey to glowing, healthy skin!"</p>
                     <span className="font-serif text-2xl text-forest-900">Zula</span>
                     <span className="text-[10px] uppercase tracking-[0.2em] text-sage-500 mt-1">Founder Signature</span>
                 </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Owner;