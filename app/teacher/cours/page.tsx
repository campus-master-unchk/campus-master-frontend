"use client";

import { useEffect, useState, useMemo } from "react";
import { BookOpen, Edit } from "lucide-react";
import Link from "next/link";

import CourseFilters from "@/components/teacher/courses/CourseFilters";
import { useCourseStore } from "@/store/teacher/course.store";
import Image from "next/image";

export default function CoursesPage() {
  const { courses, loading, fetchMyCourses } = useCourseStore();

  const [search, setSearch] = useState("");
  const [state, setState] = useState<"published" | "draft" | null>(null);
  const [moduleId, setModuleId] = useState<number | null>(null);

  useEffect(() => {
    fetchMyCourses();
  }, [fetchMyCourses]);

  // 🔹 Modules dynamiques à partir des cours
const modulesFilter = useMemo(() => {
  const set = new Set<number>();

  courses.forEach((c) => {
    if (c.module_id) {
      set.add(c.module_id);
    }
  });

  return Array.from(set);
}, [courses]);


  // 🔹 Filtrage
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      return (
        c.name?.toLowerCase().includes(search.toLowerCase()) &&
        (!state || c.state === state) &&
        (!moduleId || c.module_id === moduleId)
      );
    });
  }, [courses, search, state, moduleId]);

  if (loading) {
    return <p className="text-center py-10">Chargement...</p>;
  }

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Mes cours</h1>

        <Link
          href="/teacher/cours/add"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          + Ajouter
        </Link>
      </div>

      {/* Filtres */}
      <CourseFilters
        search={search}
        onSearchChange={setSearch}
        state={state}
        onStateChange={setState}
        moduleId={moduleId}
        onModuleChange={setModuleId}
        modules={modulesFilter}
      />

      {/* Liste */}
      {filteredCourses.length === 0 ? (
        <p className="text-center text-muted py-10">Aucun cours</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white border rounded-lg overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-40 bg-gray-200">
                <Image
                  src={API_BASE_URL+course.course_url_img || "/placeholder.jpg"}
                  alt={course.name}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-sm font-semibold mb-1 line-clamp-2 h-10">
                  {course.name}
                </h3>

                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {course.description || "Aucune description"}
                </p>

                <span
                  className={`inline-block mb-3 px-2 py-1 rounded text-xs ${
                    course.state === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {course.state}
                </span>

                <div className="flex gap-2">
                  <Link
                    href={`/teacher/cours/${course.id}`}
                    className="flex-1 h-9 bg-primary text-white text-sm rounded flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    Gérer
                  </Link>

                  <Link
                    href={`/teacher/cours/${course.id}/edit`}
                    className="w-9 h-9 border rounded flex items-center justify-center hover:bg-gray-50"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
