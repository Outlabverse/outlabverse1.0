import { useState, useEffect, RefObject } from 'react';
import gsap from 'gsap';

export const useCustomCursor = (
  cursorRef: RefObject<HTMLDivElement | null>,
  cursorDotRef: RefObject<HTMLDivElement | null>
) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Custom cursor tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
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
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input');
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
  }, [cursorRef, cursorDotRef]);

  // Animate custom cursor with GSAP
  useEffect(() => {
    if (!cursorRef.current || !cursorDotRef.current) return;
    
    // Smoother cursor animation
    gsap.to(cursorRef.current, {
      x: mousePosition.x,
      y: mousePosition.y,
      duration: 0.15,
      ease: 'power2.out',
    });
    
    gsap.to(cursorDotRef.current, {
      x: mousePosition.x,
      y: mousePosition.y,
      duration: 0.1,
      ease: 'power1.out',
    });
  }, [mousePosition, cursorRef, cursorDotRef]);

  return mousePosition;
}; 