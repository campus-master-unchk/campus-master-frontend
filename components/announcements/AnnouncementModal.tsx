"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Announcement } from "@/types/announcement";
import { useEffect } from "react";

interface Props {
    announcement?: Announcement | null;
    onSave: (data: any) => void;
    onClose: () => void;
}

export default function AnnouncementModal({ announcement, onSave, onClose }: Props) {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: announcement || {
            title: "",
            content: "",
            type: "general",
            priority: "normal",
            state: "draft",
        },
    });

    // Remplir le formulaire si édition
    useEffect(() => {
        if (announcement) {
            reset({
                title: announcement.title,
                content: announcement.content,
                type: announcement.type,
                priority: announcement.priority,
                state: announcement.state
            });
        } else {
            reset({
                title: "",
                content: "",
                type: "general",
                priority: "normal",
                state: "draft",
            });
        }
    }, [announcement, reset]);

    const onSubmit: SubmitHandler<Announcement> = async (data) => {
        try {
            await onSave(data);
            onClose();
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-background p-6 rounded-lg w-full max-w-lg space-y-4"
            >
                <h2 className="text-lg font-semibold">
                    {announcement ? "Modifier l’annonce" : "Nouvelle annonce"}
                </h2>

                <input {...register("title")} placeholder="Titre" className="input w-full" />
                <textarea {...register("content")} placeholder="Contenu" className="input w-full h-32" />

                <select {...register("type")} className="input w-full">
                    <option value="general">Général</option>
                    <option value="exam">Examen</option>
                    <option value="homework">Devoir</option>
                    <option value="schedule">Emploi du temps</option>
                </select>

                <select {...register("priority")} className="input w-full">
                    <option value="normal">Normal</option>
                    <option value="important">Important</option>
                    <option value="urgent">Urgent</option>
                </select>

                <select {...register("state")} className="input w-full">
                    <option value="draft">Brouillon</option>
                    <option value="published">Publié</option>
                </select>

                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="btn-secondary">
                        Annuler
                    </button>
                    <button type="submit" className="btn-primary">
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    );
}
