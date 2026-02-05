"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  MdOutlineMail, 
  MdArrowBack, 
  MdArrowForward,
  MdCheckCircleOutline,
  MdErrorOutline,
} from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi";
import Link from "next/link";
import { authService } from "@/services/authService";
import ThemeToggleIcon from "@/components/ui/ThemeToggleIcon";

// Schéma de validation
const forgotPasswordSchema = z.object({
  email: z.string().email("Email invalide"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setApiError("");
    setSuccessMessage("");

    try {
      const response = await authService.forgotPassword(data.email);
      setSuccessMessage(response.message || "Un lien de réinitialisation a été envoyé à votre adresse email.");
    } catch (error: any) {
      console.error("Forgot password error:", error);
      
      if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else if (error.response?.data?.error) {
        setApiError(error.response.data.error);
      } else if (error.response?.status === 422) {
        const validationErrors = error.response.data.errors;
        if (validationErrors.email) {
          setApiError(validationErrors.email[0]);
        } else {
          setApiError("Données invalides");
        }
      } else {
        setApiError("Erreur de connexion au serveur");
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
            Mot de passe oublié
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
            Réinitialisation
          </h2>

          {/* Success Message */}
          {successMessage && (
            <div className="
              mb-6 p-4 
              bg-green-50 dark:bg-green-900/20 
              border border-green-500 dark:border-green-800 
              rounded-md 
              transition-colors duration-300
            ">
              <div className="flex items-start gap-3">
                <MdCheckCircleOutline className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-green-700 dark:text-green-300">
                  {successMessage}
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {apiError && !successMessage && (
            <div className="
              mb-6 p-4 
              bg-red-50 dark:bg-red-900/20 
              border border-red-500 dark:border-red-800 
              rounded-md 
              transition-colors duration-300
            ">
              <div className="flex items-start gap-3">
                <MdErrorOutline className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700 dark:text-red-300">
                  {apiError}
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <p className="text-sm leading-5 text-muted mb-4 transition-colors duration-300">
                Entrez votre adresse email pour recevoir un lien de réinitialisation.
              </p>
              
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
                  disabled={isLoading || !!successMessage}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 transition-colors duration-300">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !!successMessage}
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
                  <span>Envoi en cours...</span>
                </>
              ) : successMessage ? (
                <>
                  <MdCheckCircleOutline className="w-5 h-5" />
                  <span>Email envoyé</span>
                </>
              ) : (
                <>
                  <span>Envoyer le lien</span>
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
                inline-flex items-center gap-2 
                text-sm leading-5 
                text-primary 
                hover:text-primary/80 
                transition-colors duration-300
              "
            >
              <MdArrowBack className="w-4 h-4" />
              <span>Retour à la connexion</span>
            </Link>
          </div>

          {/* Information */}
          <div className="mt-8 pt-6 border-t border-border transition-colors duration-300">
            <div className="text-center">
              <p className="text-xs leading-4 text-muted transition-colors duration-300">
                Le lien de réinitialisation expire après 1 heure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}