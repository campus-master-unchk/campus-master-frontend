// Department
export interface Department {
  id: number;
  name: string;
  code: string;
  created_at: string;
  updated_at: string;
}

// Level
export interface Level {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

// Speciality
export interface Speciality {
  id?: number;
  name: string;
  description?: string | null;
  department_id: number;
  department?: Department;
  created_at: string;
  updated_at: string;
}

// Module
export interface Module {
  id: number;
  name: string;
  description?: string | null;
  img_module_url?: string | null;
  semestre: 'SEMESTRE_1' | 'SEMESTRE_2';
  department_id: number;
  specialty_id: number;
  level_id: number;
  created_at: string;
  updated_at: string;
  department: Department;
  specialty: Speciality;
  level: Level;
}


export interface AddOrUpdateModule {
  name: string;
  description?: string | null;
  department_id: number;
  specialty_id: number;
  level_id: number;
  semestre: string;
  image?: FileList;
  id?: number;
  created_at?: string;
  updated_at?: string;
  department?: Department;
  specialty?: Speciality;
  level?: Level;
}