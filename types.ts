export interface ExperienceItem {
  id: string;
  company: string;
  logoUrl?: string;
  companyUrl?: string;
  role: string;
  period: string;
  description?: string;
  technologies: string[];
  isCurrent?: boolean;
}

export interface EducationItem {
  id: string;
  institution?: string;
  title: string;
  studyUrl?: string;
  period?: string;
  details: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description?: string;
  status?: 'in-progress' | 'completed';
  visualType: 'image' | 'code' | 'wireframe' | 'model';
  visualContent: string; // URL for image, code string for code
  tags: string[];
  size: 'large' | 'normal';
}

export interface SkillItem {
  name: string;
  level: number; // 0-100
  logoUrl: string;
}

export interface SkillGroup {
  category: string;
  items: SkillItem[];
}

export interface CertificationCourse {
  id: string;
  title: string;
  provider: string;
  logoUrl: string;
  details?: string;
}
