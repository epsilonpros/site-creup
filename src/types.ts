export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  fields: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export type ProjectType = 'design' | 'photo' | 'video';

export interface CaseStudy {
  id: string;
  title: string;
  client: Partner;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  category: string;
  type: ProjectType;
  tags: string[];
  videoUrl?: string;
  gallery?: string[];
  objectives?: string[];
  timeline?: string;
  technologies?: string[];
  testimonial?: {
    name: string;
    role: string;
    content: string;
    image: string;
  };
  nextProject?: {
    id: string;
    title: string;
    image: string;
  };
  previousProject?: {
    id: string;
    title: string;
    image: string;
  };
}

export interface Partner {
    id: string;
    name: string;
    logo: string;
    website: string;
    kind: string
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  icon: string;
  description: string;
}

export interface Stats {
  label: string;
  value: string;
  icon: any;
}