import { User } from './User';

export interface Post {
  id: number;
  author: User;
  text: string;
  authorId: number;
  mediaPaths: string[];
}

export interface PostCreate {
  text: string;
  file?: File | null;
  authorId: number;
}
