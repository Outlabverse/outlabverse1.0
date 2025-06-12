'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const FloatingElements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Animate elements on mount
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Get all floating elements
    const floatingElements = containerRef.current.querySelectorAll('.floating-element');
    
    // Initial animation to position elements
    gsap.fromTo(floatingElements, 
      { 
        y: 100, 
        opacity: 0,
        scale: 0.8
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        stagger: 0.1, 
        duration: 1.5, 
        ease: "power3.out",
        delay: 0.5
      }
    );
    
    // Setup continuous floating animations with different timings
    floatingElements.forEach((element, index) => {
      // Create a unique timeline for each element
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { ease: "power1.inOut" }
      });
      
      // Randomize animation parameters
      const duration = 3 + Math.random() * 5; // Between 3-8 seconds
      const yDistance = 10 + Math.random() * 20; // Between 10-30px
      const rotateAmount = (Math.random() - 0.5) * 15; // Between -7.5 and 7.5 degrees
      const delay = index * 0.2; // Stagger start times
      
      // Create the floating animation
      tl.to(element, {
        y: `-=${yDistance}`,
        rotate: rotateAmount,
        duration: duration / 2
      })
      .to(element, {
        y: `+=${yDistance}`,
        rotate: -rotateAmount,
        duration: duration / 2
      });
      
      // Start the timeline with delay
      tl.delay(delay).play();
    });
  }, []);
  
  // Update elements position based on mouse movement
  useEffect(() => {
    if (!containerRef.current) return;
    
    const elements = containerRef.current.querySelectorAll('.parallax-element');
    
    elements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      // Get data attributes
      const depth = parseFloat(htmlElement.dataset.depth || '5');
      
      // Apply transform based on mouse position and depth
      gsap.to(element, {
        x: mousePosition.x * depth * 50,
        y: mousePosition.y * depth * 50,
        duration: 1,
        ease: 'power2.out'
      });
    });
  }, [mousePosition]);
  
  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {/* Larger decorative elements with depth */}
      <div 
        className="floating-element parallax-element absolute top-[15%] left-[10%] w-40 h-40 border border-white/10 rounded-full backdrop-blur-md opacity-30"
        data-depth="2"
      >
        <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-[#00d4aa]/10 to-[#0066ff]/10"></div>
      </div>
      
      <div 
        className="floating-element parallax-element absolute bottom-[20%] right-[15%] w-64 h-64 border border-white/10 rounded-full backdrop-blur-md opacity-20"
        data-depth="3"
      >
        <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-[#0066ff]/10 to-[#00d4aa]/10"></div>
      </div>
      
      {/* Smaller geometric shapes */}
      <div 
        className="floating-element parallax-element absolute top-[40%] right-[30%] w-24 h-24 border border-white/10 rounded-xl backdrop-blur-sm transform rotate-45 opacity-40"
        data-depth="6"
      >
        <div className="absolute inset-[1px] rounded-xl bg-gradient-to-br from-[#0f1714]/50 to-[#1a201d]/50"></div>
      </div>
      
      <div 
        className="floating-element parallax-element absolute bottom-[40%] left-[25%] w-16 h-16 border border-white/10 rounded-md backdrop-blur-sm transform rotate-12 opacity-30"
        data-depth="8"
      >
        <div className="absolute inset-[1px] rounded-md bg-gradient-to-br from-[#1a201d]/50 to-[#0f1714]/50"></div>
      </div>
      
      {/* Small dots and particles */}
      {Array.from({ length: 8 }).map((_, index) => {
        // Generate random positions
        const top = `${Math.random() * 80 + 10}%`;
        const left = `${Math.random() * 80 + 10}%`;
        const size = Math.random() * 6 + 2; // Between 2-8px
        const depth = Math.random() * 8 + 2; // Between 2-10
        
        return (
          <div 
            key={index}
            className="floating-element parallax-element absolute rounded-full bg-white opacity-50"
            style={{ 
              top, 
              left, 
              width: `${size}px`, 
              height: `${size}px` 
            }}
            data-depth={depth}
          />
        );
      })}
      
      {/* Gradient accent blobs with blur */}
      <div 
        className="floating-element absolute top-[25%] right-[20%] w-56 h-56 rounded-full opacity-20 bg-gradient-to-r from-[#00d4aa] to-[#0066ff] blur-[60px]"
        style={{ zIndex: -5 }}
      ></div>
      
      <div 
        className="floating-element absolute bottom-[35%] left-[15%] w-72 h-72 rounded-full opacity-15 bg-gradient-to-r from-[#0066ff] to-[#00d4aa] blur-[80px]"
        style={{ zIndex: -5 }}
      ></div>
      
      {/* Border gradient elements */}
      <div 
        className="floating-element parallax-element absolute top-[10%] right-[40%] border-gradient w-20 h-20 rounded-full overflow-hidden"
        data-depth="4"
      >
        <div className="border-gradient-content opacity-70"></div>
      </div>
      
      <div 
        className="floating-element parallax-element absolute bottom-[15%] left-[40%] border-gradient w-16 h-24 rounded-xl overflow-hidden"
        data-depth="5"
      >
        <div className="border-gradient-content opacity-60"></div>
      </div>
      
      {/* Decorative lines */}
      <div 
        className="floating-element parallax-element absolute top-[30%] left-[20%] w-[200px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-[30deg]"
        data-depth="3"
      ></div>
      
      <div 
        className="floating-element parallax-element absolute bottom-[25%] right-[25%] w-[300px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent transform -rotate-[20deg]"
        data-depth="2"
      ></div>
      
      {/* Grid pattern section */}
      <div 
        className="floating-element absolute bottom-0 left-0 w-full h-[30vh] opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to top, black, transparent)',
          zIndex: -3
        }}>
      </div>
    </div>
  );
};

export default FloatingElements; 