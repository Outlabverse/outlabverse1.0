'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const flourishRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  
  // Track mouse position for custom cursor
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize GSAP animations
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });
    
    // Animate logo box
    tl.from(logoRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 1,
    })
    .from('.line', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.5,
      stagger: 0.2,
    }, '-=0.8')
    .from(titleRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
    }, '-=1')
    .from('.title-letter', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.04,
    }, '-=0.7')
    .from(subtitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
    }, '-=0.6')
    .from(formRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
    }, '-=0.4')
    .from('.social-icon', {
      opacity: 0,
      scale: 0,
      duration: 0.4,
      stagger: 0.1,
    }, '-=0.2')
    .from(accentRef.current, {
      opacity: 0, 
      rotation: -5,
      duration: 0.8
    }, '-=0.2')
    .from(flourishRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
    }, '-=0.6')
    .from('.marquee-container', {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, '-=0.4');
    
    // Create background noise/grain effect
    const noise = () => {
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
        
        if (!ctx || !canvas) return;
        
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
        
        containerRef.current?.appendChild(canvas);
        
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
    
    const noiseEffect = noise();
    noiseEffect.init();
    
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
    
    // Initialize the marquee
    const initMarquee = () => {
      const marqueeText = document.querySelector('.marquee-text');
      if (!marqueeText) return;
      
      const text = 'coming soon · coming soon · coming soon · coming soon · ';
      // Duplicating content for a seamless loop
      marqueeText.textContent = text.repeat(4);
      
      // Create a horizontal scrolling animation
      gsap.fromTo('.marquee-text', 
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
    
    initMarquee();
    
    return () => {
      noiseEffect.destroy();
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkHover);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);
  
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
  }, [mousePosition]);

  // Split text for letter-by-letter animation
  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="title-letter inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#faf6f1] text-[#1a1a1a] overflow-hidden cursor-none"
    >
      {/* Custom Cursor */}
      <div 
        ref={cursorRef} 
        className="cursor-main fixed pointer-events-none w-8 h-8 rounded-full border-2 border-amber-900/50 -translate-x-1/2 -translate-y-1/2 z-50 mix-blend-difference"
      ></div>
      <div 
        ref={cursorDotRef} 
        className="cursor-dot fixed pointer-events-none w-1.5 h-1.5 rounded-full bg-amber-900 -translate-x-1/2 -translate-y-1/2 z-50"
      ></div>
      
      {/* Decorative elements */}
      <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-amber-50 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-30"></div>
      
      {/* Accent text element */}
      <div 
        ref={accentRef}
        className="absolute top-30 right-12 hidden md:block"
      >
        <div className="font-[family-name:var(--font-dm-serif)] text-amber-800/20 text-6xl transform rotate-6 select-none">
          o
        </div>
        <div className="font-[family-name:var(--font-dm-serif)] text-amber-800/20 text-6xl transform -translate-y-4 translate-x-4 select-none">
          v
        </div>
      </div>
      
      {/* Lines */}
      <div className="line absolute top-[60px] left-[5%] w-[90%] h-[1px] bg-amber-800/20"></div>
      <div className="line absolute top-[calc(100%-60px)] left-[5%] w-[90%] h-[1px] bg-amber-800/20"></div>
      <div className="line absolute bottom-0 left-[5%] w-[90%] h-[1px] bg-amber-800/20"></div>
      
      {/* Marquee text */}
      <div className="marquee-container absolute top-20 left-0 w-full overflow-hidden z-10 text-center">
        <div className="marquee-text text-amber-800/60 font-light tracking-widest text-2xl font-[family-name:var(--font-montserrat)] whitespace-nowrap inline-block"></div>
      </div>
      
      {/* Stylistic flourish */}
      <div 
        ref={flourishRef}
        className="absolute bottom-24 left-12 hidden md:block"
      >
        <div className="font-[family-name:var(--font-playfair)] text-amber-800/30 text-lg italic select-none">
          digital
        </div>
        <div className="font-[family-name:var(--font-playfair)] text-amber-800/30 text-lg italic ml-16 select-none">
          universe
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-screen max-w-4xl mx-auto px-6 py-20 relative z-10">
        <div ref={logoRef} className="mb-8 relative">
          <Image
            src="/outlabverse-logo.svg"
            alt="outlabverse logo"
            width={120}
            height={50}
            className="mt-4"
            priority
          />
        </div>
        
        <h1 
          ref={titleRef}
          className="font-[family-name:var(--font-italiana)] text-5xl md:text-7xl text-center mb-10 text-amber-950 tracking-wider relative z-10"
        >
          {splitText("outlabverse")}
        </h1>
        
        <p 
          ref={subtitleRef}
          className="font-[family-name:var(--font-cormorant)] text-lg md:text-xl text-center mb-12 max-w-md text-amber-900/80 italic"
        >
          We are creating a new dimension for the digital world. 
          Our universe is expanding soon.
        </p>
        
        <form 
          ref={formRef}
          className="w-full max-w-md mb-16 font-[family-name:var(--font-montserrat)]"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-transparent border-b border-amber-800/30 px-4 py-3 focus:outline-none focus:border-amber-800 text-amber-900 placeholder:text-amber-900/50"
              required
            />
            <button 
              type="submit" 
              className="px-8 py-3 bg-amber-900 text-amber-50 hover:bg-amber-800 transition-colors duration-300 tracking-wider text-sm uppercase"
            >
              Notify Me
            </button>
          </div>
        </form>
        
        <div className="flex gap-8">
          <a href="#" className="social-icon text-amber-900/70 hover:text-amber-900 transition-colors duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="social-icon text-amber-900/70 hover:text-amber-900 transition-colors duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="#" className="social-icon text-amber-900/70 hover:text-amber-900 transition-colors duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772a4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
        
        <div className="font-[family-name:var(--font-montserrat)] text-amber-900/40 text-xs tracking-wider mt-20">
          © 2025 outlabverse
        </div>
      </div>
      
      {/* Global styles for cursor animations */}
      <style jsx global>{`
        html, body {
          cursor: none;
        }
        
        .cursor-main {
          transition: width 0.3s ease, height 0.3s ease, background-color 0.3s ease;
        }
        
        .cursor-hover {
          width: 50px;
          height: 50px;
          background-color: rgba(180, 83, 9, 0.05);
          border-color: rgba(180, 83, 9, 0.8);
          mix-blend-mode: difference;
        }
        
        .cursor-dot-hover {
          width: 3px;
          height: 3px;
          background-color: rgba(180, 83, 9, 1);
        }
      `}</style>
    </div>
  );
}
