

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Level } from "@/types/academic";

interface Props {
  level: Level | null;
  onClose: () => void;
  onSave: (data: { name: string }) => Promise<void>;
}

export default function LevelModal({ level, onClose, onSave }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ name: string }>({ defaultValues: { name: "" } });

  useEffect(() => {
    reset(level ? { name: level.name } : { name: "" });
  }, [level, reset]);

  const submit = async (data: { name: string }) => {
    await onSave(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-background p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {level ? "Modifier le niveau" : "Ajouter un niveau"}
        </h2>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div>
            <label className="text-sm">Nom</label>
            <input
              {...register("name", { required: "Nom requis" })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.name && (
              <p className="text-danger text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="border px-4 py-2 rounded">
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white px-4 py-2 rounded"
            >
              {isSubmitting ? "..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
