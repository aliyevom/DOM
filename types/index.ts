import { User as FirebaseUser } from 'firebase/auth';

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserRole = 'admin' | 'teacher' | 'student'; 