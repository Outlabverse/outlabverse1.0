'use client';

import React, { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  ease?: number;
  className?: string;
  onClick?: () => void;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 1,
  ease = 0.4,
  className = '',
  onClick
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const animating = useRef<boolean>(false);
  const boundingRef = useRef<DOMRect | null>(null);
  
  // Initialize and handle resize
  useEffect(() => {
    const updateBoundingRect = () => {
      if (buttonRef.current) {
        boundingRef.current = buttonRef.current.getBoundingClientRect();
      }
    };
    
    // Initial calculation
    updateBoundingRect();
    
    // Listen for resize
    window.addEventListener('resize', updateBoundingRect);
    
    return () => {
      window.removeEventListener('resize', updateBoundingRect);
    };
  }, []);
  
  // Handle mouse interactions
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    
    // Magnetic animation on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!boundingRef.current) return;
      
      // Calculate center of the button
      const centerX = boundingRef.current.left + boundingRef.current.width / 2;
      const centerY = boundingRef.current.top + boundingRef.current.height / 2;
      
      // Calculate the distance from mouse to center
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Calculate the magnetic pull (stronger when closer to center)
      const pullX = distanceX * strength * 0.2;
      const pullY = distanceY * strength * 0.2;
      
      // Update animation flag
      animating.current = true;
      
      // Animate the button with GSAP
      gsap.to(button, {
        x: pullX,
        y: pullY,
        duration: ease,
        ease: 'power2.out',
        onComplete: () => {
          animating.current = false;
        }
      });
    };
    
    // Reset position on mouse leave
    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: ease * 2,
        ease: 'elastic.out(1, 0.3)'
      });
    };
    
    // Update bounding rect on mouse enter
    const handleMouseEnter = () => {
      if (buttonRef.current) {
        boundingRef.current = buttonRef.current.getBoundingClientRect();
      }
    };
    
    // Add event listeners
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    
    // Cleanup
    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
      
      // Kill any ongoing animations
      gsap.killTweensOf(button);
    };
  }, [strength, ease]);
  
  return (
    <div 
      ref={buttonRef} 
      className={`magnetic-button inline-block ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default MagneticButton; 