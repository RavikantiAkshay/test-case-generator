import { create } from 'zustand';
import {
  generateTestAPI,
  regenerateTestAPI,
  updateFeedbackAPI,
  updateContentAPI,
  getProjectGenerationsAPI,
} from '../api/generateApi';

const useGenerateStore = create((set, get) => ({
  generations: [],
  isLoading: false,
  error: null,

  fetchGenerations: async (projectId) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getProjectGenerationsAPI(projectId);
      set({ generations: data.data || [], isLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, isLoading: false });
      throw err;
    }
  },

  generateTest: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const data = await generateTestAPI(payload);
      set((state) => ({
        generations: [data.data, ...state.generations],
        isLoading: false,
      }));
      return data.data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, isLoading: false });
      throw err;
    }
  },

  regenerateTest: async (generationId, additionalInstructions) => {
    set({ isLoading: true, error: null });
    try {
      const data = await regenerateTestAPI(generationId, additionalInstructions);
      set((state) => ({
        generations: [data.data, ...state.generations.filter(g => g._id !== generationId)],
        isLoading: false,
      }));
      return data.data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, isLoading: false });
      throw err;
    }
  },

  updateFeedback: async (generationId, feedbackData) => {
    try {
      const data = await updateFeedbackAPI(generationId, feedbackData);
      set((state) => ({
        generations: state.generations.map((g) =>
          g._id === generationId ? data.data : g
        ),
      }));
    } catch (err) {
      throw err;
    }
  },

  updateContent: async (generationId, content) => {
    try {
      const data = await updateContentAPI(generationId, content);
      set((state) => ({
        generations: state.generations.map((g) =>
          g._id === generationId ? data.data : g
        ),
      }));
    } catch (err) {
      throw err;
    }
  },
}));

export default useGenerateStore;
