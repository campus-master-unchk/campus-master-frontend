"use client";
import { ColumnConfig, ActionConfig } from "@/components/ui/Table/types";
import { Module } from "@/types/academic";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export function getModuleColumns(): ColumnConfig<Module>[] {
  return [
    { key: 'name', header: 'Nom', render: m => m.name },
    { key: 'description', header: 'Description', render: m => m.description || '-' },
    { key: 'department', header: 'Département', render:m=> m.department.name || '-' },
    { key: 'level', header: 'Niveau', render:m=> m.level.name || '-' },
    { key: 'speciality', header: 'Spécialité', render:m=> m.specialty.name || '-' },
    {
      key: 'image',
      header: 'Image',
      render: m => m.img_module_url ? <Image src={API_BASE_URL + m.img_module_url} width={12} height={12} unoptimized alt={m.name} className="w-12 h-12 object-cover rounded" /> : '-'
    }
  ];
}




export function getModuleActions(
  onEdit: (m: Module) => void,
  onDelete: (m: Module) => void,
  onShow: (m: Module) => void
): ActionConfig<Module>[] {
  return [
    { label: '', icon: <FaEye />, onClick: onShow },
    { label: '', icon: <FaEdit />, onClick: onEdit },
    { label: '', icon: <FaTrash />, onClick: onDelete, }
  ];
}
