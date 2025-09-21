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
    title: 'PetalScan',
    description: 'Interactive mobile application for flower and architectural element identification in Singapore Botanic Gardens using AI.',
    image: '/images/projects/3/main.png',
    category: 'Mobile App Development',
    link: 'https://aungpyaesoebgs.wixstudio.com/petalscan',
    year: '2025',
    duration: '3 months',
    fullDescription: `PetalScan is a lightweight mobile application designed specifically for visitors to the Singapore Botanic Gardens, utilizing advanced machine learning to provide real-time identification of flowers and architectural elements. The app integrates image recognition technology with educational content and social media sharing capabilities to enhance the user's experience, making it both informative and engaging. Features include seamless flower identification using pre-trained Artificial Neural Networks, personalized garden tours, interactive maps, news updates, and flexible subscription models with both free and premium tiers. The ultimate goal is to enrich visitors' exploration of the garden, fostering a deeper appreciation for its biodiversity and historical significance.`,
    technologies: ['React Native', 'TensorFlow Lite', 'Machine Learning', 'Computer Vision', 'Node.js', 'MongoDB', 'Google Maps API', 'Firebase'],
    client: 'Singapore Botanic Gardens & Visitors',
    team: ['Mobile App Developers', 'ML Engineers', 'UX/UI Designers', 'Backend Engineers', 'Data Scientists'],
    location: 'Singapore',
    galleryImages: [
      '/images/projects/3/gallery7.png',
      '/images/projects/3/gallery8.png',
      '/images/projects/3/gallery9.png',
      '/images/projects/3/gallery1.png',
      '/images/projects/3/gallery3.png',
      '/images/projects/3/gallery4.png',
      '/images/projects/3/gallery5.png',
      '/images/projects/3/gallery6.png',
    ]
  }
]; 