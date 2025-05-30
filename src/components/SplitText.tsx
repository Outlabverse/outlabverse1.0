'use client';

import React, { useEffect, useRef, forwardRef, ReactNode, ElementType } from 'react';
import gsap from 'gsap';

interface SplitTextProps {
  text: string | ReactNode;
  className?: string;
  animationDelay?: number;
  staggerValue?: number;
  wordByWord?: boolean;
  as?: ElementType;
}

const SplitText = forwardRef<HTMLElement, SplitTextProps>(({ 
  text, 
  className = '', 
  animationDelay = 0,
  staggerValue = 0.05,
  wordByWord = false,
  as: Component = 'div'
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef<boolean>(false);
  
  // Process text content
  const processText = () => {
    if (typeof text === 'string') {
      if (wordByWord) {
        // Split by words
        return text.split(' ').map((word, index) => (
          <span key={index} className="split-word inline-block overflow-hidden" style={{ marginRight: '0.25em' }}>
            <span className="word-inner inline-block translate-y-full opacity-0">
              {word}
            </span>
          </span>
        ));
      } else {
        // Split by characters
        return text.split('').map((char, index) => (
          <span key={index} className="split-char inline-block overflow-hidden">
            <span className="char-inner inline-block translate-y-full opacity-0">
              {char === ' ' ? '\u00A0' : char}
            </span>
          </span>
        ));
      }
    } else {
      // Return React node as is
      return text;
    }
  };
  
  // Initialize animation
  useEffect(() => {
    if (hasAnimated.current || !containerRef.current) return;
    
    const elements = wordByWord 
      ? containerRef.current.querySelectorAll('.word-inner')
      : containerRef.current.querySelectorAll('.char-inner');
    
    if (elements.length === 0) return;
    
    // Animate each element in sequence
    gsap.to(elements, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: staggerValue,
      ease: "power3.out",
      delay: animationDelay,
      onStart: () => {
        hasAnimated.current = true;
      }
    });
    
    return () => {
      gsap.killTweensOf(elements);
    };
  }, [animationDelay, staggerValue, wordByWord]);
  
  return (
    <Component 
      ref={ref} 
      className={className}
    >
      <div ref={containerRef} className="inline-flex flex-wrap">
        {processText()}
      </div>
    </Component>
  );
});

SplitText.displayName = 'SplitText';

export default SplitText; 