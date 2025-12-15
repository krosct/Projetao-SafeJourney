
export interface Feedback {
  id: number;
  author: string;
  avatar: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
}

export interface Agency {
  id: number;
  name: string;
  logo: string;
  isVerified: boolean;
  verificationReason?: string;
  description: string;
  certifications?: string[];
}

export interface Program {
  id: number;
  name: string;
  agency: Agency;
  destinationCity: string;
  destinationCountry: string;
  price: number;
  shortDescription: string;
  longDescription: string;
  includes: string[];
  feedbacks: Feedback[];
  image: string;
  verifications?: string[];
  purchaseCount?: number;
}

export interface Program {
  id: number;
  name: string;
  agency: Agency;
  destinationCity: string;
  destinationCountry: string;
  price: number;
  shortDescription: string;
  longDescription: string;
  includes: string[];
  feedbacks: Feedback[];
  image: string;
  verifications?: string[];
  purchaseCount?: number;
  institution?: string;   // nome da instituição (quando program.institution for usado)
  ownerEmail?: string;    // para associar um programa a um usuário mock
  startDate?: string;     // exemplo: '2024-02-01'
  endDate?: string;       // exemplo: '2024-07-31'
}

export type SafetyStatus = 'Green' | 'Yellow' | 'Red' | 'Neutral';

export interface CitySafetyData {
  id: number;
  cityName: string;
  countryName: string;
  safetyStatus: SafetyStatus;
  positiveFeedbackPercentage: number;
  totalFeedbacks: number;
  coords: { lat: number; lng: number }; // For map positioning
  radius: number; // in meters
}

export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  partner: string;
  price: number;
  programId: number;
  type: 'Curso' | 'Mentoria';
  discountPercentage?: number;
  purchaseCount?: number;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  nationality?: string;      // ex: 'Brasil'
  currentLocation?: string;  // ex: 'Lisboa, Portugal'
  bio?: string;
  
  // CAMPOS DE VIAGEM E CONTATO (CONSOLIDADOS)
  age?: string;  // ex: 'Tóquio, Japão'
  emergencyContactName?: string;
  emergencyContactPhone?: string; // ex: '+55 11 98888-7777'
  contactPhone?: string; // ex: '+49 151 1234 5678'
  currentAddress?: string; // ex: 'Musterstraße 5, 10117 Berlin, Deutschland'
  professionalArea?: string; // ex: 'Tecnologia e Design'
  medicalConditions?: string; // ex: 'Diabetes Tipo 1, Asma'
}

export interface ContentSectionItem {
  subtitle: string;
  text: string;
}

export interface ContentSection {
  title: string;
  content: ContentSectionItem[];
}

export interface ContentPageData {
  title: string;
  sections: ContentSection[];
}


export type Page = 'home' | 'programs' | 'programDetail' | 'map' | 'hub' | 'agencyDetail' | 'contentPage' | 'courseDetail' | 'login' | 'agencyDashboard' | 'about';
