import { useState, useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { Project } from '@/types';

export const useProjectDetail = (
  projectDetailRef: RefObject<HTMLDivElement>,
  projects: Project[]
) => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const detailTl = useRef<gsap.core.Timeline | null>(null);
  const [refReady, setRefReady] = useState(false);
  
  // Monitor when the ref becomes available
  useEffect(() => {
    console.log("Checking if projectDetailRef is ready");
    
    // Function to check if ref is available
    const checkRef = () => {
      if (projectDetailRef.current) {
        console.log("projectDetailRef is now available");
        setRefReady(true);
        return true;
      }
      return false;
    };
    
    // Check immediately
    if (!checkRef()) {
      // If not available, set up an observer to check again when DOM changes
      const observer = new MutationObserver(() => {
        if (checkRef()) {
          observer.disconnect();
        }
      });
      
      observer.observe(document.body, { 
        childList: true, 
        subtree: true 
      });
      
      return () => observer.disconnect();
    }
  }, [projectDetailRef]);
  
  // Animation for project detail - only create when ref is ready
  useEffect(() => {
    console.log("Creating project detail animation timeline, refReady:", refReady);
    
    if (!refReady) {
      console.log("Waiting for projectDetailRef to be ready");
      return;
    }
    
    if (!projectDetailRef.current) {
      console.error("projectDetailRef.current is null, can't create animation");
      return;
    }
    
    console.log("Creating animation with available ref");
    
    // Create a reusable timeline for the project detail
    detailTl.current = gsap.timeline({
      paused: true,
      defaults: { ease: 'power3.out' }
    });
    
    // Use a function to get elements only when they exist
    const getElements = () => {
      if (!projectDetailRef.current) return null;
      
      // Use querySelector directly on the ref to limit scope
      const container = projectDetailRef.current;
      const title = container.querySelector('.project-detail-title');
      const badge = container.querySelector('.project-detail-badge');
      const mainImage = container.querySelector('.project-detail-image');
      const metaCards = container.querySelectorAll('.project-detail-meta');
      const content = container.querySelector('.project-detail-content');
      const gallery = container.querySelector('.project-detail-gallery');
      const galleryItems = container.querySelectorAll('.project-detail-gallery-item');
      const cta = container.querySelector('.project-detail-cta');
      
      return {
        container,
        title,
        badge,
        mainImage,
        metaCards,
        content,
        gallery,
        galleryItems,
        cta
      };
    };
    
    const elements = getElements();
    if (!elements) return;
    
    detailTl.current
      // Animate the overlay background
      .fromTo(elements.container, 
        { 
          opacity: 0,
        }, 
        {
          opacity: 1,
          duration: 0.5
        }
      );
      
    // Animate the header and title
    if (elements.title) {
      detailTl.current.fromTo(elements.title, 
        { 
          opacity: 0,
          y: 30 
        }, 
        {
          opacity: 1,
          y: 0,
          duration: 0.8
        }, 
        '-=0.3'
      );
    }
    
    // Animate the badge
    if (elements.badge) {
      detailTl.current.fromTo(elements.badge, 
        { 
          opacity: 0,
          scale: 0.8
        }, 
        {
          opacity: 1,
          scale: 1,
          duration: 0.7
        }, 
        '-=0.6'
      );
    }
    
    // Animate the main image
    if (elements.mainImage) {
      detailTl.current.fromTo(elements.mainImage, 
        { 
          opacity: 0,
          y: 30
        }, 
        {
          opacity: 1,
          y: 0,
          duration: 0.7
        }, 
        '-=0.6'
      );
    }
    
    // Animate the meta cards with staggered effect
    if (elements.metaCards && elements.metaCards.length) {
      detailTl.current.fromTo(elements.metaCards, 
        { 
          opacity: 0,
          y: 20 
        }, 
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1
        }, 
        '-=0.4'
      );
    }
    
    // Animate the content section
    if (elements.content) {
      detailTl.current.fromTo(elements.content, 
        { 
          opacity: 0,
          y: 20
        }, 
        {
          opacity: 1,
          y: 0,
          duration: 0.6
        }, 
        '-=0.3'
      );
    }
    
    // Animate the gallery section
    if (elements.gallery) {
      detailTl.current.fromTo(elements.gallery, 
        { 
          opacity: 0,
          y: 20
        }, 
        {
          opacity: 1,
          y: 0,
          duration: 0.6
        }, 
        '-=0.3'
      );
    }
    
    // Animate the gallery items with staggered effect
    if (elements.galleryItems && elements.galleryItems.length) {
      detailTl.current.fromTo(elements.galleryItems, 
        { 
          opacity: 0,
          y: 20 
        }, 
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1
        }, 
        '-=0.4'
      );
    }
    
    // Animate the CTA button
    if (elements.cta) {
      detailTl.current.fromTo(elements.cta, 
        { 
          opacity: 0,
          y: 20 
        }, 
        {
          opacity: 1,
          y: 0,
          duration: 0.5
        }, 
        '-=0.2'
      );
    }
    
    return () => {
      if (detailTl.current) {
        detailTl.current.kill();
      }
    };
  }, [projectDetailRef, refReady]);
  
  // Handle project expansion/collapse
  useEffect(() => {
    console.log("Project selection changed:", selectedProject);
    
    if (selectedProject !== null && detailTl.current) {
      // Play the timeline to reveal the project
      detailTl.current.play(0);
      
      // Prevent body scrolling when overlay is active
      document.body.style.overflow = 'hidden';
    } else {
      // Allow scrolling again
      document.body.style.overflow = '';
    }
    
    return () => {
      // Ensure scrolling is restored when component unmounts
      document.body.style.overflow = '';
    };
  }, [selectedProject]);
  
  const openProjectDetail = (project: Project) => {
    console.log("Opening project detail for:", project.id);
    
    if (!projectDetailRef.current) {
      console.error("Cannot open project detail: ref not available");
      return;
    }
    
    setSelectedProject(project.id);
  };
  
  const closeProjectDetail = () => {
    console.log("Closing project detail");
    
    if (!projectDetailRef.current) {
      console.error("Cannot close project detail: ref not available");
      return;
    }
    
    if (detailTl.current) {
      // Reverse the animation
      detailTl.current.reverse().then(() => {
        setSelectedProject(null);
      });
    } else {
      // If animation isn't available, just close directly
      setSelectedProject(null);
    }
  };
  
  // Get the selected project data
  const getSelectedProject = () => {
    if (selectedProject === null) return null;
    const project = projects.find(project => project.id === selectedProject);
    console.log("Selected project data:", project);
    return project || null;
  };
  
  return {
    selectedProject,
    openProjectDetail,
    closeProjectDetail,
    getSelectedProject
  };
}; 