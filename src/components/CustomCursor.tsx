'use client';

import React, { useRef } from 'react';
import { useCustomCursor } from '@/hooks/useCustomCursor';

const CustomCursor: React.FC = () => {
  // Create refs internally
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  
  // Initialize the custom cursor hook
  useCustomCursor(cursorRef, cursorDotRef);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="cursor-main fixed pointer-events-none w-10 h-10 -translate-x-1/2 -translate-y-1/2 z-50 mix-blend-difference"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="19" stroke="white" strokeWidth="1" strokeDasharray="2 2" className="animate-spin-slow" />
          <circle cx="20" cy="20" r="5" stroke="white" strokeWidth="1" />
          <line x1="20" y1="0" x2="20" y2="10" stroke="white" strokeWidth="1" />
          <line x1="20" y1="30" x2="20" y2="40" stroke="white" strokeWidth="1" />
          <line x1="0" y1="20" x2="10" y2="20" stroke="white" strokeWidth="1" />
          <line x1="30" y1="20" x2="40" y2="20" stroke="white" strokeWidth="1" />
        </svg>
      </div>
      
      <div 
        ref={cursorDotRef} 
        className="cursor-dot fixed pointer-events-none w-2 h-2 rounded-full bg-white -translate-x-1/2 -translate-y-1/2 z-50 opacity-50"
      ></div>
      
      {/* Global styles for cursor animations */}
      <style jsx global>{`
        html, body {
          cursor: none;
        }
        
        .cursor-main {
          transition: transform 0.1s ease;
        }
        
        .cursor-main svg {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.3s ease;
        }
        
        .cursor-hover .cursor-main svg {
          transform: scale(1.5);
        }
        
        .cursor-hover {
          transform: translate(-50%, -50%) scale(1.2);
        }
        
        .cursor-dot-hover {
          opacity: 0;
        }
        
        .cursor-drag .cursor-main svg {
          transform: scale(0.8);
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </>
  );
};

export default CustomCursor; 