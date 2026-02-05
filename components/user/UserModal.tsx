"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Department, Level, Speciality } from "@/types/academic";
import Select from "react-select";
import { User, UserRole } from "@/types/userType";

interface Props {
    user: User | null;
    departments: Department[];
    levels: Level[];
    specialities: Speciality[];
    onClose: () => void;
    onSave: (data: any) => Promise<void>;
}

interface FormValues {
    first_name: string;
    last_name: string;
    email: string;
    user_type: UserRole;
    status: string;
    password?: string;
    department_id?: number;
    level_id?: number;
    specialty_id?: number;
}

export default function UserModal({ user, departments, levels, specialities, onClose, onSave }: Props) {
    const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting }, setValue } = useForm<FormValues>({
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            user_type: "student",
            status: "active",
            password: "",
            department_id: undefined,
            level_id: undefined,
            specialty_id: undefined,
        },
    });

    const userType = watch("user_type");

    useEffect(() => {
        if (user) {
            reset({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                user_type: user.user_type,
                status: user.status,
                department_id: (user as any).department_id,
                level_id: (user as any).level_id,
                specialty_id: (user as any).specialty_id,
            });
        } else {
            reset({
                first_name: "",
                last_name: "",
                email: "",
                user_type: "student",
                status: "active",
                department_id: undefined,
                level_id: undefined,
                specialty_id: undefined,
            });
        }
    }, [user, reset]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await onSave(data);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-background p-6 rounded-lg w-full max-w-md">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                    {user ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm text-muted mb-1">Prénom</label>
                        <input
                            {...register("first_name", { required: "Le prénom est requis" })}
                            className={`w-full border rounded px-3 py-2 ${errors.first_name ? "border-danger" : "border-border"}`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-muted mb-1">Nom</label>
                        <input
                            {...register("last_name", { required: "Le nom est requis" })}
                            className={`w-full border rounded px-3 py-2 ${errors.last_name ? "border-danger" : "border-border"}`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-muted mb-1">Email</label>
                        <input
                            {...register("email", { required: "L'email est requis" })}
                            className={`w-full border rounded px-3 py-2 ${errors.email ? "border-danger" : "border-border"}`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-muted mb-1">Status</label>
                        <select {...register("status")} className="w-full border rounded px-3 py-2">
                            <option value="active">Actif</option>
                            <option value="inactive">Inactif</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-muted mb-1">Type</label>
                        <select {...register("user_type")} className="w-full border rounded px-3 py-2">
                            <option value="student">Étudiant</option>
                            <option value="teacher">Enseignant</option>
                        </select>
                    </div>

                    {(userType === "student" || userType === "teacher") && (
                        <div className="space-y-2">
                            <label className="block text-sm text-muted mb-1">Département</label>
                            <Select
                                options={departments.map(d => ({ value: d.id, label: d.name }))}
                                value={departments.find(d => d.id === watch("department_id")) ? { value: watch("department_id")!, label: departments.find(d => d.id === watch("department_id"))!.name } : null}
                                onChange={v => setValue("department_id", v?.value)}
                                isClearable
                            />
                        </div>
                    )}

                    {userType === "student" && (
                        <>
                            <div>
                                <label className="block text-sm text-muted mb-1">Niveau</label>
                                <Select
                                    options={levels.map(l => ({ value: l.id, label: l.name }))}
                                    value={levels.find(l => l.id === watch("level_id")) ? { value: watch("level_id")!, label: levels.find(l => l.id === watch("level_id"))!.name } : null}
                                    onChange={v => setValue("level_id", v?.value)}
                                    isClearable
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-muted mb-1">Spécialité</label>
                                <Select
                                    options={specialities.map(d => ({ value: d.id, label: d.name }))}
                                    value={
                                        watch("specialty_id") != null
                                            ? { value: watch("specialty_id"), label: specialities.find(d => d.id === watch("specialty_id"))!.name }
                                            : null
                                    }
                                    onChange={v => setValue("specialty_id", v?.value ?? undefined)}
                                    isClearable
                                />

                            </div>
                        </>
                    )}

                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-surface">Annuler</button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
                            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
