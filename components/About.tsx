import React from 'react';
import { NavLink } from '../types';
import Reveal from './Reveal';

const About: React.FC = () => {
  return (
    <section id={NavLink.ABOUT} className="py-32 bg-cream-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="relative">
          {/* Decorative Text */}
          <div className="absolute -top-20 -left-20 text-[10rem] md:text-[15rem] font-serif text-cream-200 pointer-events-none select-none opacity-60">
            pure
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <Reveal>
                <span className="text-sage-600 font-bold tracking-widest uppercase text-xs mb-4 block">Our Philosophy</span>
                <h2 className="text-4xl md:text-5xl font-serif text-forest-900 mb-8 leading-tight">
                  Rooted in Botanical Wisdom, <br/>
                  <span className="italic text-sage-600">Refined by Science.</span>
                </h2>
                <div className="space-y-6 text-forest-800/80 font-light text-lg leading-relaxed text-justify">
                  <p>
                    Glow Organic was born from a desire to strip away the unnecessary. We believe that skincare shouldn't be complicated, nor should it be chemical-laden. It should be a moment of pause—a breath of fresh air for your skin and your spirit.
                  </p>
                  <p>
                    Our studio uses exclusively cold-pressed oils, raw botanical extracts, and mineral-rich clays. We reject synthetic fragrances and harsh preservatives in favor of ingredients that work in harmony with your skin's microbiome.
                  </p>
                  <p className="pt-4 border-t border-cream-300">
                    <span className="font-semibold text-forest-900">Clinical Partnership:</span> We are proud to collaborate with <a href="https://mywellnessphysicians.com" target="_blank" rel="noopener noreferrer" className="text-sage-600 hover:text-forest-900 transition-colors underline underline-offset-4 decoration-sage-300">My Wellness Physicians</a> to bridge the gap between holistic skincare and medical-grade wellness.
                  </p>
                </div>
                
                <div className="mt-12 p-8 bg-white border border-cream-200 rounded-xl">
                   <p className="font-serif italic text-2xl text-forest-900 mb-4">"The skin is a mirror of our internal health. We treat it with the reverence it deserves."</p>
                   <span className="text-xs font-bold uppercase tracking-widest text-sage-600">— Founder</span>
                </div>
              </Reveal>
            </div>

            {/* Right Images */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-6 order-1 lg:order-2 items-center">
              <Reveal delay={0.2} className="mt-12">
                <img 
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop" 
                  alt="Spa treatment close up" 
                  className="rounded-t-[10rem] rounded-b-2xl w-full h-80 md:h-[500px] object-cover shadow-2xl shadow-forest-900/5"
                />
              </Reveal>
              <Reveal delay={0.4}>
                <img 
                  src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1000&auto=format&fit=crop" 
                  alt="Botanical ingredients" 
                  className="rounded-b-[10rem] rounded-t-2xl w-full h-64 md:h-[400px] object-cover shadow-xl shadow-forest-900/5"
                />
              </Reveal>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;