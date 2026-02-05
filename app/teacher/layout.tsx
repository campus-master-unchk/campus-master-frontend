'use client'

import RoleGuard from "@/components/auth/RoleGuard";
import StudentHeader from "@/components/students/studentHeader";
import { TeacherNav } from "@/config/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <RoleGuard allowedRole="teacher">
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <StudentHeader navItems={TeacherNav} user={{ name: "John Doe", role: "Teacher", initials: "JD" }} />

      {/* Main Content */}
      <main className="pt-20 bg-background-main-content">
        {children}
      </main>
    </div>
    </RoleGuard>
  );
}
