// src/types/announcement.ts

export interface Announcement {
  id: number;
  title: string;
  content: string;
  type: 'general' | 'exam' | 'homework' | 'schedule';
  priority: 'normal' | 'important' | 'urgent';
  state: 'draft' | 'published';
  created_by: number; // user_id
  created_at: string;
  updated_at: string;
}

// Payload pour création ou mise à jour
export interface CreateAnnouncementPayload {
  title: string;
  content: string;
  type: 'general' | 'exam' | 'homework' | 'schedule';
  priority: 'normal' | 'important' | 'urgent';
  state: 'draft' | 'published';
}

export interface UpdateAnnouncementPayload {
  title?: string;
  content?: string;
  type?: 'general' | 'exam' | 'homework' | 'schedule';
  priority?: 'normal' | 'important' | 'urgent';
  state?: 'draft' | 'published';
}
