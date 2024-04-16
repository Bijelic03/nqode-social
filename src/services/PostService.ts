import { axios } from 'src/config/axios/axios';
import { PostCreate } from 'src/models/Post';

export const getAllPosts = async () => {
  return (await axios.get('/api/v1/posts')).data;
};

export const createPost = (post: PostCreate) => {
  const multipartFile = new FormData();
  multipartFile.append('text', post.text);
  if (post.file) {
    multipartFile.append('file', post.file);
  }
  multipartFile.append('authorId', post.authorId.toString());
  return axios.post('/api/v1/posts', multipartFile, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
