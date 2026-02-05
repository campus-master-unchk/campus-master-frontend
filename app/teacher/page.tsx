import Breadcrumb from "@/components/commun/Breadcrumb";
import PageHeader from "@/components/commun/PageHeader";
import QuickAccessGrid from "@/components/commun/QuickAccessGrid";
// import GradesChartSection from "@/components/commun/GradesChartSection";
import AnnouncementsSection from "@/components/commun/AnnouncementsSection";
import HomeworkSection from "@/components/students/HomeworkSection";

export default function TeacherHomePage() {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "Accueil", href: "/student" }]} />

      {/* Page Header */}
      <PageHeader 
        title="Accueil"
        subtitle="Bienvenue, Jean Dupont."
      />

      {/* Quick Access Cards */}
      <QuickAccessGrid />

      {/* Grades Chart Section */}
      {/* <GradesChartSection /> */}

      {/* Bottom Section: Homework & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-12">
        {/* Homework Section */}
        <HomeworkSection />

        {/* Announcements Section */}
        <AnnouncementsSection />
      </div>
    </div>
  );
}