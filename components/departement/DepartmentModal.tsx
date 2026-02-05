"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Department } from "@/types/academic";

interface Props {
  department: Department | null;
  onClose: () => void;
  onSave: (departmentData: { name: string; code: string }) => Promise<void>;
}

export default function DepartmentModal({ department, onClose, onSave }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Department>({
    defaultValues: {
      name: "",
      code: "",
    },
  });

  // Remplir le formulaire si édition
  useEffect(() => {
    if (department) {
      reset({ name: department.name, code: department.code });
    } else {
      reset({ name: "", code: "" });
    }
  }, [department, reset]);

  const onSubmit: SubmitHandler<Department> = async (data) => {
    try {
      await onSave(data);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          {department ? "Modifier le département" : "Ajouter un département"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-muted mb-1">Nom</label>
            <input
              {...register("name", { required: "Le nom est requis" })}
              className={`w-full border rounded px-3 py-2 bg-background text-foreground
                ${errors.name ? "border-danger" : "border-border"}`}
              placeholder="Ex: Informatique"
            />
            {errors.name && (
              <span className="text-sm text-danger">{errors.name.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Code</label>
            <input
              {...register("code", { required: "Le code est requis" })}
              className={`w-full border rounded px-3 py-2 bg-background text-foreground
                ${errors.code ? "border-danger" : "border-border"}`}
              placeholder="Ex: CS"
            />
            {errors.code && (
              <span className="text-sm text-danger">{errors.code.message}</span>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border rounded hover:bg-surface transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
            >
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
