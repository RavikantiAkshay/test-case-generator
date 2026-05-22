import { create } from 'zustand';
import {
  createProjectAPI,
  listProjectsAPI,
  getProjectAPI,
  updateProjectAPI,
  deleteProjectAPI,
} from '../api/projectApi';

const useProjectStore = create((set, get) => ({
  projects: [],
  activeProject: null,
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await listProjectsAPI();
      set({ projects: res.data, isLoading: false });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to load projects';
      set({ error: message, isLoading: false });
    }
  },

  createProject: async ({ projectName, description }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await createProjectAPI({ projectName, description });
      set((state) => ({
        projects: [res.data, ...state.projects],
        isLoading: false,
      }));
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create project';
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  fetchProject: async (projectId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await getProjectAPI(projectId);
      set({ activeProject: res.data, isLoading: false });
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to load project';
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  updateProject: async (projectId, updates) => {
    try {
      const res = await updateProjectAPI(projectId, updates);
      set((state) => ({
        projects: state.projects.map((p) => (p._id === projectId ? res.data : p)),
        activeProject: state.activeProject?._id === projectId ? res.data : state.activeProject,
      }));
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update project';
      throw new Error(message);
    }
  },

  deleteProject: async (projectId) => {
    try {
      await deleteProjectAPI(projectId);
      set((state) => ({
        projects: state.projects.filter((p) => p._id !== projectId),
        activeProject: state.activeProject?._id === projectId ? null : state.activeProject,
      }));
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete project';
      throw new Error(message);
    }
  },

  setActiveProject: (project) => set({ activeProject: project }),
  clearError: () => set({ error: null }),
}));

export default useProjectStore;
