import { User, Subject, Resource, Post, Notice, Role, ResourceType } from '../types';

export const MOCK_USERS: User[] = [
  { id: 'user-1', name: 'Admin User', email: 'admin@page42.com', passwordHash: 'hashed', role: Role.ADMIN, profilePhoto: 'https://picsum.photos/seed/admin/200', createdAt: '2023-01-01T10:00:00Z' },
  { id: 'user-2', name: 'Rohan Sharma', email: 'rohan@page42.com', passwordHash: 'hashed', role: Role.MEMBER, profilePhoto: 'https://picsum.photos/seed/rohan/200', createdAt: '2023-01-02T11:00:00Z' },
  { id: 'user-3', name: 'Priya Patel', email: 'priya@page42.com', passwordHash: 'hashed', role: Role.MEMBER, profilePhoto: 'https://picsum.photos/seed/priya/200', createdAt: '2023-01-03T12:00:00Z' },
  { id: 'user-4', name: 'Amit Singh', email: 'amit@page42.com', passwordHash: 'hashed', role: Role.MEMBER, profilePhoto: 'https://picsum.photos/seed/amit/200', createdAt: '2023-01-04T13:00:00Z' },
];

export const MOCK_SUBJECTS: Subject[] = [
  { id: 'subj-calculus', name: 'Calculus II' },
  { id: 'subj-english', name: 'Compulsory English' },
  { id: 'subj-envchem', name: 'Environment Chemistry' },
  { id: 'subj-fortran', name: 'Fortran Programming' },
  { id: 'subj-chem', name: 'Non Major Chemistry II' },
  { id: 'subj-physics', name: 'Non Major Physics III' },
  { id: 'subj-ode', name: 'Ordinary Differential Equations' },
];

export const MOCK_RESOURCES: Resource[] = [
  { id: 'res-1', title: 'Lecture 1 - Sequences and Series', subjectId: 'subj-calculus', type: ResourceType.LECTURE, fileUrl: '/sample.pdf', uploadedBy: 'user-1', uploadedAt: '2023-10-01T09:00:00Z', description: 'Introduction to infinite series.' },
  { id: 'res-2', title: 'Video on Taylor Series', subjectId: 'subj-calculus', type: ResourceType.VIDEO, fileUrl: '/sample.mp4', uploadedBy: 'user-2', uploadedAt: '2023-10-02T14:00:00Z' },
  // FIX: Changed 'name' property to 'title' to match the Resource interface.
  { id: 'res-3', title: 'Final Exam Suggestion', subjectId: 'subj-english', type: ResourceType.SUGGESTION, fileUrl: '/sample.pdf', uploadedBy: 'user-3', uploadedAt: '2023-10-03T11:00:00Z', description: 'Important topics for the final exam.' },
  // FIX: Changed 'name' property to 'title' to match the Resource interface.
  { id: 'res-4', title: 'My Notes on Water Pollution', subjectId: 'subj-envchem', type: ResourceType.NOTE, fileUrl: '/sample.pdf', uploadedBy: 'user-4', uploadedAt: '2023-10-04T16:00:00Z' },
  { id: 'res-5', title: 'Chapter 3 Slides - DO WHILE loops', subjectId: 'subj-fortran', type: ResourceType.SLIDE, fileUrl: '/sample.pdf', uploadedBy: 'user-1', uploadedAt: '2023-10-05T09:30:00Z' },
  { id: 'res-6', title: 'Solving First Order ODEs', subjectId: 'subj-ode', type: ResourceType.LECTURE, fileUrl: '/sample.pdf', uploadedBy: 'user-2', uploadedAt: '2023-10-06T10:00:00Z', description: 'Methods for solving first order ordinary differential equations.'},
];

export const MOCK_POSTS: Post[] = [
  { id: 'post-1', authorId: 'user-2', content: 'Has anyone started on the Calculus assignment yet?', createdAt: '2023-10-10T18:00:00Z' },
  { id: 'post-2', authorId: 'user-3', content: 'Yes, I\'m stuck on question 3. The series convergence problem is tricky.', createdAt: '2023-10-10T18:05:00Z' },
  { id: 'post-3', authorId: 'user-1', content: 'I uploaded some notes on that topic in the Calculus section. Check it out!', createdAt: '2023-10-10T19:00:00Z' },
];

export const MOCK_NOTICES: Notice[] = [
  { id: 'notice-1', title: 'Mid-term Exam Schedule', content: 'The mid-term exams will be held from Nov 15th to Nov 22nd. Please check the department notice board for the detailed routine.', authorId: 'user-1', createdAt: '2023-10-05T10:00:00Z'},
  { id: 'notice-2', title: 'Library Books Return', content: 'All library books must be returned by the end of this month to avoid fines.', authorId: 'user-1', createdAt: '2023-09-28T15:00:00Z'}
];