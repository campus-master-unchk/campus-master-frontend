import { create } from 'zustand';
import {
  Department,
  Level,
  Speciality,
  Module,
  AddOrUpdateModule,
} from '@/types/academic';

import { departmentService } from '@/services/admin/departmentService';
import { levelService } from '@/services/admin/levelService';
import { specialityService } from '@/services/admin/specialityService';
import { moduleService } from '@/services/admin/moduleService';

/* =========================================================
   INTERFACE
========================================================= */

interface AcademicState {
  /* ---------- DATA ---------- */
  departments: Department[];
  levels: Level[];
  specialities: Speciality[];
  modules: Module[];

  /* ---------- UI STATE ---------- */
  loading: {
    departments: boolean;
    levels: boolean;
    specialities: boolean;
    modules: boolean;
  };

  error: string | null;

  /* ---------- DEPARTMENTS ---------- */
  fetchDepartments: () => Promise<void>;
  addDepartment: (data: Pick<Department, 'name' | 'code'>) => Promise<void>;
  updateDepartment: (
    id: number,
    data: Partial<Department>
  ) => Promise<void>;
  deleteDepartment: (id: number) => Promise<void>;

  /* ---------- LEVELS ---------- */
  fetchLevels: () => Promise<void>;
  addLevel: (data: Pick<Level, 'name'>) => Promise<void>;
  updateLevel: (id: number, data: Partial<Level>) => Promise<void>;
  deleteLevel: (id: number) => Promise<void>;

  /* ---------- SPECIALITIES ---------- */
  fetchSpecialities: () => Promise<void>;
  addSpeciality: (
    data: Pick<Speciality, 'name' | 'description' | 'department_id'>
  ) => Promise<void>;
  updateSpeciality: (
    id: number,
    data: Partial<Speciality>
  ) => Promise<void>;
  deleteSpeciality: (id: number) => Promise<void>;

  /* ---------- MODULES ---------- */
  fetchModules: () => Promise<void>;
  addModule: (data: FormData) => Promise<void>;
  updateModule: (id: number, data: FormData) => Promise<void>;
  deleteModule: (id: number) => Promise<void>;

}

/* =========================================================
   STORE
========================================================= */

export const useAcademicStore = create<AcademicState>((set, get) => ({
  /* ---------- INITIAL STATE ---------- */
  departments: [],
  levels: [],
  specialities: [],
  modules: [],

  loading: {
    departments: false,
    levels: false,
    specialities: false,
    modules: false,
  },

  error: null,

  /* =====================================================
     DEPARTMENTS
  ===================================================== */

  fetchDepartments: async () => {
    set((s) => ({
      loading: { ...s.loading, departments: true },
      error: null,
    }));

    try {
      const data = await departmentService.getAll();
      set((s) => ({
        departments: data,
        loading: { ...s.loading, departments: false },
      }));
    } catch {
      set((s) => ({
        error: 'Erreur lors du chargement des départements',
        loading: { ...s.loading, departments: false },
      }));
    }
  },

  addDepartment: async (data) => {
    const res = await departmentService.create(data);
    set((s) => ({
      departments: [...s.departments, res.data.data],
    }));
  },

  updateDepartment: async (id, data) => {
    const res = await departmentService.update(id, data);
    set((s) => ({
      departments: s.departments.map((d) =>
        d.id === id ? res.data.data : d
      ),
    }));
  },

  deleteDepartment: async (id) => {
    await departmentService.delete(id);
    set((s) => ({
      departments: s.departments.filter((d) => d.id !== id),
    }));
  },

  /* =====================================================
     LEVELS
  ===================================================== */

  fetchLevels: async () => {
    set((s) => ({
      loading: { ...s.loading, levels: true },
      error: null,
    }));

    try {
      const data = await levelService.getAll();
      set((s) => ({
        levels: data,
        loading: { ...s.loading, levels: false },
      }));
    } catch {
      set((s) => ({
        error: 'Erreur lors du chargement des niveaux',
        loading: { ...s.loading, levels: false },
      }));
    }
  },

  addLevel: async (data) => {
    const res = await levelService.create(data);
    set((s) => ({
      levels: [...s.levels, res.data.data],
    }));
  },

  updateLevel: async (id, data) => {
    const res = await levelService.update(id, data);
    set((s) => ({
      levels: s.levels.map((l) =>
        l.id === id ? res.data.data : l
      ),
    }));
  },

  deleteLevel: async (id) => {
    await levelService.delete(id);
    set((s) => ({
      levels: s.levels.filter((l) => l.id !== id),
    }));
  },

  /* =====================================================
     SPECIALITIES
  ===================================================== */

  fetchSpecialities: async () => {
    set((s) => ({
      loading: { ...s.loading, specialities: true },
      error: null,
    }));

    try {
      const data = await specialityService.getAll();
      set((s) => ({
        specialities: data,
        loading: { ...s.loading, specialities: false },
      }));
    } catch {
      set((s) => ({
        error: 'Erreur lors du chargement des spécialités',
        loading: { ...s.loading, specialities: false },
      }));
    }
  },

  addSpeciality: async (data) => {
    const res = await specialityService.create(data);
    set((s) => ({
      specialities: [...s.specialities, res.data.data],
    }));
  },

  updateSpeciality: async (id, data) => {
    const res = await specialityService.update(id, data);
    set((s) => ({
      specialities: s.specialities.map((sp) =>
        sp.id === id ? res.data.data : sp
      ),
    }));
  },

  deleteSpeciality: async (id) => {
    await specialityService.delete(id);
    set((s) => ({
      specialities: s.specialities.filter((sp) => sp.id !== id),
    }));
  },

  /* =====================================================
     MODULES
  ===================================================== */

  fetchModules: async () => {
    set((s) => ({
      loading: { ...s.loading, modules: true },
      error: null,
    }));

    try {
      const data = await moduleService.getAll();
      set((s) => ({
        modules: data,
        loading: { ...s.loading, modules: false },
      }));
    } catch {
      set((s) => ({
        error: 'Erreur lors du chargement des modules',
        loading: { ...s.loading, modules: false },
      }));
    }
  },

  addModule: async (formData: FormData) => {
    set(state => ({
      loading: { ...state.loading, modules: true }
    }));

    try {
      const res = await moduleService.create(formData); // res.data.data = nouveau module
      set(state => ({
        modules: [...state.modules, res.data.data],
        loading: { ...state.loading, modules: false }
      }));
    } catch (error) {
      set(state => ({
        loading: { ...state.loading, modules: false },
        error: 'Erreur lors de la création du module'
      }));
    }
  },

  updateModule: async (id: number, formData: FormData) => {
    set(state => ({
      loading: { ...state.loading, modules: true }
    }));

    try {
      const res = await moduleService.update(id, formData); // res.data.data = module mis à jour
      set(state => ({
        modules: state.modules.map(m => m.id === id ? res.data.data : m),
        loading: { ...state.loading, modules: false }
      }));
    } catch (error) {
      set(state => ({
        loading: { ...state.loading, modules: false },
        error: 'Erreur lors de la mise à jour du module'
      }));
    }
  },

  deleteModule: async (id) => {
    await moduleService.delete(id);
    set((s) => ({
      modules: s.modules.filter((m) => m.id !== id),
    }));
  },
}));
