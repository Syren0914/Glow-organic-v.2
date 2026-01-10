import React from 'react';
import { NavLink } from '../types';
import { Mail, MapPin, Phone, CalendarCheck, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';

const Contact: React.FC = () => {
  return (
    <section id={NavLink.CONTACT} className="bg-forest-900 text-cream-100 pt-32 pb-0 border-t border-forest-800 relative">
       {/* Background pattern */}
       <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pb-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column: Info */}
          <Reveal>
            <div>
              <h2 className="text-5xl md:text-7xl font-serif mb-12 text-cream-50 leading-none">
                Visit Our <br/> <span className="text-sage-400 italic">Sanctuary</span>
              </h2>
              
              <div className="space-y-12 font-light text-cream-200/80">
                 <div className="flex gap-6 group">
                   <div className="w-12 h-12 rounded-full border border-forest-700 flex items-center justify-center flex-shrink-0 group-hover:border-sage-500 transition-colors">
                      <MapPin className="h-5 w-5 text-sage-400" />
                   </div>
                   <div>
                     <h4 className="text-lg font-serif text-white mb-2">Location</h4>
                     <p className="leading-relaxed">1604 Village Market Blvd SE <br/>Leesburg, VA 20175</p>
                   </div>
                 </div>
                 
                 <div className="flex gap-6 group">
                   <div className="w-12 h-12 rounded-full border border-forest-700 flex items-center justify-center flex-shrink-0 group-hover:border-sage-500 transition-colors">
                      <Mail className="h-5 w-5 text-sage-400" />
                   </div>
                   <div>
                     <h4 className="text-lg font-serif text-white mb-2">Inquiries</h4>
                     <p className="leading-relaxed">hello@gloworganic.com<br/>+1 (703) 501-9963</p>
                   </div>
                 </div>

                 <div className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-full border border-forest-700 flex items-center justify-center flex-shrink-0 group-hover:border-sage-500 transition-colors">
                      <CalendarCheck className="h-5 w-5 text-sage-400" />
                   </div>
                   <div>
                     <h4 className="text-lg font-serif text-white mb-2">Studio Hours</h4>
                     <p className="leading-relaxed">Monday, Tuesday <br/>10:00 AM - 7:00 PM</p>
                     <p className="leading-relaxed">Wednesday <br/>10:00 AM - 4:00 PM</p>
                   </div>
                 </div>
              </div>

              <div className="mt-16 flex gap-8 pl-4">
                 {['Instagram', 'Pinterest', 'Spotify'].map(social => (
                   <a key={social} href="#" className="text-xs uppercase tracking-widest text-forest-500 hover:text-white transition-colors">{social}</a>
                 ))}
              </div>
            </div>
          </Reveal>

          {/* Right Column: Booking Card */}
          <Reveal delay={0.2}>
            <div id="book" className="bg-cream-100 p-8 md:p-14 rounded-[2rem] shadow-2xl shadow-black/20 text-forest-900 text-center relative overflow-hidden">
               
               {/* Decorative */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-sage-200 rounded-bl-full -mr-8 -mt-8 opacity-50"></div>
               
               <h3 className="text-3xl md:text-4xl font-serif mb-6 relative z-10">Ready to Glow?</h3>
               <p className="text-forest-800/70 mb-10 leading-relaxed font-light relative z-10">
                 All appointments are securely booked through our partner portal. Select your preferred time and specialized treatment.
               </p>

               <a 
                 href="https://squarespace.com" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-block w-full bg-forest-900 text-cream-50 font-bold uppercase tracking-[0.2em] py-5 rounded-xl hover:bg-forest-800 transition-all hover:scale-[1.02] shadow-lg relative z-10"
               >
                 Book on Squarespace
               </a>

               <p className="mt-6 text-xs text-forest-500 uppercase tracking-wider relative z-10">
                Regular pop-up appointments at My Wellness Physicians
               </p>
            </div>
          </Reveal>

        </div>
      </div>

      {/* Enhanced Google Map Section */}
      <Reveal className="w-full" delay={0.4}>
        <div className="w-full h-[600px] relative group border-t border-forest-800 overflow-hidden">
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7395.0980775326325!2d-77.52734691383074!3d39.08944375295299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b63db11ddd70d5%3A0xd68ecba81a2ddb02!2s1604%20Village%20Market%20Blvd%20SE%2C%20Leesburg%2C%20VA%2020175!5e1!3m2!1sen!2sus!4v1768020027340!5m2!1sen!2sus" 
             width="100%" 
             height="100%" 
             style={{border:0, filter: 'grayscale(100%) opacity(0.9) contrast(1.1)'}} 
             allowFullScreen={true} 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
             className="w-full h-full transition-all duration-700 ease-in-out group-hover:filter-none group-hover:opacity-100"
             title="Clinic Location"
           ></iframe>
           
           {/* Floating Location Card */}
           <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-12 bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl max-w-xs w-[90%] md:w-auto border border-white/50 transition-all duration-500 md:hover:-translate-y-2">
              <h4 className="font-serif text-forest-900 text-2xl mb-2">Find Us</h4>
              <p className="text-forest-800/70 text-sm mb-6 leading-relaxed">
                Located in the heart of the district, offering a serene retreat from the city noise. Valet parking available.
              </p>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group inline-flex items-center text-xs font-bold uppercase tracking-widest text-sage-600 hover:text-forest-900 transition-colors"
              >
                Get Directions
                <ArrowUpRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
           </div>
           
           {/* Map Overlay to ease transition */}
           <div className="absolute inset-0 bg-forest-900/10 pointer-events-none group-hover:bg-transparent transition-colors duration-700"></div>
        </div>
      </Reveal>

      {/* Footer Links */}
      <div className="bg-forest-950 py-8 border-t border-forest-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-forest-500 uppercase tracking-wider">
          <p>© 2024 Glow Organic.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-cream-200 transition-colors">Privacy</a>
            <a href="#" className="hover:text-cream-200 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;