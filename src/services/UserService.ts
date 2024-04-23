import { axios } from 'src/config/axios/axios';
import { User } from 'src/models/User';

export const getUser = async (username: string) => {
  return (await axios.get(`/api/v1/users/${username}`)).data;
};

export const login = async (user: User) => {
  return (await axios.post(`/api/v1/auth/authenticate`, user)).data;
};

export const register = async (user: User) => {
  return (await axios.post(`/api/v1/auth/register`, user)).data;
};

export const logout = () => {
  localStorage.clear();
};

export const update = async (user: User) => {
  return (await axios.put(`/api/v1/users/${user.id}`, user)).data;
};
