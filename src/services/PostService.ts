import { axios } from 'src/config/axios/axios';

export const getAllPosts = async () => {
  return (await axios.get('/api/v1/posts')).data;
};
