import React, { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';

const Loader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${progress === 100 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative flex flex-col items-center">
        {/* Animated Leaf */}
        <div className="mb-8 animate-bounce-slow">
          <Leaf className="w-12 h-12 text-sage-500" />
        </div>

        {/* Brand Text */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif tracking-widest text-forest-900 mb-2">
            glow <span className="italic font-light text-sage-600">organic</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-sage-500 font-bold">
            pure • holistic • wellness
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-48 h-[1px] bg-cream-200 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-sage-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-forest-800/20">
          Loading Sanctuary
        </span>
      </div>

      {/* Background Decorative */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-sage-50/30 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-cream-50/50 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default Loader;
