export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  year: string;
  fullDescription?: string;
  longDescription?: string;
  technologies: string[];
  client: string;
  team?: string[];
  location: string;
  galleryImages?: string[];
  gallery?: string[];
  link?: string;
  duration?: string;
} 