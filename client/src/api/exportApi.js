import axiosClient from './axiosClient';

const downloadFile = (content, filename, type) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportMarkdownAPI = async (projectId) => {
  const response = await axiosClient.get(`/export/${projectId}/markdown`, { responseType: 'text' });
  const filename = response.headers['content-disposition']?.match(/filename="(.+)"/)?.[1] || 'tests.md';
  downloadFile(response.data, filename, 'text/markdown');
};

export const exportJSONAPI = async (projectId) => {
  const response = await axiosClient.get(`/export/${projectId}/json`, { responseType: 'text' });
  const filename = response.headers['content-disposition']?.match(/filename="(.+)"/)?.[1] || 'tests.json';
  downloadFile(response.data, filename, 'application/json');
};

export const exportTextAPI = async (projectId) => {
  const response = await axiosClient.get(`/export/${projectId}/text`, { responseType: 'text' });
  const filename = response.headers['content-disposition']?.match(/filename="(.+)"/)?.[1] || 'tests.txt';
  downloadFile(response.data, filename, 'text/plain');
};
