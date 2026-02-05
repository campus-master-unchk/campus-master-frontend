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
import { Moon, Sun } from "lucide-react";
import ThemeToggleIcon from "@/components/ui/ThemeToggleIcon";

// Schéma de validation
const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

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

  // Gestion du thème
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('theme', newTheme);
  };

  const onSubmit = async (data: Auth) => {
    setIsLoading(true);

    try {
      const response = await authService.login(data);
      
      // Message de succès
      toast.success("Connexion réussie !", {
        description: `Bienvenue ${response.user?.first_name || ''}`,
        duration: 3000,
      });
      
      if (response.user) {
        authService.setCookie('user', JSON.stringify(response.user));
      }
      
      // Petite pause pour afficher le toast
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirection selon le rôle
      if (response.user?.user_type) {
        switch(response.user.user_type) {
          case 'admin':
            router.push('/admin');
            break;
          case 'teacher':
            router.push('/teacher');
            break;
          case 'student':
            router.push('/student');
            break;
        }
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-8 transition-colors duration-300">
      {/* Header avec toggle du thème */}
      <div className="absolute top-6 right-6">
        <ThemeToggleIcon />
      </div>

      <div className="w-full max-w-[448px] mt-16">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          {/* Logo */}
          <div className="relative w-16 h-16 mb-5">
            <div className="w-16 h-16 bg-primary rounded-xl transition-colors duration-300"></div>
            <div className="absolute top-3 left-3 w-10 h-10 text-white">
              <HiOutlineAcademicCap className="w-10 h-10" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[30px] leading-9 font-bold text-foreground text-center mb-3 transition-colors duration-300">
            CampusMaster
          </h1>

          {/* Subtitle */}
          <p className="text-base leading-6 text-muted text-center max-w-[338px] transition-colors duration-300">
            Plateforme de gestion éducative pour Master
          </p>
        </div>

        {/* Login Card */}
        <div className="
          w-full 
          border border-border 
          rounded-lg 
          bg-surface 
          shadow-[0_4px_6px_0_rgba(0,0,0,0.07),0_2px_4px_0_rgba(0,0,0,0.05)] 
          dark:shadow-[0_4px_6px_0_rgba(0,0,0,0.2),0_2px_4px_0_rgba(0,0,0,0.15)]
          p-8
          transition-all duration-300
        ">
          {/* Card Title */}
          <h2 className="text-2xl leading-8 font-semibold text-foreground mb-8 transition-colors duration-300">
            Connexion
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label 
                htmlFor="email"
                className="block text-sm leading-5 text-foreground mb-2 transition-colors duration-300"
              >
                Adresse e-mail
              </label>
              <div className="relative">
                <MdOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted transition-colors duration-300" />
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  placeholder="votre.email@exemple.fr"
                  className={`
                    w-full h-[50px] 
                    pl-10 pr-4 
                    border rounded-md 
                    bg-background 
                    text-base text-foreground 
                    placeholder:text-muted 
                    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent 
                    disabled:opacity-50
                    transition-all duration-300
                    ${errors.email ? "border-red-400 dark:border-red-500" : "border-border"}
                  `}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 transition-colors duration-300">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password"
                className="block text-sm leading-5 text-foreground mb-2 transition-colors duration-300"
              >
                Mot de passe
              </label>
              <div className="relative">
                <TbLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted transition-colors duration-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className={`
                    w-full h-[50px] 
                    pl-10 pr-12 
                    border rounded-md 
                    bg-background 
                    text-base text-foreground 
                    placeholder:text-muted 
                    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent 
                    disabled:opacity-50
                    transition-all duration-300
                    ${errors.password ? "border-red-400 dark:border-red-500" : "border-border"}
                  `}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute right-3 top-1/2 transform -translate-y-1/2 
                    w-5 h-5 
                    text-muted 
                    hover:text-foreground 
                    transition-colors duration-300
                  "
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
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 transition-colors duration-300">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full h-12 
                flex items-center justify-center gap-2 
                bg-primary 
                hover:bg-primary/90 
                text-white 
                text-base 
                rounded-md 
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
              "
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
              className="
                text-sm leading-5 
                text-primary 
                hover:text-primary/80 
                transition-colors duration-300
              "
            >
              Mot de passe oublié ?
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}