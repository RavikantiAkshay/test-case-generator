import axiosClient from './axiosClient';

export const signupAPI = async ({ name, email, password, confirmPassword }) => {
  const response = await axiosClient.post('/auth/signup', {
    name,
    email,
    password,
    confirmPassword,
  });
  return response.data;
};

export const loginAPI = async ({ email, password }) => {
  const response = await axiosClient.post('/auth/login', {
    email,
    password,
  });
  return response.data;
};

export const getMeAPI = async () => {
  const response = await axiosClient.get('/auth/me');
  return response.data;
};
