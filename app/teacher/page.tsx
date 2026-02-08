import Breadcrumb from "@/components/commun/Breadcrumb";
import PageHeader from "@/components/commun/PageHeader";
import QuickAccessGrid from "@/components/commun/QuickAccessGrid";
// import GradesChartSection from "@/components/commun/GradesChartSection";
import AnnouncementsSection from "@/components/commun/AnnouncementsSection";
import HomeworkSection from "@/components/students/HomeworkSection";
import TeacherDashboard from "@/components/teacher/TeacherDashboard";

export default function TeacherHomePage() {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "Accueil", href: "/teacher" }]} />

      {/* Page Header */}
      <PageHeader 
        title="Accueil"
        subtitle="Bienvenue"
      />

      {/* Quick Access Cards */}
      <TeacherDashboard />

      {/* Grades Chart Section */}
      {/* <GradesChartSection /> */}

      
    </div>
  );
}