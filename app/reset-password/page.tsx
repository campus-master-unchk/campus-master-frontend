// app/reset-password/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MdOutlineLock,
  MdArrowForward,
  MdOutlineRemoveRedEye,
  MdOutlineVisibilityOff,
} from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authSchema, resetPassword } from "@/types/userType";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import ThemeToggleIcon from "@/components/ui/ThemeToggleIcon";

type AuthFormData = z.infer<typeof authSchema>;

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (email) {
      const decodedEmail = decodeURIComponent(email);
      setValue("email", decodedEmail);
    }

    if (token) {
      setValue("token", token);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: resetPassword) => {
    setIsLoading(true);

    authService.resetPassword(data)
      .then(() => {
        toast.success("Mot de passe réinitialisé !", {
          description: "Votre mot de passe a été modifié avec succès.",
          duration: 3000,
        });
        router.push("/");
      })
      .catch((error) => {
        console.error("Reset password error:", error);
        toast.error("Erreur de réinitialisation", {
          description: error.response?.data?.message || "Une erreur est survenue",
          duration: 5000,
        });
        setIsLoading(false);
      });
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
            Réinitialisation du mot de passe
          </p>
        </div>

        {/* Reset Password Card */}
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
          <h2 className="text-2xl leading-8 font-semibold text-foreground mb-8 transition-colors duration-300">
            Nouveau mot de passe
          </h2>

          {/* Information */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-500 dark:border-blue-800 rounded-md transition-colors duration-300">
            <p className="text-sm text-[#002555] dark:text-blue-700 dark:text-blue-300">
              Votre mot de passe doit contenir au moins 8 caractères.
            </p>
          </div>

          {/* Formulaire de réinitialisation */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Nouveau mot de passe */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm leading-5 text-foreground mb-2 transition-colors duration-300"
              >
                Nouveau mot de passe
              </label>
              <div className="relative">
                <MdOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted transition-colors duration-300" />
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
                    disabled:opacity-50 disabled:cursor-not-allowed
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
                <p className="mt-1 text-xs text-red-600 dark:text-red-400 transition-colors duration-300">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirmation du mot de passe */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm leading-5 text-foreground mb-2 transition-colors duration-300"
              >
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <MdOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted transition-colors duration-300" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  {...register("password_confirmation")}
                  placeholder="••••••••"
                  className={`
                    w-full h-[50px] 
                    pl-10 pr-12 
                    border rounded-md 
                    bg-background 
                    text-base text-foreground 
                    placeholder:text-muted 
                    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent 
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-300
                    ${errors.password_confirmation ? "border-red-400 dark:border-red-500" : "border-border"}
                  `}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="
                    absolute right-3 top-1/2 transform -translate-y-1/2 
                    w-5 h-5 
                    text-muted 
                    hover:text-foreground 
                    transition-colors duration-300
                  "
                  aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <MdOutlineRemoveRedEye className="w-5 h-5" />
                  ) : (
                    <MdOutlineVisibilityOff className="w-5 h-5" />
                  )}
                </button>
              </div>

              {errors.password_confirmation && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400 transition-colors duration-300">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>

            {/* Bouton de soumission */}
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
                shadow-sm hover:shadow-md
              "
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Réinitialisation...</span>
                </>
              ) : (
                <>
                  <span>Réinitialiser le mot de passe</span>
                  <MdArrowForward className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="
                inline-flex items-center justify-center gap-2 
                text-sm leading-5 
                text-primary 
                hover:text-primary/80 
                transition-colors duration-300
                hover:underline
              "
            >
              <span>Retour à la connexion</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted transition-colors duration-300">
            Le lien de réinitialisation expire après 1 heure
          </p>
        </div>
      </div>
    </div>
  );
}