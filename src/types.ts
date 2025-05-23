export interface Service {
  id: string
  title: string
  description: string
  icon: string
  fields: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  image: string
}

export type ProjectType = 'Graphique design' | 'Photo' | 'Vidéo' | 'Projet interne'

export interface TeamMember {
  id: string
  name: string
  role: string
  icon: string
  description: string
  portfolio?: string
}

export interface ProjectTeamMember extends TeamMember {
  contribution: string
}

export interface CaseStudy {
  id: string
  title: string
  client: Partner
  description: string
  image: string
  category: ProjectType
  tags: string[]
  team?: ProjectTeamMember[]
  videoUrl?: string
  gallery?: string[]
  socialPost?: {
    url: string
    thumbnail: string
  }
  testimonial?: {
    name: string
    role: string
    content: string
  }
}

export interface Partner {
  id: string
  name: string
  logo: string
  website: string
  kind: string
}

export interface Stats {
  label: string
  value: string
  icon: any
}
