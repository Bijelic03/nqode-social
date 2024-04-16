import axios from '../config/axios/axios';

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  return await axios.post('/refresh-token', refreshToken);
};
