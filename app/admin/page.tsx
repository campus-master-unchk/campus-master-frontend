"use client";
import { useEffect } from "react";
import Breadcrumb from "@/components/commun/Breadcrumb";
import PageHeader from "@/components/commun/PageHeader";
import AdminStats from "@/components/admin/AdminStats";
import RecentActivity from "@/components/admin/RecentActivity";
import UserTable from "@/components/admin/UserTable";
import UserTableRecents from "@/components/admin/UserTableRecents";
import { useAnalyticsStore } from "@/store/admin/analytic.store";
import Link from "next/link";

export default function AdminDashboardPage() {

  const { analytics, loading, fetchAnalytics } = useAnalyticsStore();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "Administration" }]} />
      
      {/* Page Header */}
      <PageHeader 
        title="Tableau de bord Administrateur"
        subtitle="Gérez votre plateforme CampusMaster"
        actions={
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Générer rapport
          </button>
        }
      />

      {/* Stats Cards */}
      <AdminStats totalStudents={analytics.total_students} totalTeachers={analytics.total_teachers} totalModules={analytics.total_modules} totalCourses={analytics.total_courses} />

      {/* Two Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Dernières activités */}
        <RecentActivity />
        
        {/* Right Column - Utilisateurs récents */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              Utilisateurs récents
            </h3>
            <Link href="/admin/users" className="text-sm text-primary hover:underline">
              Voir tout
            </Link>
          </div>
          <UserTableRecents users={analytics.recent_users} limit={5} />
        </div>
      </div>
    </div>
  );
}