"use client";

import { useEffect, useState } from "react";
import { Speciality } from "@/types/academic";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { X, Building, Calendar, FileText } from "lucide-react";

interface Props {
  departmentId: number;
  onClose: () => void;
  specialities: Speciality;
}

export default function ShowSpecialityModal({ departmentId, onClose, specialities }: Props) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMMM yyyy 'à' HH:mm", { locale: fr });
    } catch {
      return dateString;
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 bg-black/50`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-background rounded-xl shadow-2xl md:!w-[600px] !w-full transition-all duration-300 ${isClosing ? "opacity-0 scale-95 translate-y-4" : "opacity-100 scale-100"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Détails de la Spécialité
              </h2>
              <p className="text-sm  text-foreground dark:text-gray-400">
                Informations détaillées
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Nom de la spécialité */}
          <div className=" rounded-lg">
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              {specialities.name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold  text-foreground ">Description :</span>
            <span className="text-muted whitespace-pre-line">
              {specialities.description || "Aucune description disponible"}
            </span>
          </div>

            

            {/* Département */}
            <div className="space-y-3">
              <h4 className="font-bold text-foreground">Département associé</h4>
              <div className="p-4 !bg-muted rounded-lg space-y-2">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {specialities.department?.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">
                    Code : {specialities?.department?.code}
                  </span>
                  <span className="text-sm  text-foreground">
                    ID : {specialities?.department?.id}
                  </span>
                </div>
              </div>
            </div>

          {/* Dates */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm  text-foreground">
                <Calendar className="w-4 h-4" />
                <span>Créé le</span>
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatDate(specialities.created_at)}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm  text-foreground">
                <Calendar className="w-4 h-4" />
                <span>Mis à jour le</span>
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatDate(specialities.updated_at)}
              </p>
            </div>
          </div>

          {/* Métadonnées */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm  text-foreground">
              <span>ID de la spécialité : {specialities.id}</span>
              <span>ID du département : {departmentId}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleClose}
            className="border border-border px-4 py-2 rounded"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}