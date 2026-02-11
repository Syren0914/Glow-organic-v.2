import React from 'react';
import { NavLink } from '../types';
import Reveal from './Reveal';
import { useServiceMenu } from '../services/useServiceMenu';

const Services: React.FC = () => {
  const { categories, loading } = useServiceMenu();
  return (
    <section id={NavLink.SERVICES} className="py-32 bg-cream-50 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-24">
          <Reveal>
            <span className="text-sage-600 font-bold tracking-widest uppercase text-xs mb-4 block">Treatment Menu</span>
            <h2 className="text-5xl md:text-7xl font-serif text-forest-900 mb-6">
              Curated <span className="italic text-sage-600">Offerings</span>
            </h2>
            <p className="text-forest-800/60 max-w-2xl mx-auto font-light leading-relaxed">
              A thoughtful collection of treatments designed to balance effective clinical results with deep restoration.
            </p>
          </Reveal>
        </div>

        {/* Menu Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {loading && (
            <div className="lg:col-span-2 text-center text-sm text-forest-800/60">
              Loading menu...
            </div>
          )}

          {categories.map((category, idx) => (
            <Reveal 
              key={category.id} 
              delay={idx * 0.15}
              className={`flex flex-col ${
                idx === categories.length - 1 && categories.length % 2 !== 0 
                  ? 'lg:col-span-2 lg:max-w-3xl lg:mx-auto w-full' 
                  : ''
              }`}
            >
              <div 
                className="bg-white p-8 md:p-12 rounded-t-[3rem] rounded-b-xl border border-cream-200 shadow-sm flex flex-col h-full"
              >
                <div className="text-center mb-12">
                   <h3 className="text-3xl font-serif text-forest-900 mb-3">{category.title}</h3>
                   <div className="w-12 h-px bg-sage-300 mx-auto mb-4"></div>
                   <p className="text-xs font-bold uppercase tracking-widest text-sage-500">{category.description}</p>
                </div>

                <div className="space-y-10 flex-grow">
                  {category.items.map((item) => (
                    <div key={item.id} className="group relative">
                      <div className="flex justify-between items-baseline mb-2 relative z-10 bg-white">
                        <h4 className="text-xl font-serif text-forest-900 group-hover:text-sage-700 transition-colors pr-4">{item.title}</h4>
                        <div className="flex-grow border-b border-dotted border-cream-400 mx-4 opacity-50"></div>
                        <span className="text-lg font-medium text-forest-900 flex-shrink-0">{item.price}</span>
                      </div>
                      <div className="flex justify-between items-center gap-4">
                         <p className="text-sm text-forest-800/60 font-light max-w-[80%] leading-relaxed">{item.description}</p>
                         <span className="text-xs text-sage-500 uppercase tracking-wider flex-shrink-0">{item.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-cream-100 text-center">
                   <a 
                     href="#book" 
                     className="inline-block px-8 py-3 bg-forest-900 text-cream-50 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-sage-600 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg"
                   >
                     Book {category.title}
                   </a>
                </div>
              </div>
            </Reveal>
          ))}

        </div>

        {/* Bottom Note */}
        <div className="text-center mt-20">
           <Reveal delay={0.5}>
             <p className="text-forest-800/50 italic font-serif">
               * All treatments include a consultation to customize products to your skin type.
             </p>
           </Reveal>
        </div>

      </div>
    </section>
  );
};

export default Services;
