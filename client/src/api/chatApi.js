import axiosClient from './axiosClient';

export const sendMessageAPI = async (projectId, message) => {
  const response = await axiosClient.post('/chat', { projectId, message });
  return response.data;
};

export const getChatHistoryAPI = async (projectId) => {
  const response = await axiosClient.get(`/chat/${projectId}`);
  return response.data;
};
