"use client";

import { User } from "@/types/userType";

interface Props {
  user: User;
  onClose: () => void;
}

export default function ShowUserModal({ user, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Détails de l'utilisateur</h2>

        <p><strong>Prénom:</strong> {user.first_name}</p>
        <p><strong>Nom:</strong> {user.last_name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Type:</strong> {user.user_type}</p>
        <p><strong>Statut:</strong> {user.status}</p>

        {user.user_type === "student" && (
          <>
            <p><strong>Département:</strong> {(user as any).department_id}</p>
            <p><strong>Niveau:</strong> {(user as any).level_id}</p>
            <p><strong>Spécialité:</strong> {(user as any).speciality_id}</p>
          </>
        )}

        {user.user_type === "teacher" && (
          <p><strong>Département:</strong> {(user as any).department_id}</p>
        )}

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded hover:bg-surface">Fermer</button>
        </div>
      </div>
    </div>
  );
}
