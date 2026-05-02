"use client";

import { useState, useCallback } from "react";
import type { Project } from "@/types/project";

// Simple in-memory store for projects (can be replaced with API later)
const initialProjects: Project[] = [];

let globalProjects = initialProjects;
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(globalProjects);

  const addProject = useCallback((name: string, description?: string) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    globalProjects = [...globalProjects, newProject];
    setProjects(globalProjects);
    emitChange();
    return newProject;
  }, []);

  const removeProject = useCallback((id: string) => {
    globalProjects = globalProjects.filter((p) => p.id !== id);
    setProjects(globalProjects);
    emitChange();
  }, []);

  const getProject = useCallback((id: string) => {
    return globalProjects.find((p) => p.id === id);
  }, []);

  return { projects, addProject, removeProject, getProject };
}
