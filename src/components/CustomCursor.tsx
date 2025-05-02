'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;
    
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
      
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
      });
    };
    
    const onMouseDown = () => {
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.2,
      });
      
      gsap.to(follower, {
        scale: 1.4,
        duration: 0.2,
      });
    };
    
    const onMouseUp = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2,
      });
      
      gsap.to(follower, {
        scale: 1,
        duration: 0.2,
      });
    };

    const onMouseEnterLink = () => {
      gsap.to(cursor, {
        scale: 1.5,
        background: 'rgba(255, 255, 255, 0.2)',
        border: 'none',
        duration: 0.2,
      });
      
      gsap.to(follower, {
        scale: 0,
        duration: 0.2,
      });
    };
    
    const onMouseLeaveLink = () => {
      gsap.to(cursor, {
        scale: 1,
        background: 'rgba(255, 255, 255, 0)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        duration: 0.2,
      });
      
      gsap.to(follower, {
        scale: 1,
        duration: 0.2,
      });
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    
    // Add event listeners to clickable elements
    const links = document.querySelectorAll('a, button, input, [role="button"]');
    links.forEach(link => {
      link.addEventListener('mouseenter', onMouseEnterLink);
      link.addEventListener('mouseleave', onMouseLeaveLink);
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', onMouseEnterLink);
        link.removeEventListener('mouseleave', onMouseLeaveLink);
      });
      
      // Restore default cursor
      document.body.style.cursor = 'auto';
    };
  }, []);
  
  return (
    <>
      <div 
        ref={cursorRef} 
        className="cursor fixed w-4 h-4 border border-white/40 rounded-full pointer-events-none z-50 -ml-2 -mt-2"
        style={{ 
          mixBlendMode: 'difference',
          willChange: 'transform'
        }}
      />
      <div 
        ref={followerRef} 
        className="cursor-follower fixed w-8 h-8 bg-white/10 rounded-full pointer-events-none z-40 -ml-4 -mt-4"
        style={{ 
          mixBlendMode: 'difference',
          willChange: 'transform'
        }}
      />
    </>
  );
};

export default CustomCursor; 