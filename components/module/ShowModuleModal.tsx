"use client";
import Image from "next/image";
import { Module, Department, Level, Speciality } from "@/types/academic";

interface Props {
  module: Module;
  departments: Department[];
  levels: Level[];
  specialities: Speciality[];
  onClose: () => void;
}

export default function ShowModuleModal({ module, departments, levels, specialities, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background p-6 rounded-lg w-full max-w-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Détails du module
        </h2>

        <p><strong>Nom:</strong> {module.name}</p>
        {module.description && <p><strong>Description:</strong> {module.description}</p>}
        <p><strong>Département:</strong> {departments.find(d => d.id === module.department_id)?.name || '-'}</p>
        <p><strong>Niveau:</strong> {levels.find(l => l.id === module.level_id)?.name || '-'}</p>
        <p><strong>Spécialité:</strong> {specialities.find(s => s.id === module.specialty_id)?.name || '-'}</p>
        {module.img_module_url && <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + module.img_module_url} alt={module.name} width={100} height={100} unoptimized className="w-32 h-32 object-cover rounded mt-2" />}

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 border border-border rounded hover:bg-surface transition">Fermer</button>
        </div>
      </div>
    </div>
  );
}
