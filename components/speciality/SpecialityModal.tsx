"use client";

import { useEffect } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { Department, Speciality } from "@/types/academic";
import { selectStyles } from "@/components/ui/reactSelectStyles";

interface Props {
  speciality: Speciality | null;
  departments: Department[];
  onClose: () => void;
  onSave: (data: {
    name: string;
    description?: string;
    department_id: number;
  }) => Promise<void>;
}

interface FormValues {
  name: string;
  description?: string;
  department: { value: number; label: string } | null;
}

export default function SpecialityModal({
  speciality,
  departments,
  onClose,
  onSave,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      department: null,
    },
  });

  // Préparer options
  const departmentOptions = departments.map((d) => ({
    value: d.id,
    label: d.name,
  }));

  // Mode édition
  useEffect(() => {
    if (speciality) {
      reset({
        name: speciality.name,
        description: speciality.description || "",
        department: departmentOptions.find(
          (d) => d.value === speciality.department_id
        ) || null,
      });
    } else {
      reset({ name: "", description: "", department: null });
    }
  }, [speciality]);


  

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {speciality ? "Modifier" : "Ajouter"} une spécialité
        </h2>

        <form
          onSubmit={handleSubmit(async (data) => {
            await onSave({
              name: data.name,
              description: data.description,
              department_id: data.department!.value,
            });
            onClose();
          })}
          className="space-y-4"
        >
          {/* Nom */}
          <input
            {...register("name", { required: true })}
            placeholder="Nom"
            className="w-full border border-border px-3 py-2 rounded bg-background text-foreground"
          />

          {/* Description */}
          <textarea
            {...register("description")}
            placeholder="Description"
            className="w-full border border-border px-3 py-2 rounded bg-background text-foreground"
          />

          {/* Département (react-select) */}
          <Controller
            name="department"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={departmentOptions}
                styles={selectStyles}
                placeholder="Sélectionner un département"
                isClearable
              />
            )}
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="border border-border px-4 py-2 rounded"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white px-4 py-2 rounded"
            >
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
