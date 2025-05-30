'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import WebGLEffect from '@/components/WebGLEffect';
import SplitText from '@/components/SplitText';
import MagneticButton from '@/components/MagneticButton';
import gsap from 'gsap';

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Custom cursor tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.15,
          ease: 'power2.out',
        });
      }
      
      if (cursorDotRef.current) {
        gsap.to(cursorDotRef.current, {
          x: e.clientX, 
          y: e.clientY,
          duration: 0.1,
          ease: 'power1.out',
        });
      }
    };
    
    // Interactive elements for cursor effects
    const handleLinkHover = () => {
      if (cursorRef.current && cursorDotRef.current) {
        cursorRef.current.classList.add('cursor-hover');
        cursorDotRef.current.classList.add('cursor-dot-hover');
      }
    };
    
    const handleLinkLeave = () => {
      if (cursorRef.current && cursorDotRef.current) {
        cursorRef.current.classList.remove('cursor-hover');
        cursorDotRef.current.classList.remove('cursor-dot-hover');
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleLinkHover);
      el.addEventListener('mouseleave', handleLinkLeave);
    });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkHover);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-x-hidden cursor-none bg-background text-foreground flex flex-col items-center justify-center"
    >
      {/* WebGL background effect */}
      <WebGLEffect />
      
      {/* Custom Cursor */}
      <div 
        ref={cursorRef} 
        className="cursor-main fixed pointer-events-none w-8 h-8 rounded-full border-2 border-accent -translate-x-1/2 -translate-y-1/2 z-50"
      ></div>
      <div 
        ref={cursorDotRef} 
        className="cursor-dot fixed pointer-events-none w-1.5 h-1.5 rounded-full bg-accent -translate-x-1/2 -translate-y-1/2 z-50"
      ></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <SplitText 
          text="404" 
          as="h1"
          className="font-[family-name:var(--font-italiana)] text-9xl md:text-[12rem] lg:text-[16rem] tracking-wider text-foreground/90 mb-6 glitch"
        />
        
        <SplitText
          text="Page Not Found"
          as="h2"
          className="font-[family-name:var(--font-dm-serif)] text-3xl md:text-4xl tracking-wide text-foreground/80 mb-12"
        />
        
        <p className="text-foreground/60 max-w-md mx-auto mb-12 font-[family-name:var(--font-montserrat)]">
          It seems you&apos;ve ventured into an unexplored part of our universe. 
          Let&apos;s get you back to familiar territories.
        </p>
        
        <Link href="/" passHref>
          <MagneticButton className="px-10 py-4 bg-accent text-white hover:bg-accent/90 transition-colors duration-300 tracking-wider text-sm uppercase font-[family-name:var(--font-montserrat)]">
            Return Home
          </MagneticButton>
        </Link>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-[15%] left-[10%] w-32 h-32 rounded-full bg-accent/5 blur-3xl"></div>
      <div className="absolute bottom-[20%] right-[10%] w-40 h-40 rounded-full bg-accent/10 blur-3xl"></div>
      <div className="absolute top-[40%] right-[15%] w-24 h-24 rounded-full bg-accent/5 blur-3xl"></div>
    </div>
  );
} 