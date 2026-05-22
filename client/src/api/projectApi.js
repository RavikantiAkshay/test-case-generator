import axiosClient from './axiosClient';

export const createProjectAPI = async ({ projectName, description }) => {
  const response = await axiosClient.post('/projects', { projectName, description });
  return response.data;
};

export const listProjectsAPI = async () => {
  const response = await axiosClient.get('/projects');
  return response.data;
};

export const getProjectAPI = async (projectId) => {
  const response = await axiosClient.get(`/projects/${projectId}`);
  return response.data;
};

export const updateProjectAPI = async (projectId, updates) => {
  const response = await axiosClient.patch(`/projects/${projectId}`, updates);
  return response.data;
};

export const deleteProjectAPI = async (projectId) => {
  const response = await axiosClient.delete(`/projects/${projectId}`);
  return response.data;
};
