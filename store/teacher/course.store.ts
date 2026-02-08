import { create } from "zustand";
import { Course } from "@/types/course";
import { CourseService } from "@/services/teacher/courseService";

interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;

  fetchMyCourses: () => Promise<void>;
  getCourse: (id: number) => Course | undefined;

  createCourse: (data: FormData) => Promise<Course>;
  updateCourse: (id: number, data: FormData) => Promise<Course>;
  deleteCourse: (id: number) => Promise<void>;
  changeState: (id: number, state: "published" | "draft") => Promise<void>;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  loading: false,
  error: null,

  /* ================= FETCH ================= */

 

  fetchMyCourses: async () => {
    set({ loading: true });
    try {
      const res = await CourseService.getMyCourses();
      set({ courses: res.data, loading: false });
    } catch (e: any) {
      set({ error: e.message, loading: false });
    }
  },

  getCourse: (id) => {
    return get().courses.find(c => c.id === id);
  },

  /* ================= CRUD ================= */

  createCourse: async (data) => {
    set({ loading: true });
    try {
      const res = await CourseService.create(data);
      set(state => ({
        courses: [res.data, ...state.courses],
        loading: false,
      }));
      return res.data;
    } catch (e: any) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  updateCourse: async (id, data) => {
    set({ loading: true });
    try {
      const res = await CourseService.update(id, data);
      set(state => ({
        courses: state.courses.map(c =>
          c.id === id ? res.data : c
        ),
        loading: false,
      }));
      return res.data;
    } catch (e: any) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  deleteCourse: async (id) => {
    set({ loading: true });
    try {
      await CourseService.delete(id);
      set(state => ({
        courses: state.courses.filter(c => c.id !== id),
        loading: false,
      }));
    } catch (e: any) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  /* ================= STATE ================= */

  changeState: async (id, state) => {
    try {
      await CourseService.changeState(id, state);
      set(stateStore => ({
        courses: stateStore.courses.map(c =>
          c.id === id ? { ...c, state } : c
        ),
      }));
    } catch (e) {
      throw e;
    }
  },
}));
