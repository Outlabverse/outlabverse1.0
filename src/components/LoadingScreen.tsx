'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!loaderRef.current || !progressBarRef.current || !progressTextRef.current) return;
    
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out the loader
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            if (onLoadingComplete) {
              onLoadingComplete();
            }
            
            // After animation completes, hide the loader
            if (loaderRef.current) {
              loaderRef.current.style.display = 'none';
            }
          }
        });
      }
    });
    
    // Initial loader animation
    tl.from(logoRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: 'power2.out'
    })
    .to(progressBarRef.current, {
      width: '100%',
      duration: 1.5,
      ease: 'power1.inOut'
    }, '0');
    
    // Progress counter animation
    const progress = { value: 0 };
    tl.to(progress, {
      value: 100,
      duration: 1.5,
      ease: 'power1.inOut',
      onUpdate: () => {
        if (progressTextRef.current) {
          progressTextRef.current.textContent = `${Math.round(progress.value)}%`;
        }
      }
    }, '0');
    
    // Create some "loading" elements
    const loadItems = Array.from({ length: 3 }).map(() => {
      const item = document.createElement('div');
      item.className = 'h-px w-full bg-accent/20 mb-1';
      return item;
    });
    
    // Add the loading bars
    const loadingBars = document.createElement('div');
    loadingBars.className = 'absolute bottom-20 left-1/2 transform -translate-x-1/2 w-20';
    loadItems.forEach(item => loadingBars.appendChild(item));
    loaderRef.current.appendChild(loadingBars);
    
    // Animate the loading bars
    gsap.fromTo(loadItems, 
      { scaleX: 0, transformOrigin: 'left center' },
      { 
        scaleX: 1, 
        stagger: 0.2,
        repeat: 2,
        duration: 0.5,
        ease: 'power1.inOut',
        yoyo: true
      }
    );
    
    return () => {
      tl.kill();
    };
  }, [onLoadingComplete]);
  
  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <div ref={logoRef} className="relative mb-12">
        <Image 
          src="/outlabverse-logo.svg" 
          alt="Outlabverse Logo" 
          width={150} 
          height={60}
          priority
        />
      </div>
      
      <div className="w-64 h-[2px] bg-foreground/10 rounded-full overflow-hidden relative">
        <div 
          ref={progressBarRef}
          className="absolute top-0 left-0 h-full w-0 bg-accent rounded-full"
        ></div>
      </div>
      
      <div 
        ref={progressTextRef}
        className="mt-4 text-sm text-foreground/60 font-[family-name:var(--font-montserrat)] tracking-wider"
      >
        0%
      </div>
      
      {/* Text that appears during loading */}
      <div className="absolute bottom-10 font-[family-name:var(--font-italiana)] text-foreground/30 text-center max-w-xs">
        <p>Expanding the universe</p>
      </div>
    </div>
  );
};

export default LoadingScreen; 