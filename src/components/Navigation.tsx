'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  logoRef: React.RefObject<HTMLDivElement | null>;
  navRef: React.RefObject<HTMLDivElement | null>;
}

const Navigation: React.FC<NavigationProps> = ({ logoRef, navRef }) => {
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // Navbar scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setIsNavbarVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavbarVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsNavbarVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full px-8 md:px-16 py-6 flex justify-between items-center z-50 backdrop-blur-md bg-gradient-to-b from-[#0a0f0d]/20 via-[#0a0f0d]/10 to-transparent transition-transform duration-300 ease-in-out ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <Link href="/" className="relative group">
        <div ref={logoRef} className="flex items-center justify-center">
          <Image
            src="/Outlabverse_logo.png"
            alt="Outlabverse logo"
            width={100}
            height={100}
            className="object-contain"
            priority
          />
        </div>
        <div className="absolute -inset-1 bg-[#00d4aa]/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
      
      <div ref={navRef} className="flex items-center">
        <nav className="hidden md:flex items-center gap-10 mr-8">
          {navItems.map((item, index) => (
            <Link 
              key={index}
              href={item.href} 
              className={`text-sm uppercase tracking-widest transition-colors relative overflow-hidden group ${
                pathname === item.href ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
              onMouseEnter={() => setHoveredLink(index)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <span className="relative z-10">{item.name}</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#00d4aa] to-[#0066ff] transform ${
                pathname === item.href ? 'scale-x-100' : 'scale-x-0'
              } origin-left transition-transform duration-300 ${hoveredLink === index ? 'scale-x-100' : ''}`}></span>
            </Link>
          ))}
        </nav>
        
        <div className="md:hidden ml-6">
          <button className="text-white relative group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div className="absolute -inset-3 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navigation; 