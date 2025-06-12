import React, { useEffect, RefObject } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  preloaderRef: RefObject<HTMLDivElement>;
  onLoadComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ preloaderRef, onLoadComplete }) => {
  useEffect(() => {
    // Start preloader animation
    if (!preloaderRef.current) return;
    
    // Ensure preloader is fully visible before starting animation
    gsap.set(preloaderRef.current, { 
      opacity: 1
    });
    
    // Animate loading progress
    gsap.to(preloaderRef.current.querySelector('.preloader-progress'), {
      width: '100%',
      duration: 2,
      ease: 'power2.inOut'
    });
    
    // Simulate waiting for all content to load
    const timer = setTimeout(() => {
      if (!preloaderRef.current) return;
      
      // Fade out preloader
      gsap.to(preloaderRef.current, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
          onLoadComplete();
        }
      });
    }, 2500); // Adjust timing as needed
    
    return () => clearTimeout(timer);
  }, [preloaderRef, onLoadComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 bg-[#0a0f0d] flex flex-col items-center justify-center"
      style={{ pointerEvents: 'all' }}
    >
      {/* Background effects */}
      <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] rounded-full opacity-20 bg-gradient-to-r from-[#00d4aa] to-[#0066ff] blur-[100px] animate-[pulse_8s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] rounded-full opacity-15 bg-gradient-to-r from-[#0066ff] to-[#00d4aa] blur-[120px] animate-[pulse_12s_ease-in-out_2s_infinite]"></div>
      
      {/* Logo */}
      <div className="mb-12 relative">
        <div className="border-gradient w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center">
          <div className="border-gradient-content flex items-center justify-center w-full h-full">
            <span className="text-gradient font-bold text-4xl">O</span>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mb-6 relative">
        <div className="preloader-progress h-full w-0 bg-gradient-to-r from-[#00d4aa] to-[#0066ff] rounded-full"></div>
      </div>
      
      {/* Text */}
      <div className="text-white/70 text-sm">
        Loading Outlabverse...
      </div>
      
      {/* Stats - showing random percentages that increment */}
      <div className="absolute bottom-8 flex justify-center gap-8 text-xs text-white/40">
        <div>Assets: <span className="text-[#00d4aa]">100%</span></div>
        <div>Modules: <span className="text-[#00d4aa]">100%</span></div>
        <div>Environment: <span className="text-[#00d4aa]">100%</span></div>
      </div>
    </div>
  );
};

export default Preloader; 