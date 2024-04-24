import { axios } from 'src/config/axios/axios';
import { Comment } from 'src/models/Comment';

export const getAllComments = async (postId: number) => {
  return (await axios.get(`/api/v1/posts/${postId}/comments`)).data;
};

export const getAllReplies = async (comment: Comment) => {
  return (await axios.get(`/api/v1/posts/${comment.postId}/comments/${comment.id}/replies`)).data;
};

export const createComment = async (comment: Comment) => {
  return (await axios.post(`/api/v1/posts/${comment.postId}/comments`, comment)).data;
};

export const deleteComment = async (comment: Comment) => {
  return await axios.delete(`/api/v1/posts/${comment.postId}/comments/${comment.id}`);
};
