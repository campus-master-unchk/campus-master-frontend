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
            Mot de passe oublié
          </p>
        </div>

        {/* Login Card */}
        <div className="w-full border border-[#E5E7EB] rounded-lg bg-white shadow-[0_4px_6px_0_rgba(0,0,0,0.07),0_2px_4px_0_rgba(0,0,0,0.05)] p-8">
          {/* Card Title */}
          <h2 className="text-2xl leading-8 font-semibold text-[#1F2937] mb-8">
            Réinitialisation
          </h2>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-start gap-3">
                <MdCheckCircleOutline className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-green-700">{successMessage}</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {apiError && !successMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-start gap-3">
                <MdErrorOutline className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{apiError}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <p className="text-sm leading-5 text-[#6B7280] mb-4">
                Entrez votre adresse email pour recevoir un lien de réinitialisation.
              </p>
              
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
                  disabled={isLoading || !!successMessage}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !!successMessage}
              className="w-full h-12 flex items-center justify-center gap-2 bg-[#1E40AF] hover:bg-[#1a3a9e] text-white text-base rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="inline-flex items-center gap-2 text-sm leading-5 text-[#1E40AF] hover:text-[#1a3a9e] transition-colors"
            >
              <MdArrowBack className="w-4 h-4" />
              <span>Retour à la connexion</span>
            </Link>
          </div>

          {/* Information */}
          <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
            <div className="text-center">
              <p className="text-xs leading-4 text-[#6B7280]">
                Le lien de réinitialisation expire après 1 heure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}