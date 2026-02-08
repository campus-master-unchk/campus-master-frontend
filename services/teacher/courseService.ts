import { Course } from "@/types/course";
import api from "../api";

export const CourseService = {

  getMyCourses: () => api.get<Course[]>("api/teacher/courses"),

  getById: (id: number) => api.get<Course>(`api/teacher/courses/${id}`),

  create: (data: FormData) =>
    api.post<Course>("api/teacher/courses", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  update: (id: number, data: FormData) =>
    api.post<Course>(`api/teacher/courses/${id}?_method=PUT`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  changeState: (id: number, state: "published" | "draft") =>
    api.patch(`api/teacher/courses/${id}/state`, { state }),

  delete: (id: number) => api.delete(`api/teacher/courses/${id}`),
};
