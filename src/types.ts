export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'AI & Data Analytics' | 'Systems & Cloud' | 'Computer Vision';
  description: string;
  impact: string;
  architectureNotes: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  featured: boolean;
  year: string;
  githubUrl: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface TechItem {
  name: string;
  category: 'Databases & Storage' | 'Frameworks & Libraries' | 'Programming Languages' | 'Tools & BI Platforms';
  proficiency: number;
  featured: boolean;
  description: string;
}

export interface Achievement {
  title: string;
  issuer: string;
  year: string;
  category: 'Certification' | 'Award' | 'Engineering Milestone';
  description: string;
}

