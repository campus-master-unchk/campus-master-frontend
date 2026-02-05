import z from "zod";

//=========== Interface utilisateur ===========//
export interface Filters {
  role: 'all' | 'student' | 'teacher' | 'admin';
  status: 'all' | 'active' | 'inactive' | 'pending';
  search: string;
  department: string;
  specialty: string;
  level: string;
}

//=========== Interface authentification ===========//
export interface Auth {
  email: string;
  password: string;
}
// Resultat de l'authentification
export interface LoginResponse {
  status: string;
  user: User;
  authorization: {
    token: string;
    type: 'bearer';
    expires_in: number;
  };
}

//=========== Interface réinitialisation mot de passe ===========//
export interface resetPassword {
  email?: string;
  token?: string;
  password: string;
  password_confirmation: string;
}
// Schema authentification
export const authSchema = z
  .object({
    email: z.string().email(),
    token: z.string().min(1),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    password_confirmation: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères")
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["password_confirmation"],
  });


//=============================================//
//=========== Interface utilisateur ===========//
//=============================================//

export type UserRole = 'teacher' | 'student';
export type UserStatus = 'active' | 'inactive';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: UserStatus;
  user_type: UserRole;
  created_at: string;
  updated_at: string;
  student?: Student;
  teacher?: Teacher;
}

// Spécifique Student
export interface Student {
  user_id?: number;
  department_id: number;
  level_id: number;
  specialty_id: number;
}

// Spécifique Teacher
export interface Teacher {
  user_id?: number;
  department_id: number;
}

// Payload Admin pour créer un user
export interface CreateUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  user_type: UserRole;
  student?: Student;
  teacher?: Teacher;
}

// Payload pour update
export interface UpdateUserPayload {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  student?: Partial<Student>;
  teacher?: Partial<Teacher>;
}
