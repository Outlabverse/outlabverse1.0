'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FloatingElements = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  const addToElementsRef = (el: HTMLDivElement) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Random movement for floating elements
    elementsRef.current.forEach((el) => {
      const randomX = Math.random() * 100 - 50;
      const randomY = Math.random() * 100 - 50;
      const randomDuration = 10 + Math.random() * 20;
      const randomDelay = Math.random() * 5;

      gsap.set(el, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0.2 + Math.random() * 0.3,
      });

      gsap.to(el, {
        x: `+=${randomX}`,
        y: `+=${randomY}`,
        rotation: Math.random() * 360,
        duration: randomDuration,
        delay: randomDelay,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    });

    return () => {
      // Cleanup
      elementsRef.current.forEach((el) => {
        gsap.killTweensOf(el);
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
      {/* Floating circles, squares, and other elements */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`circle-${i}`}
          ref={addToElementsRef}
          className="absolute rounded-full blur-sm"
          style={{
            width: 20 + Math.random() * 80,
            height: 20 + Math.random() * 80,
            background: `rgba(${Math.random() * 100 + 50}, ${Math.random() * 100 + 50}, ${Math.random() * 200 + 55}, 0.1)`,
          }}
        />
      ))}
      
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={`square-${i}`}
          ref={addToElementsRef}
          className="absolute blur-sm"
          style={{
            width: 20 + Math.random() * 60,
            height: 20 + Math.random() * 60,
            transform: `rotate(${Math.random() * 45}deg)`,
            background: `rgba(${Math.random() * 100 + 120}, ${Math.random() * 50 + 50}, ${Math.random() * 200 + 55}, 0.08)`,
          }}
        />
      ))}
      
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={`triangle-${i}`}
          ref={addToElementsRef}
          className="absolute w-0 h-0 blur-sm"
          style={{
            borderLeft: `${15 + Math.random() * 30}px solid transparent`,
            borderRight: `${15 + Math.random() * 30}px solid transparent`,
            borderBottom: `${30 + Math.random() * 60}px solid rgba(${Math.random() * 150 + 105}, ${Math.random() * 100 + 100}, ${Math.random() * 200 + 55}, 0.07)`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements; 