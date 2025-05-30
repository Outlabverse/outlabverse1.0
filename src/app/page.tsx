'use client';

import { useRef, useState, useEffect, memo } from 'react';
import { projects } from '@/utils/data';
import { useProjectDetail } from '@/hooks/useProjectDetail';

// Components
import Preloader from '@/components/Preloader';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import ProjectDetail from '@/components/ProjectDetail';

// Utilities - import only what we need from GSAP
import { gsap } from 'gsap/dist/gsap';

// Memoize ProjectsSection for better performance
const MemoizedProjectsSection = memo(ProjectsSection);

export default function Home() {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLDivElement>(null);
  const projectDetailRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  
  // State
  const [isLoading, setIsLoading] = useState(true);
  const [animationsInitialized, setAnimationsInitialized] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Initialize project detail functionality
  const { 
    openProjectDetail, 
    closeProjectDetail, 
    getSelectedProject 
  } = useProjectDetail(projectDetailRef as React.RefObject<HTMLDivElement>, projects);
  
  // Handle scroll events with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          if (scrollPosition > 50 && !scrolled) {
            setScrolled(true);
          } else if (scrollPosition <= 50 && scrolled) {
            setScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  // Initialize minimal animations after loading
  const initAnimations = () => {
    if (!containerRef.current || animationsInitialized) return;
    
    // Set animations as initialized to prevent re-running
    setAnimationsInitialized(true);
    
    // Simply show everything without animations
    gsap.set([logoRef.current, 'nav a', '.project-card'], { opacity: 1, y: 0 });
  };
  
  // Handle completion of loading - faster transition
  const handleLoadComplete = () => {
    // Remove the delay entirely
    setIsLoading(false);
    // Initialize animations immediately
    requestAnimationFrame(initAnimations);
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#030014] text-[#f5f5f7] overflow-x-hidden transition-all duration-300 cursor-default"
    >
      {/* Preloader - show only when loading */}
      {isLoading && (
        <Preloader
          preloaderRef={preloaderRef as React.RefObject<HTMLDivElement>}
          onLoadComplete={handleLoadComplete}
        />
      )}
      
      {/* Simple background color gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a1a] to-[#0f0522] -z-10"></div>
      
      {/* Hero Section */}
      <HeroSection
        titleRef={titleRef as React.RefObject<HTMLHeadingElement>}
        subtitleRef={subtitleRef as React.RefObject<HTMLParagraphElement>}
        logoRef={logoRef as React.RefObject<HTMLDivElement>}
        formRef={formRef as React.RefObject<HTMLFormElement>}
      />
      
      {/* Projects Section - Memoized to prevent unnecessary re-renders */}
      <MemoizedProjectsSection
        projectsSectionRef={projectsSectionRef as React.RefObject<HTMLDivElement>}
        projects={projects}
        onProjectClick={openProjectDetail}
      />
      
      {/* Project Detail Overlay */}
      <ProjectDetail
        projectDetailRef={projectDetailRef as React.RefObject<HTMLDivElement>}
        selectedProject={getSelectedProject()}
        onClose={closeProjectDetail}
      />
    </div>
  );
}
