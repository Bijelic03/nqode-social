import React from 'react';
import { Post } from 'src/models/Post';
import PostComponent from '../PostComponent/PostComponent';
import classes from './PostListComponent.module.scss';

interface PostListComponentProps {
  postList: Post[];
}
const PostListComponent: React.FC<PostListComponentProps> = ({ postList }) => {
  return (
    <div>
      {postList.map((post) => (
        <div key={post.id} className={`${classes['c-post-list__wrapper']}`}>
          <PostComponent post={post} />
        </div>
      ))}
    </div>
  );
};

export default PostListComponent;
