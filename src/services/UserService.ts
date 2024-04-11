import { axios } from 'src/config/axios/axios';

export const getUser = async (userId: number) => {
  return (await axios.get(`/api/v1/auth/${userId}`)).data;
};
