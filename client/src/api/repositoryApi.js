import axiosClient from './axiosClient';

export const uploadZipAPI = async (projectId, file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('projectId', projectId);

  const response = await axiosClient.post('/repositories/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: onProgress
      ? (e) => onProgress(Math.round((e.loaded * 100) / e.total))
      : undefined,
  });
  return response.data;
};

export const importGithubAPI = async (projectId, repositoryUrl) => {
  const response = await axiosClient.post('/repositories/github', {
    projectId,
    repositoryUrl,
  });
  return response.data;
};
