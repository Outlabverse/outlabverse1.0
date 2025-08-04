'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import Image from 'next/image';
import MagneticButton from './MagneticButton';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];
  
  // Animation timeline
  useEffect(() => {
    const menuElement = menuRef.current;
    const linksContainer = linksContainerRef.current;
    const linkElements = linksContainer?.querySelectorAll('a');
    
    if (!menuElement || !linksContainer || !linkElements) return;
    
    const tl = gsap.timeline({ paused: true });
    
    // Prepare elements before animation
    gsap.set(menuElement, { xPercent: 100 });
    gsap.set(linkElements, { opacity: 0, y: 20 });
    
    // Create the animation
    tl.to(menuElement, {
      xPercent: 0,
      duration: 0.5,
      ease: 'power3.out',
    })
    .to(linkElements, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.4,
      ease: 'power2.out',
    }, '-=0.2');
    
    // Reverse animation when closing
    const closeTl = gsap.timeline({ paused: true });
    closeTl.to(linkElements, {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.3,
      ease: 'power2.in',
    })
    .to(menuElement, {
      xPercent: 100,
      duration: 0.4,
      ease: 'power3.in',
    }, '-=0.1');
    
    // Play or reverse based on isOpen state
    if (isOpen) {
      tl.play();
    } else {
      closeTl.play();
    }
    
    return () => {
      tl.kill();
      closeTl.kill();
    };
  }, [isOpen]);
  
  // Close menu on escape key press
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);
  
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  return (
    <div 
      ref={menuRef}
      className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-background/95 backdrop-blur-lg z-50 shadow-xl transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="relative h-full w-full p-8 flex flex-col">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center"
          aria-label="Close menu"
        >
          <div className="w-8 h-[2px] bg-foreground/80 transform rotate-45 absolute"></div>
          <div className="w-8 h-[2px] bg-foreground/80 transform -rotate-45 absolute"></div>
        </button>
        
        {/* Logo */}
        <div className="mt-8 mb-16">
          <Image
            src="/Outlabverse_logo.png"
            alt="Outlabverse logo"
            width={120}
            height={50}
            className="h-8 w-auto object-contain"
          />
        </div>
        
        {/* Navigation links */}
        <div ref={linksContainerRef} className="flex flex-col space-y-8">
          {links.map((link) => (
            <Link 
              key={link.label}
              href={link.href}
              className="text-foreground/80 hover:text-accent transition-colors duration-300 text-4xl font-[family-name:var(--font-italiana)]"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
          
          <MagneticButton 
            className="mt-8 px-8 py-4 bg-accent text-white hover:bg-accent/90 transition-colors duration-300 tracking-wider text-sm uppercase font-[family-name:var(--font-montserrat)]"
            onClick={onClose}
          >
            <Link href="/contact" className="block w-full h-full">Connect</Link>
          </MagneticButton>
        </div>
        
        {/* Social links at bottom */}
        <div className="mt-auto">
          <div className="flex space-x-6 mb-6">
            <a href="#" className="text-foreground/60 hover:text-accent transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-foreground/60 hover:text-accent transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-foreground/60 hover:text-accent transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772a4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          
          <p className="text-foreground/40 text-sm font-[family-name:var(--font-montserrat)]">
            © 2025 outlabverse. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu; 