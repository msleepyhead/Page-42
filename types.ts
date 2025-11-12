export enum Role {
  ADMIN = 'admin',
  MEMBER = 'member'
}

export enum ResourceType {
  LECTURE = 'Lecture',
  SLIDE = 'Slide',
  SUGGESTION = 'Suggestion',
  NOTE = 'Note',
  VIDEO = 'Video'
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  profilePhoto?: string;
  createdAt: string;
}

export interface Subject {
  id: string;
  name: string;
}

export interface Resource {
  id: string;
  title: string;
  subjectId: string;
  type: ResourceType;
  fileUrl: string;
  description?: string;
  uploadedBy: string; // userId
  uploadedAt: string;
}

export interface Post {
  id: string;
  authorId: string; // userId
  content: string;
  attachment?: string;
  createdAt: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  authorId: string; // userId
  createdAt: string;
}