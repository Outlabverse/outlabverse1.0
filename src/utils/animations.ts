import React from 'react';
import gsap from 'gsap';

// Create a noise/grain effect
export const createNoiseEffect = (containerRef: React.RefObject<HTMLDivElement>) => {
  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  
  let wWidth: number = 0;
  let wHeight: number = 0;
  
  const noiseData: ImageData[] = [];
  let frame = 0;
  
  let loopTimeout: number | null = null;
  
  // Create Noise
  const createNoise = () => {
    if (!ctx) return;
    
    const idata = ctx.createImageData(wWidth, wHeight);
    const buffer32 = new Uint32Array(idata.data.buffer);
    const len = buffer32.length;

    for (let i = 0; i < len; i++) {
      if (Math.random() < 0.1) {
        buffer32[i] = 0x20202020;
      }
    }
    
    noiseData.push(idata);
  };
  
  // Play Noise
  const paintNoise = () => {
    if (!ctx) return;
    
    if (frame === 9) {
      frame = 0;
    } else {
      frame++;
    }
    
    ctx.putImageData(noiseData[frame], 0, 0);
  };
  
  // Setup
  const setup = () => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    
    if (!ctx || !canvas || !containerRef.current) return;
    
    canvas.className = 'noise';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.03';
    
    wWidth = window.innerWidth;
    wHeight = window.innerHeight;
    
    canvas.width = wWidth;
    canvas.height = wHeight;
    
    for (let i = 0; i < 10; i++) {
      createNoise();
    }
    
    containerRef.current.appendChild(canvas);
    
    loop();
  };
  
  // Loop
  const loop = () => {
    paintNoise();
    
    loopTimeout = window.setTimeout(() => {
      requestAnimationFrame(loop);
    }, 1000 / 25);
  };
  
  return {
    init: () => {
      setup();
    },
    destroy: () => {
      if (loopTimeout) {
        clearTimeout(loopTimeout);
      }
      if (canvas) {
        canvas.remove();
      }
    }
  };
};

// Initialize the marquee animation
export const initMarquee = () => {
  const marqueeText = document.querySelector('.marquee-text');
  if (!marqueeText) return;
  
  const text = 'coming soon · coming soon · coming soon · coming soon · ';
  // Duplicating content for a seamless loop
  marqueeText.textContent = text.repeat(4);
  
  // Create a horizontal scrolling animation
  gsap.fromTo(
    '.marquee-text', 
    { x: 0 }, 
    { 
      x: '-50%', 
      duration: 20, 
      repeat: -1, 
      ease: 'linear',
      repeatRefresh: true
    }
  );
}; 