// app/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  MdOutlineMail, 
  MdOutlineRemoveRedEye,
  MdOutlineVisibilityOff,
  MdArrowForward,
} from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { TbLock } from "react-icons/tb";
import Link from "next/link";
import { authService } from "@/services/authService";
import { Auth } from "@/types/userType";
import { toast } from "sonner";

// Schéma de validation
const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Auth>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: Auth) => {
    setIsLoading(true);

    try {
      const response = await authService.login(data);
      
      // Message de succès
      toast.success("Connexion réussie !", {
        description: `Bienvenue ${response.user?.firstName || ''}`,
        duration: 3000,
      });
      
      if (response.user) {
        authService.setCookie('user', JSON.stringify(response.user));
      }
      
      // Petite pause pour afficher le toast
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirection selon le rôle
      if (response.user?.role) {
        switch(response.user.role) {
          case 'admin':
            router.push('/dashboard/admin');
            break;
          case 'teacher':
            router.push('/dashboard/teacher');
            break;
          case 'student':
            router.push('/dashboard/student');
            break;
          default:
            router.push('/dashboard');
        }
      } else {
        router.push('/dashboard');
      }
      
      router.refresh();
      
    } catch (error: any) {
      toast.error("Erreur de connexion", {
        description: error.response?.data?.message || "Erreur de connexion au serveur",
        duration: 5000,
      });
      console.error("Login error:", error);
      
      let errorMessage = "Erreur de connexion au serveur";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.status === 401) {
        errorMessage = "Identifiants incorrects";
      } else if (error.response?.status === 422) {
        const validationErrors = error.response.data.errors;
        if (validationErrors.email) {
          errorMessage = validationErrors.email[0];
        } else if (validationErrors.password) {
          errorMessage = validationErrors.password[0];
        } else {
          errorMessage = "Données invalides";
        }
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage = "Serveur indisponible. Vérifiez votre connexion.";
      } else if (error.message?.includes('timeout')) {
        errorMessage = "Temps d'attente dépassé";
      }
      
      // Toast d'erreur
      toast.error("Échec de la connexion", {
        description: errorMessage,
        duration: 5000,
        action: {
          label: "Réessayer",
          onClick: () => {
            // Option pour réessayer
            handleSubmit(onSubmit)();
          },
        },
      });
      
      // Définir les erreurs de validation dans le formulaire
      if (error.response?.status === 422) {
        const validationErrors = error.response.data.errors;
        if (validationErrors.email) {
          setError("email", { 
            type: "manual", 
            message: validationErrors.email[0] 
          });
        }
        if (validationErrors.password) {
          setError("password", { 
            type: "manual", 
            message: validationErrors.password[0] 
          });
        }
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-[448px]">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          {/* Logo */}
          <div className="relative w-16 h-16 mb-5">
            <div className="w-16 h-16 bg-[#1E40AF] rounded-xl"></div>
            <div className="absolute top-3 left-3 w-10 h-10 text-white">
              <HiOutlineAcademicCap className="w-10 h-10" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[30px] leading-9 font-bold text-[#1F2937] text-center mb-3">
            CampusMaster
          </h1>

          {/* Subtitle */}
          <p className="text-base leading-6 text-[#6B7280] text-center max-w-[338px]">
            Plateforme de gestion éducative pour Master 2
          </p>
        </div>

        {/* Login Card */}
        <div className="w-full border border-[#E5E7EB] rounded-lg bg-white shadow-[0_4px_6px_0_rgba(0,0,0,0.07),0_2px_4px_0_rgba(0,0,0,0.05)] p-8">
          {/* Card Title */}
          <h2 className="text-2xl leading-8 font-semibold text-[#1F2937] mb-8">
            Connexion
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label 
                htmlFor="email"
                className="block text-sm leading-5 text-[#1F2937] mb-2"
              >
                Adresse e-mail
              </label>
              <div className="relative">
                <MdOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  placeholder="votre.email@exemple.fr"
                  className={`w-full h-[50px] pl-10 pr-4 border rounded-md bg-[#FAFBFC] text-base text-[#1F2937] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent disabled:opacity-50 ${
                    errors.email ? "border-red-300" : "border-[#E5E7EB]"
                  }`}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password"
                className="block text-sm leading-5 text-[#1F2937] mb-2"
              >
                Mot de passe
              </label>
              <div className="relative">
                <TbLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className={`w-full h-[50px] pl-10 pr-12 border rounded-md bg-[#FAFBFC] text-base text-[#1F2937] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent disabled:opacity-50 ${
                    errors.password ? "border-red-300" : "border-[#E5E7EB]"
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280] hover:text-[#1F2937] transition-colors"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <MdOutlineRemoveRedEye className="w-5 h-5" />
                  ) : (
                    <MdOutlineVisibilityOff className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 flex items-center justify-center gap-2 bg-[#1E40AF] hover:bg-[#1a3a9e] text-white text-base rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Connexion...</span>
                </>
              ) : (
                <>
                  <span>Se connecter</span>
                  <MdArrowForward className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className="mt-6 text-center">
            <Link
              href="/forgot-password"
              className="text-sm leading-5 text-[#1E40AF] hover:text-[#1a3a9e] transition-colors"
            >
              Mot de passe oublié ?
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}