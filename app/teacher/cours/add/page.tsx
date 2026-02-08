"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { ArrowLeft, Plus, Upload } from "lucide-react";

import { useAcademicStore } from "@/store/admin/academic.store";
import { useCourseStore } from "@/store/teacher/course.store";

type Resource = {
  name: string;
  type: "video" | "docx" | "pdf" | "ppt";
  file?: FileList;
};
type FormValues = {
  title: string;
  description: string;
  module_id: number | null;
  image?: FileList;
  resources: Resource[];
};

export default function CreateCourse() {
  const router = useRouter();
  const { modules, fetchModules } = useAcademicStore();
  const { createCourse, loading } = useCourseStore();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      module_id: null,
      resources: [{ name: "", type: "video" }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "resources",
  });

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  const onSubmit = async (data: FormValues, state: "draft" | "published" = "published") => {
    const formData = new FormData();
    formData.append("name", data.title);
    formData.append("description", data.description);
    formData.append("module_id", String(data.module_id));
    formData.append("state", state);

    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    data.resources.forEach((r, index) => {
      formData.append(`resources[${index}][name]`, r.name);
      formData.append(`resources[${index}][type]`, r.type.toLowerCase());
      if (r.file?.[0]) {
        formData.append(`resources[${index}][file]`, r.file[0]);
      }
    });

    try {
      await createCourse(formData);
      router.push("/teacher/cours");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création du cours.");
    }
  };

  return (
    <div className="max-w-[1024px] mx-auto px-8 py-8">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="mb-6 w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 text-gray-900" />
      </button>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-open-sans font-bold text-gray-900 mb-2">
          Créer un nouveau cours
        </h1>
        <p className="text-base font-open-sans text-gray-600">
          Remplissez les informations pour publier votre cours
        </p>
      </div>

      <form className="space-y-8">
        {/* Informations générales */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
          <h2 className="text-xl font-open-sans font-semibold mb-2">Informations générales</h2>

          <input
            {...register("title", { required: true })}
            placeholder="Titre du cours"
            className="w-full h-10 px-3 border border-gray-300 rounded-md"
          />
          {errors.title && <span className="text-red-500 text-sm">Le titre est requis</span>}

          <select
            {...register("module_id", { required: true })}
            className="w-full h-10 px-3 border border-gray-300 rounded-md"
          >
            <option value="">Sélectionner un module</option>
            {modules.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          {errors.module_id && <span className="text-red-500 text-sm">Le module est requis</span>}

          <textarea
            {...register("description", { required: true })}
            placeholder="Description du cours"
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.description && <span className="text-red-500 text-sm">La description est requise</span>}

          <input
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
          />
          {errors.image && <span className="text-red-500 text-sm">L'image est requise</span>}
        </div>

        {/* Ressources */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-open-sans font-semibold mb-2">Ressources du cours</h2>

          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 border border-gray-200 bg-gray-50 rounded-lg p-4">
              <input
                {...register(`resources.${index}.name`, { required: true })}
                placeholder={`Ressource ${index + 1}`}
                className="w-full h-10 px-3 border border-gray-300 rounded-md"
              />

              <select
                {...register(`resources.${index}.type`, { required: true })}
                className="w-full h-10 px-3 border border-gray-300 rounded-md"
              >
                <option>Vidéo</option>
                <option>Document</option>
                <option>PDF</option>
              </select>

              <label className="border border-dashed rounded-lg p-6 flex flex-col items-center cursor-pointer">
                <Upload className="w-8 h-8 text-gray-500 mb-2" />
                <span className="text-sm">Téléverser un fichier</span>
                <input
                  type="file"
                  className="hidden"
                  {...register(`resources.${index}.file`)}
                />
              </label>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ name: "", type: "video" })}
            className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            <Plus className="w-4 h-4" />
            Ajouter un module
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={handleSubmit((data) => onSubmit(data, "draft"))}
            className="px-5 py-2.5 border rounded-md"
          >
            Enregistrer comme brouillon
          </button>

          <button
            type="button"
            onClick={handleSubmit((data) => onSubmit(data, "published"))}
            disabled={loading}
            className="px-5 py-2.5 bg-blue-primary text-white rounded-md"
          >
            Publier le cours
          </button>
        </div>
      </form>
    </div>
  );
}
