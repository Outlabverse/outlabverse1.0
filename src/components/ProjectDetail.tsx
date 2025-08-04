import React, { RefObject, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types';

interface ProjectDetailProps {
  projectDetailRef: RefObject<HTMLDivElement>;
  selectedProject: Project | null;
  onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectDetailRef, selectedProject, onClose }) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    console.log("ProjectDetail component mounted, ref attached");
  }, []);
  
  // Log when selectedProject changes
  useEffect(() => {
    console.log("ProjectDetail selectedProject changed:", selectedProject);
    if (selectedProject) {
      console.log("Detail should be visible now");
    }
  }, [selectedProject]);
  
  // Track gallery scroll state
  const [galleryScrollState, setGalleryScrollState] = useState({
    isAtStart: true,
    isAtEnd: false
  });
  
  // Fix horizontal scrolling with wheel and integrate with vertical scroll
  useEffect(() => {
    if (!selectedProject) return;
    
    const gallery = galleryRef.current;
    const detailContainer = projectDetailRef.current;
    if (!gallery || !detailContainer) return;
    
    // Update gallery scroll state when scrolling horizontally
    const updateGalleryScrollState = () => {
      const isAtStart = gallery.scrollLeft <= 10;
      const isAtEnd = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 10;
      
      setGalleryScrollState({
        isAtStart,
        isAtEnd
      });
    };
    
    // Initial check
    updateGalleryScrollState();
    
    // Add scroll event listener to gallery
    gallery.addEventListener('scroll', updateGalleryScrollState);
    
    // Integrated wheel handler for both horizontal and vertical scrolling
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      
      // Check if we're over the gallery
      const rect = gallery.getBoundingClientRect();
      const isOverGallery = 
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom;
      
      if ((isOverGallery || document.activeElement === gallery)) {
        // Get the current scroll state directly from the element
        const isAtStart = gallery.scrollLeft <= 10;
        const isAtEnd = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 10;
        
        // If we're at the start of gallery and scrolling up, don't prevent default (allow vertical scroll)
        if (isAtStart && e.deltaY < 0) {
          return;
        }
        
        // If we're at the end of gallery and scrolling down, don't prevent default (allow vertical scroll)
        if (isAtEnd && e.deltaY > 0) {
          return;
        }
        
        // Otherwise, do horizontal scrolling and prevent vertical scroll
        e.preventDefault();
        gallery.scrollLeft += e.deltaY;
      }
    };
    
    // Add wheel event listener
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Add keyboard navigation for gallery
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === gallery || gallery.contains(document.activeElement as Node)) {
        const scrollAmount = 200; // pixels to scroll per key press
        
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          gallery.scrollLeft -= scrollAmount;
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          gallery.scrollLeft += scrollAmount;
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Mouse events for drag scrolling
    const handleMouseDown = (e: MouseEvent) => {
      const rect = gallery.getBoundingClientRect();
      // Only handle if the mouse is inside the gallery
      if (
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom
      ) {
        gallery.style.cursor = 'grabbing';
        const startX = e.clientX;
        const scrollLeft = gallery.scrollLeft;
        
        const handleMouseMove = (moveEvent: MouseEvent) => {
          const x = moveEvent.clientX - startX;
          gallery.scrollLeft = scrollLeft - x;
        };
        
        const handleMouseUp = () => {
          gallery.style.cursor = 'grab';
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }
    };
    
    // Add drag event listener
    gallery.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      gallery.removeEventListener('mousedown', handleMouseDown);
      gallery.removeEventListener('scroll', updateGalleryScrollState);
    };
  }, [selectedProject, projectDetailRef]);

  return (
    <div 
      ref={projectDetailRef}
      className="fixed inset-0 z-40 bg-[#0a0f0d]/95 backdrop-blur-md flex items-center justify-center overflow-auto"
      onClick={onClose}
      style={{ display: selectedProject ? 'flex' : 'none' }}
    >
      {/* Background effects */}
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full opacity-10 bg-gradient-to-r from-[#00d4aa] to-[#0066ff] blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[15%] right-[10%] w-[500px] h-[500px] rounded-full opacity-10 bg-gradient-to-r from-[#0066ff] to-[#00d4aa] blur-[120px] pointer-events-none"></div>
      
      {selectedProject ? (
        <div className="w-full h-full max-h-screen mx-auto p-4 md:p-8 lg:p-12 overflow-auto" onClick={(e) => e.stopPropagation()}>
          {/* Close Button */}
          <button 
            className="fixed top-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full transition-colors border border-white/10"
            onClick={onClose}
            aria-label="Close"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 md:mb-12">
            <div>
              <h2 className="project-detail-title text-3xl md:text-5xl font-bold mb-3">
                <span className="text-gradient">{selectedProject.title}</span>
              </h2>
              <div className="flex flex-wrap items-center gap-4">
                <div className="px-3 py-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/70 text-xs uppercase tracking-wider">
                  {selectedProject.category}
                </div>
                <div className="text-white/60 text-sm">
                  {selectedProject.year}
                </div>
              </div>
            </div>
            <div className="project-detail-badge mt-4 md:mt-0 border-gradient p-[1px] rounded-xl overflow-hidden h-16 w-16 flex items-center justify-center">
              <div className="border-gradient-content flex items-center justify-center w-full h-full">
                <span className="text-gradient text-2xl font-bold">{selectedProject.id}</span>
              </div>
            </div>
          </div>
          
          {/* Main Image */}
          <div className="project-detail-image relative w-full aspect-[16/9] mb-8 md:mb-12 overflow-hidden rounded-xl border border-white/10">
            <Image 
              src={selectedProject.image}
              alt={selectedProject.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d]/50 to-transparent opacity-70"></div>
          </div>
          
          {/* Info Cards */}
          <div className="project-detail-cards grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="project-detail-meta glass rounded-xl p-6">
              <div className="text-xs uppercase tracking-wider text-white/50 mb-2">Client</div>
              <div className="text-white text-lg">{selectedProject.client}</div>
            </div>
            
            <div className="project-detail-meta glass rounded-xl p-6">
              <div className="text-xs uppercase tracking-wider text-white/50 mb-2">Location</div>
              <div className="text-white text-lg">{selectedProject.location}</div>
            </div>
            
            <div className="project-detail-meta glass rounded-xl p-6">
              <div className="text-xs uppercase tracking-wider text-white/50 mb-2">Duration</div>
              <div className="text-white text-lg">{selectedProject.duration || '6 months'}</div>
            </div>
          </div>
          
          {/* Description */}
          <div className="project-detail-content mb-12 glass rounded-xl p-8">
            <h3 className="text-xl font-bold mb-4 text-white">Project Overview</h3>
            <p className="text-white/80 leading-relaxed mb-6">
              {selectedProject.longDescription || selectedProject.description}
            </p>
            
            <div>
              <h4 className="text-sm uppercase tracking-wider text-white/50 mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-3">
                {selectedProject.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-white/5 text-white/70 text-sm rounded-md border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Gallery Section */}
          <div className="project-detail-gallery mb-12 relative">
            <h3 className="text-xl font-bold mb-6 text-white">Project Gallery</h3>
            
            <div 
              ref={galleryRef}
              className="flex space-x-6 overflow-x-auto hide-scrollbar pb-6 cursor-grab"
              tabIndex={0}
            >
              {/* Generate 4 sample images if not provided in the project */}
              {(selectedProject.gallery || selectedProject.galleryImages || Array(4).fill(selectedProject.image)).map((image: string, index: number) => (
                <div 
                  key={index}
                  className="project-detail-gallery-item flex-none w-[300px] h-[200px] relative rounded-xl overflow-hidden border border-white/10"
                >
                  <Image
                    src={image}
                    alt={`${selectedProject.title} gallery ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            
            {/* Scroll indicators */}
            <div className="flex justify-center items-center gap-2 mt-4">
              <div className={`w-16 h-1 rounded-full ${galleryScrollState.isAtStart ? 'bg-[#00d4aa]' : 'bg-white/20'}`}></div>
              <div className="w-1 h-1 rounded-full bg-white/20"></div>
              <div className={`w-16 h-1 rounded-full ${galleryScrollState.isAtEnd ? 'bg-[#0066ff]' : 'bg-white/20'}`}></div>
            </div>
          </div>
          
          {/* YouTube Video Section */}
          {selectedProject.youtubeVideoId && (
            <div className="project-detail-video mb-12">
              <h3 className="text-xl font-bold mb-6 text-white">Demo Video</h3>
              <div 
                className="relative w-full rounded-xl overflow-hidden border border-white/10 glass"
                style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${selectedProject.youtubeVideoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          )}
          
          {/* Call to action */}
          <div className="project-detail-cta text-center mb-8">
            {selectedProject.link ? (
              <a 
                href={selectedProject.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-modern px-8 py-3 inline-block"
              >
                Launch Live Demo
              </a>
            ) : (
              <button className="btn-modern px-8 py-3 opacity-60 cursor-not-allowed">
                Demo Unavailable
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProjectDetail; 