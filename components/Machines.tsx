import React from 'react';
import { MACHINES } from '../constants';
import { CheckCircle2 } from 'lucide-react';
import Reveal from './Reveal';

const Machines: React.FC = () => {
  return (
    <section id="technology" className="py-32 bg-forest-900 text-cream-50 relative overflow-hidden">
      
      {/* Background Gradients & Texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sage-500/10 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-black/40 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div className="max-w-2xl">
               <div className="flex items-center gap-3 mb-6">
                 <div className="h-px w-8 bg-sage-500"></div>
                 <span className="text-sage-400 font-bold tracking-widest uppercase text-xs">Advanced Modalities</span>
               </div>
               <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-none">
                 The Intersection of <br/>
                 <span className="italic text-sage-400 font-light">Wisdom & Tech</span>
               </h2>
               <p className="text-cream-200/60 font-light leading-relaxed text-lg max-w-xl">
                  We elevate holistic skincare with non-invasive, clinical-grade technology. No harsh lasers, just pure energy and vibration working in harmony with your body.
               </p>
            </div>
            
            <div className="hidden md:block text-right">
               <div className="inline-flex flex-col items-end gap-1">
                 <span className="text-3xl font-serif text-white">4</span>
                 <span className="text-[10px] uppercase tracking-widest text-sage-500">Key Technologies</span>
               </div>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {MACHINES.map((machine, index) => (
            <Reveal key={machine.id} delay={index * 0.15}>
              <div 
                className="group relative bg-white/5 border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 transition-all duration-500 hover:border-sage-500/30 hover:-translate-y-1 overflow-hidden h-full"
              >
                {/* Subtle gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-sage-900/0 via-sage-900/0 to-sage-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-forest-950 border border-forest-800 flex items-center justify-center group-hover:scale-110 group-hover:border-sage-500/50 transition-all duration-500 shadow-xl">
                      <machine.icon className="text-sage-300 w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                       <CheckCircle2 className="w-4 h-4 text-sage-500" />
                       <span className="text-[10px] uppercase tracking-wider text-sage-300">FDA Cleared</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-serif text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">{machine.name}</h3>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-sage-500 mb-6 border border-sage-500/20 px-3 py-1 rounded-full">
                    {machine.type}
                  </span>
                  
                  <p className="text-cream-200/70 leading-relaxed font-light text-sm border-l border-white/10 pl-4 group-hover:border-sage-500/50 transition-colors">
                    {machine.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        
        {/* Decorative footer for section */}
        <div className="mt-24 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-white/20 text-xs font-mono uppercase tracking-widest">
           <span>Glow Organic Technology Suite</span>
           <span className="hidden md:inline">est. 2024</span>
           <span>San Francisco, CA</span>
        </div>

      </div>
    </section>
  );
};

export default Machines;