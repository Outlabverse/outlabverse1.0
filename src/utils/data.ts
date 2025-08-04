import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Yacht Charter Exclusives',
    description: 'Premium enterprise platform for yacht charter management with integrated customer and crew portals.',
    image: '/images/projects/1/main.png',
    category: 'Web Design & Developement',
    link: 'https://yachtcharterexclusive.com',
    year: '2025',
    duration: '2 months',
    fullDescription: `Our flagship yacht charter platform delivers comprehensive management capabilities for luxury charter operations. The system integrates booking management, client profiles, crew scheduling, and vessel maintenance tracking in one seamless interface. With real-time availability updates, automated communication workflows, and detailed analytics dashboards, charter businesses can optimize operations while providing exceptional client experiences. The responsive design ensures functionality across devices, allowing management from anywhere in the world.`,
    technologies: ['NextJS', 'TypeScript', 'CloudCannon CMS', 'NodeJS'],
    client: 'Yacht Chartering Industry',
    team: ['Full Stack Engineers', 'UX/UI Specialists', 'DevOps Engineers', 'Solution Architects'],
    location: 'Australia',
    galleryImages: [
      '/images/projects/1/gallery1.png',
      '/images/projects/1/gallery2.png',
      '/images/projects/1/gallery3.png',
      '/images/projects/1/gallery4.png',
      '/images/projects/1/gallery5.png',
      '/images/projects/1/gallery6.png',
      '/images/projects/1/gallery7.png',
      '/images/projects/1/gallery8.png',

    ]
  },
  {
    id: 2,
    title: 'SnapFace AI',
    description: 'An AI web application that helps users train models with their face and generate custom images.',
    image: '/images/projects/2/main.png',
    category: 'AI Application',
    link: 'https://www.trysnapface.in',
    year: '2024',
    duration: '1 months',
    youtubeVideoId: 'dQw4w9WgXcQ',
    fullDescription: `SnapFace AI is a cutting-edge application that enables users to train AI models using their facial data and generate personalized images in various styles and contexts. The platform features an intuitive interface for uploading facial images, customizing model parameters, and creating high-quality AI-generated content. With advanced machine learning algorithms, the system learns unique facial characteristics and applies them to user-specified image generation prompts. Privacy-focused design ensures user data remains secure while delivering exceptional creative possibilities.`,
    technologies: ['Next.js', 'React', 'TensorFlow', 'PyTorch', 'Node.js', 'MongoDB', 'AWS', 'Computer Vision'],
    client: 'Content Creators and AI Enthusiasts',
    team: ['AI Engineers', 'Full Stack Developers', 'UX Designers', 'Machine Learning Specialists'],
    location: 'Global Implementation',
    galleryImages: [
      '/images/projects/2/gallery1.png',
      '/images/projects/2/gallery2.png',
      '/images/projects/2/gallery3.png',
      '/images/projects/2/gallery4.png',
    ]
  },
  {
    id: 3,
    title: 'QuantumLeap CRM',
    description: 'A futuristic CRM platform with predictive analytics and quantum-inspired UI.',
    image: '/project-placeholder-3.jpg',
    category: 'Enterprise Software',
    link: '#',
    year: '2025',
    duration: 'Ongoing',
    youtubeVideoId: 'your-video-id-here',
    fullDescription: `QuantumLeap CRM redefines customer relationship management by integrating predictive analytics and a stunning, quantum-inspired user interface. It helps sales teams forecast trends, manage leads, and close deals with unprecedented efficiency. The platform is built for scalability and performance, serving both small businesses and large enterprises.`,
    technologies: ['React', 'Vite', 'TypeScript', 'Node.js', 'GraphQL', 'Three.js'],
    client: 'Future-Focused Businesses',
    team: ['Lead Architect', 'Frontend Devs', 'Backend Devs', 'UI/UX Designer'],
    location: 'Remote',
    galleryImages: [
      '/project-placeholder-1.jpg',
      '/project-placeholder-2.jpg',
      '/project-placeholder-3.jpg',
      '/project-placeholder-4.jpg',
    ]
  }
]; 