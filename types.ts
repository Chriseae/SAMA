
export enum UserRole {
  FREE = 'FREE',
  PRO = 'PRO',
  EXPERT = 'EXPERT'
}

export type Language = 'English' | 'Arabic' | 'French' | 'Spanish' | 'German' | 'Amharic' | 'Chinese' | 'Italian';
export type Currency = 'USD' | 'AED' | 'EUR' | 'GBP' | 'SAR' | 'ETB' | 'CNY' | 'ZAR';

export interface ScanRecord {
  id: string;
  timestamp: Date;
  vehicleModel: string;
  damageLevel: 'None' | 'Low' | 'Medium' | 'High';
  status: 'Ready' | 'Processing';
  confidence: number;
  imageUrl?: string;
  findings?: string[];
  recommendations?: string[];
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  scanCount: number;
}
