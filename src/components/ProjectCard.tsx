import React, { useRef } from 'react';
import Image from 'next/image';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      ref={cardRef}
      className="project-card relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md transition-colors duration-300 cursor-pointer"
      onClick={() => onClick(project)}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <div className="aspect-[16/9] relative">
          <Image 
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80"></div>
        </div>
        
        {/* Category tag */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                          <div className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse"></div>
          <div className="text-xs text-white/80 uppercase tracking-wider">{project.category}</div>
        </div>
        
        {/* Project number */}
        <div className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-black/30 backdrop-blur-md border border-white/10">
          <span className="text-white/80 text-sm font-medium">{String(project.id).padStart(2, '0')}</span>
        </div>
      </div>
      
      <div className="px-6 py-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-bold text-white">
            {project.title}
          </h3>
          <div className="text-white/80 text-xs bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
            {project.year}
          </div>
        </div>
        
        <p className="text-white/70 text-base mb-5 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {project.technologies.slice(0, 2).map((tech, idx) => (
              <span 
                key={idx}
                className="px-2.5 py-1 bg-white/5 text-white/80 text-xs rounded-md border border-white/10"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 2 && (
              <span className="px-2.5 py-1 bg-white/5 text-white/80 text-xs rounded-md border border-white/10">
                +{project.technologies.length - 2}
              </span>
            )}
          </div>
          
          <div 
            className="relative rounded-full px-4 py-1.5 border border-white/10 inline-flex items-center gap-2 transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onClick(project);
            }}
          >
            <span className="text-white text-sm">Details</span>
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 14 14" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-white/50"
            >
              <path d="M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 1L13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 