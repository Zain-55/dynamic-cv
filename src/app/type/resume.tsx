import { ReactNode } from "react";

export interface Skill {
    name: string;
  }
  
  export interface Education {
    location: ReactNode;
    graduationDate: ReactNode;
    degree: string;
    institution: string;
    graduationYear: string;
  }
  
  export interface Language {
    name: string;
    proficiency: string;
  }
  
  export interface WorkExperience {
    position: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    achievements: string[];
  }
  
  export interface Course {
    name: string;
    provider: string;
  }
  
  export interface Interest {
    name: string;
  }
  
  export interface PersonalInfo {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    profileImage: string;
  }
  
  export interface ResumeData {
    personalInfo: PersonalInfo;
    skills: Skill[];
    education: Education[];
    languages: Language[];
    workExperience: WorkExperience[];
    courses: Course[];
    interests: Interest[];
  }
  
  