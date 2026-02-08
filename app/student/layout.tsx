'use client'

import RoleGuard from "@/components/auth/RoleGuard";
import StudentHeader from "@/components/students/studentHeader";
import { studentNav } from "@/config/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <RoleGuard allowedRole="student">
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <StudentHeader navItems={studentNav} user_type="student" />

      {/* Main Content */}
      <main className="pt-20 bg-background-main-content">
        {children}
      </main>
    </div>
    </RoleGuard>
  );
}
