export interface UserModel {
    id: number;
    name: string;
    email: string;
    language?: string;
    notifications?: boolean;
    medicalHistory?: string;
  }
  