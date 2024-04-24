import { atom } from 'recoil';
import { Comment } from 'src/models/Comment';
import { Post } from 'src/models/Post';

export const postsState = atom({
  key: 'postsState',
  default: [] as Post[]
});

export const commentsState = atom({
  key: 'commentsState',
  default: new Map<number, Comment[]>()
});
