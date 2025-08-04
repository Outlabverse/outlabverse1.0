import React, { RefObject, useRef, useEffect } from 'react';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface ProjectsSectionProps {
  projectsSectionRef: RefObject<HTMLDivElement>;
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projectsSectionRef,
  projects,
  onProjectClick
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  
  // Simplified animations
  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !projectsGridRef.current || !lineRef.current) return;
    
    // Simple line animation
    gsap.to(lineRef.current, {
      height: '100px',
      duration: 0.5,
      ease: 'power2.out',
      delay: 0.2
    });
    
    // Simple fade-in for projects container
    gsap.to(projectsGridRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    });
  }, [projectsSectionRef]);
  
  return (
    <section 
      ref={projectsSectionRef}
      id="projects"
      className="min-h-screen w-full py-24 md:py-32 relative"
    >
      {/* Section heading with animated line */}
      <div className="container mx-auto px-6 md:px-12 mb-24 flex flex-col md:flex-row items-center justify-center gap-x-12 text-center md:text-left">
        <div className="w-auto mb-24 md:mb-0 relative flex items-center">
                        <div ref={lineRef} className="hidden md:block w-px h-24 bg-gradient-to-b from-[#00d4aa] to-[#0066ff] mr-8"></div>
          <div>
            <div className="overflow-hidden mb-3">
              <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold">
                Featured Projects
              </h2>
            </div>
            <div className="overflow-hidden">
              <p ref={subtitleRef} className="text-white/60 text-lg">
                A selection of our most innovative work
              </p>
            </div>
          </div>
        </div>
        
        <div className="w-auto">
          <p className="text-white/70 max-w-xl">
            Dive into our portfolio of groundbreaking digital experiences. Each project represents our commitment to pushing boundaries and creating memorable interactions.
          </p>
        </div>
      </div>
      
      {/* Projects grid with simplified styling */}
      <div 
        ref={projectsGridRef}
        className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 opacity-0"
      >
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index}
            onClick={() => onProjectClick(project)} 
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection; 