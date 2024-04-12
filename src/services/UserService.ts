import { axios } from 'src/config/axios/axios';
import { User } from 'src/models/User';

export const getUser = async (userId: number) => {
  return (await axios.get(`/api/v1/auth/${userId}`)).data;
};

export const login = async (user: User) => {
  return (await axios.post(`/api/v1/auth/authenticate`, user)).data;
};

export const register = async (user: User) => {
  return (await axios.post(`/api/v1/auth/register`, user)).data;
};
