import axiosClient from './axiosClient';

export const generateTestAPI = async (payload) => {
  const response = await axiosClient.post('/generate', payload);
  return response.data;
};

export const regenerateTestAPI = async (generationId, additionalInstructions) => {
  const response = await axiosClient.post('/generate/regenerate', {
    generationId,
    additionalInstructions,
  });
  return response.data;
};

export const updateFeedbackAPI = async (generationId, feedbackData) => {
  const response = await axiosClient.patch(`/generate/${generationId}/feedback`, feedbackData);
  return response.data;
};

export const updateContentAPI = async (generationId, content) => {
  const response = await axiosClient.patch(`/generate/${generationId}/content`, { content });
  return response.data;
};

export const getProjectGenerationsAPI = async (projectId) => {
  const response = await axiosClient.get(`/generate/project/${projectId}`);
  return response.data;
};
