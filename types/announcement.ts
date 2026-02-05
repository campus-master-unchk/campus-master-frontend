// src/types/announcement.ts

export type AnnouncementStatus = 'draft' | 'published';

export interface Announcement {
  id: number;
  title: string;
  content: string;
  status: AnnouncementStatus;
  created_by: number; // user_id
  created_at: string;
  updated_at: string;
}

// Payload pour création ou mise à jour
export interface CreateAnnouncementPayload {
  title: string;
  content: string;
  status?: AnnouncementStatus; // facultatif, default draft
}

export interface UpdateAnnouncementPayload {
  title?: string;
  content?: string;
  status?: AnnouncementStatus;
}
