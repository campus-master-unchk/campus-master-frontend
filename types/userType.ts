import z from "zod";

//=========== Interface utilisateur ===========//
export interface User {
    id?: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'student' | 'teacher' | 'admin';
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
    password_confirmation: z.string().min(6,"Le mot de passe doit contenir au moins 6 caractères")
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["password_confirmation"],
});





