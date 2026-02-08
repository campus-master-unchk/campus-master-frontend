"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { User, Shield, Loader2, Check, AlertCircle, Eye, EyeOff } from "lucide-react";
import { authStore } from "@/store/auth.store";
import { updateMypassword, updateProfile } from "@/types/userType";

export default function SettingPage() {
  const {
    myProfil,
    getMyProfil,
    updateMyProfil,
    updateMyPassword,
    loading,
  } = authStore();

  const profileForm = useForm<updateProfile>();
  const passwordForm = useForm<updateMypassword>();
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    getMyProfil();
  }, [getMyProfil]);

  useEffect(() => {
    if (myProfil) {
      profileForm.reset({
        first_name: myProfil.first_name,
        last_name: myProfil.last_name,
        email: myProfil.email,
      });
    }
  }, [myProfil, profileForm]);

  const onSubmitProfile = async (data: updateProfile) => {
    await updateMyProfil(data);
    if (!loading) {
      setProfileSuccess(true);
          getMyProfil();
      setTimeout(() => setProfileSuccess(false), 3000);
    }
  };

  const onSubmitPassword = async (data: updateMypassword) => {
    if (data.new_password !== data.password_confirmation) {
      passwordForm.setError("password_confirmation", {
        message: "Les mots de passe ne correspondent pas",
      });
      return;
    }

    await updateMyPassword(data);
    
    if (!loading) {
      setPasswordSuccess(true);
      setTimeout(() => setPasswordSuccess(false), 3000);
      passwordForm.reset();
    }
  };

  return (
    <div className="px-4  ">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Paramètres</h1>
        <p className="text-muted text-sm">Gérez vos informations personnelles et votre sécurité</p>
      </div>

      {/* PROFIL */}
      <div className="mb-12 bg-surface border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{myProfil?.last_name} {myProfil?.last_name}</h2>
            <p className="text-sm text-muted">{myProfil?.email}</p>
          </div>
        </div>

        <form onSubmit={profileForm.handleSubmit(onSubmitProfile)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Prénom
              </label>
              <input
                {...profileForm.register("last_name", { 
                  required: "Le prénom est requis",
                  minLength: {
                    value: 2,
                    message: "Le prénom doit contenir au moins 2 caractères"
                  }
                })}
                placeholder="Votre prénom"
                className={`w-full px-4 py-3 bg-surface border ${profileForm.formState.errors.last_name ? 'border-red-500' : 'border-border'} rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors`}
              />
              {profileForm.formState.errors.last_name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {profileForm.formState.errors.last_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nom
              </label>
              <input
                {...profileForm.register("first_name", { 
                  required: "Le nom est requis",
                  minLength: {
                    value: 2,
                    message: "Le nom doit contenir au moins 2 caractères"
                  }
                })}
                placeholder="Votre nom"
                className={`w-full px-4 py-3 bg-surface border ${profileForm.formState.errors.first_name ? 'border-red-500' : 'border-border'} rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors`}
              />
              {profileForm.formState.errors.first_name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {profileForm.formState.errors.first_name.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              type="submit" 
              disabled={loading || profileSuccess}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enregistrement...
                </>
              ) : profileSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  Sauvegardé !
                </>
              ) : (
                "Sauvegarder les modifications"
              )}
            </button>
            
            {profileSuccess && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
                <Check className="w-4 h-4" />
                <span>Profil mis à jour avec succès</span>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* SÉCURITÉ */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
          <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Sécurité</h2>
            <p className="text-sm text-muted">Changez votre mot de passe pour sécuriser votre compte</p>
          </div>
        </div>

        <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)}>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Mot de passe actuel
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  {...passwordForm.register("current_password", { 
                    required: "Le mot de passe actuel est requis",
                    minLength: {
                      value: 6,
                      message: "Le mot de passe doit contenir au moins 6 caractères"
                    }
                  })}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 bg-surface border ${passwordForm.formState.errors.current_password ? 'border-red-500' : 'border-border'} rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordForm.formState.errors.current_password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {passwordForm.formState.errors.current_password.message}
                </p>
              )}
            </div>

            <div className="grid">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  {...passwordForm.register("new_password", { 
                    required: "Le nouveau mot de passe est requis",
                    minLength: {
                      value: 8,
                      message: "Le mot de passe doit contenir au moins 8 caractères"
                    }
                  })}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 bg-surface border ${passwordForm.formState.errors.new_password ? 'border-red-500' : 'border-border'} rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordForm.formState.errors.new_password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {passwordForm.formState.errors.new_password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirmer le nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...passwordForm.register("password_confirmation", { 
                    required: "Veuillez confirmer votre mot de passe"
                  })}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 bg-surface border ${passwordForm.formState.errors.password_confirmation ? 'border-red-500' : 'border-border'} rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordForm.formState.errors.password_confirmation && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {passwordForm.formState.errors.password_confirmation.message}
                </p>
              )}
            </div>

            </div>

          </div>

        

          <div className="flex items-center gap-3">
            <button 
              type="submit" 
              disabled={loading || passwordSuccess}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Modification...
                </>
              ) : passwordSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  Modifié !
                </>
              ) : (
                "Changer le mot de passe"
              )}
            </button>
            
            {passwordSuccess && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
                <Check className="w-4 h-4" />
                <span>Mot de passe modifié avec succès</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}