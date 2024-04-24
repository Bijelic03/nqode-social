import { axios } from 'src/config/axios/axios';
import { CreateUser, User } from 'src/models/User';

export const getUser = async (username: string) => {
  return (await axios.get(`/api/v1/users/${username}`)).data;
};

export const searchUsers = async (username: string) => {
  return (await axios.get('/api/v1/users/search', { params: { searchParam: username } })).data;
};

export const getFriendship = async (userId: number, friendId: number) => {
  return (await axios.get(`/api/v1/users/${userId}/friends/${friendId}`)).data;
};

export const getFriends = async (userId: number) => {
  return (await axios.get(`/api/v1/users/${userId}/friends`)).data;
};

export const getFriendRequests = async (userId: number) => {
  return (await axios.get(`/api/v1/users/${userId}/friend-requests`)).data;
};

export const acceptFriendRequest = async (userId: number, friendId: number) => {
  return await axios.patch(`/api/v1/users/${userId}/friends/${friendId}`);
};

export const sendFriendRequest = async (userId: number, friendId: number) => {
  return await axios.post(`/api/v1/users/${userId}/friends/${friendId}/requests`);
};

export const unfriend = async (userId: number, friendId: number) => {
  return await axios.delete(`/api/v1/users/${userId}/friends/${friendId}`);
};

export const rejectFriendRequest = async (userId: number, friendId: number) => {
  return await axios.delete(`/api/v1/users/${friendId}/friends/${userId}/requests`);
};

export const login = async (user: CreateUser) => {
  return (await axios.post(`/api/v1/auth/authenticate`, user)).data;
};

export const register = async (user: CreateUser) => {
  return (await axios.post(`/api/v1/auth/register`, user)).data;
};

export const logout = () => {
  localStorage.clear();
};

export const update = async (user: User) => {
  return (await axios.put(`/api/v1/users/${user.id}`, user)).data;
};
