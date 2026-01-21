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
        router.push("/");
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-[448px]">

        <div className="flex flex-col items-center mb-8">
  
          <div className="relative w-16 h-16 mb-5">
            <div className="w-16 h-16 bg-[#1E40AF] rounded-xl"></div>
            <div className="absolute top-3 left-3 w-10 h-10 text-white">
              <HiOutlineAcademicCap className="w-10 h-10" />
            </div>
          </div>

  
          <h1 className="text-[30px] leading-9 font-bold text-[#1F2937] text-center mb-3">
            CampusMaster
          </h1>

  
          <p className="text-base leading-6 text-[#6B7280] text-center max-w-[338px]">
            Réinitialisation du mot de passe
          </p>


        </div>

        
        <div className="w-full border border-[#E5E7EB] rounded-lg bg-white shadow-[0_4px_6px_0_rgba(0,0,0,0.07),0_2px_4px_0_rgba(0,0,0,0.05)] p-8">
          <h2 className="text-2xl leading-8 font-semibold text-[#1F2937] mb-8">
            Nouveau mot de passe
          </h2>  
          {/* Formulaire de réinitialisation */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Nouveau mot de passe */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm leading-5 text-[#1F2937] mb-2"
              >
                Nouveau mot de passe
              </label>
              <div className="relative">
                <MdOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full h-[50px] pl-10 pr-12 border border-[#E5E7EB] rounded-md bg-[#FAFBFC] text-base text-[#1F2937] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
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
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirmation du mot de passe */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm leading-5 text-[#1F2937] mb-2"
              >
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <MdOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  {...register("password_confirmation")}
                  placeholder="••••••••"
                  className="w-full h-[50px] pl-10 pr-12 border border-[#E5E7EB] rounded-md bg-[#FAFBFC] text-base text-[#1F2937] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280] hover:text-[#1F2937] transition-colors"
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
                <p className="mt-1 text-xs text-red-500">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 flex items-center justify-center gap-2 bg-[#1E40AF] hover:bg-[#1a3a9e] text-white text-base rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm leading-5 text-[#1E40AF] hover:text-[#1a3a9e] transition-colors"
            >
              <span>Retour à la connexion</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}