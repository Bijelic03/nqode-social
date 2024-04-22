import { User } from './User';

export interface Post {
  author: User;
  text: string;
  mediaPaths: string[];
}
