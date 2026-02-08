export type CourseState = "published" | "draft";

export type ResourceType = "pdf" | "ppt" | "docx" | "video";

export interface CourseResource {
  id?: number;
  name: string;
  type: ResourceType;
  description?: string | null;
  video_link?: string;
  url_resource?: string;
}

export interface Course {
  id: number;
  name: string;
  description?: string;
  course_url_img: string;
  module_id: number;
  teacher_id: number;
  state: CourseState;
  resources: CourseResource[];
  created_at: string;
}
