import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, Subject, Resource, Post, Notice, Role } from '../types';
import { MOCK_USERS, MOCK_SUBJECTS, MOCK_RESOURCES, MOCK_POSTS, MOCK_NOTICES } from '../data/mock';

interface DataContextType {
  users: User[];
  subjects: Subject[];
  resources: Resource[];
  posts: Post[];
  notices: Notice[];
  cachedResources: Resource[];
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  addResource: (resource: Omit<Resource, 'id' | 'uploadedAt'>) => void;
  addResourceToCache: (resource: Resource) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const CACHE_KEY = 'page42-offline-cache';

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [subjects, setSubjects] = useState<Subject[]>(MOCK_SUBJECTS);
  const [resources, setResources] = useState<Resource[]>(MOCK_RESOURCES);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [notices, setNotices] = useState<Notice[]>(MOCK_NOTICES);
  const [cachedResources, setCachedResources] = useState<Resource[]>([]);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        setCachedResources(JSON.parse(cached));
      }
    } catch (error) {
      console.error("Failed to load cached resources:", error);
    }
  }, []);

  const addUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setUsers(prev => [...prev, newUser]);
  };

  const addResource = (resourceData: Omit<Resource, 'id' | 'uploadedAt'>) => {
    const newResource: Resource = {
      ...resourceData,
      id: `res-${Date.now()}`,
      uploadedAt: new Date().toISOString(),
    };
    setResources(prev => [newResource, ...prev]);
  };

  const addResourceToCache = (resource: Resource) => {
    setCachedResources(prev => {
      // Avoid duplicates and move the newly accessed item to the top
      const filtered = prev.filter(r => r.id !== resource.id);
      const newCache = [resource, ...filtered];
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(newCache));
      } catch (error) {
        console.error("Failed to save to cache:", error);
      }
      return newCache;
    });
  };
  
  return (
    <DataContext.Provider value={{ users, subjects, resources, posts, notices, cachedResources, addUser, addResource, addResourceToCache }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};