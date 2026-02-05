"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";

export default function RoleGuard({
  children,
  allowedRole
}: {
  children: React.ReactNode,
  allowedRole: 'admin' | 'teacher' | 'student'
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const userStr = authService.getCookie('user');
    if (!userStr) {
      router.push('/');
      return;
    }

    const user = JSON.parse(userStr);
    if (user.user_type !== allowedRole) {
      router.push(`/${user.user_type}`);
    } else {
      setAuthorized(true);
    }
  }, [allowedRole, router]);

  if (!authorized) return (
    <div className="py-12 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p className="mt-4 text-muted">Chargement des données...</p>
    </div>);

  return <>{children}</>;
}