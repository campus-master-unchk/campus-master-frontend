"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Module, Department, Speciality, Level, AddOrUpdateModule } from "@/types/academic";
import Select from "react-select";
import { selectStyles } from "../ui/reactSelectStyles";
import Image from "next/image";
import process from "process";

interface Props {
  module?: Module | null;
  departments: Department[];
  levels: Level[];
  specialities: Speciality[];
  onClose: () => void;
  onSave: (data: FormData) => Promise<void>;
}



export default function ModuleModal({
  module,
  departments,
  levels,
  specialities,
  onClose,
  onSave,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AddOrUpdateModule>({
    defaultValues: {
      name: "",
      description: "",
      semestre: "SEMESTRE_1",
      department_id: departments[0]?.id || 0,
      level_id: levels[0]?.id || 0,
      specialty_id: specialities[0]?.id || 0,
    },
  });

  /* ===============================
     EDIT MODE
  =============================== */
  useEffect(() => {
    if (module) {
      reset({
        name: module.name,
        description: module.description || "",
        semestre: module.semestre,
        department_id: module.department_id,
        level_id: module.level_id,
        specialty_id: module.specialty_id,
      });
    }
  }, [module, reset]);

  /* ===============================
     SUBMIT
  =============================== */


  const onSubmit = async (data: AddOrUpdateModule) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("department_id", String(data.department_id));
    formData.append("specialty_id", String(data.specialty_id));
    formData.append("level_id", String(data.level_id));
    formData.append("semestre", data.semestre);

    if (data.description) {
      formData.append("description", data.description);
    }

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]); // 👈 LE FICHIER
    }

    await onSave(formData);
    onClose();
  };

  /* ===============================
     RENDER
  =============================== */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background p-6 rounded-lg w-full max-w-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg font-semibold mb-4">
          {module ? "Modifier le module" : "Ajouter un module"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nom */}
          <div>
            <label className="block text-sm mb-1">Nom *</label>
            <input
              {...register("name", { required: "Le nom est requis" })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.name && (
              <span className="text-sm text-danger">{errors.name.message}</span>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              {...register("description")}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Semestre */}
          <div>
            <label className="block text-sm mb-1">Semestre *</label>
            <select
              {...register("semestre", { required: true })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="SEMESTRE_1">SEMESTRE 1</option>
              <option value="SEMESTRE_2">SEMESTRE 2</option>
            </select>
          </div>

          {/* Département */}
          <div>
            <label className="block text-sm mb-1">Département *</label>
            <Controller
              name="department_id"
              control={control}
              rules={{ required: "Le département est requis" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={departments.map((d) => ({
                    value: d.id,
                    label: d.name
                  }))}
                  value={
                    departments.find((d) => d.id === field.value)
                      ? {
                        value: field.value,
                        label: departments.find((d) => d.id === field.value)!.name
                      }
                      : null
                  }
                  onChange={(opt) => field.onChange(opt?.value || 0)}
                  styles={selectStyles}
                />
              )}
            />
            {errors.department_id && (
              <span className="text-sm text-danger">{errors.department_id.message}</span>
            )}
          </div>

          {/* Spécialité */}
          <div>
            <label className="block text-sm mb-1">Spécialité *</label>
            <Controller
              name="specialty_id"
              control={control}
              rules={{ required: "La spécialité est requise" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={specialities.map((s) => ({
                    value: s.id,
                    label: s.name
                  }))}
                  value={
                    specialities.find((s) => s.id === field.value)
                      ? {
                        value: field.value,
                        label: specialities.find((s) => s.id === field.value)!.name
                      }
                      : null
                  }
                  onChange={(opt) => field.onChange(opt?.value || 0)}
                  styles={selectStyles}
                />
              )}
            />
            {errors.specialty_id && (
              <span className="text-sm text-danger">{errors.specialty_id.message}</span>
            )}
          </div>

          {/* Niveau */}
          <div>
            <label className="block text-sm mb-1">Niveau *</label>
            <Controller
              name="level_id"
              control={control}
              rules={{ required: "Le niveau est requis" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={levels.map((l) => ({
                    value: l.id,
                    label: l.name
                  }))}
                  value={
                    levels.find((l) => l.id === field.value)
                      ? {
                        value: field.value,
                        label: levels.find((l) => l.id === field.value)!.name
                      }
                      : null
                  }
                  onChange={(opt) => field.onChange(opt?.value || 0)}
                  styles={selectStyles}
                />
              )}
            />
            {errors.level_id && (
              <span className="text-sm text-danger">{errors.level_id.message}</span>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm mb-1">Image du module</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
            />

            {module?.img_module_url && (
              <div className="mt-2">
                <p className="text-sm mb-1">Image actuelle :</p>
                <Image
                  src={ process.env.NEXT_PUBLIC_API_BASE_URL + module.img_module_url}
                  alt="module"
                  width={12}
                  height={12}
                  className="w-24 h-24 object-cover rounded border"
                  unoptimized
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Annuler
            </button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-primary text-white rounded">
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}