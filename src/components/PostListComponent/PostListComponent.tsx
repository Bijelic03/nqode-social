import React from 'react';
import PostComponent from '../PostComponent/PostComponent';
import classes from './PostListComponent.module.scss';
import { postsState } from '../../state/atom';
import { useRecoilValue } from 'recoil';

const PostListComponent = () => {
  const postsList = useRecoilValue(postsState);

  return (
    <div>
      {postsList.map((post) => (
        <div key={post.id} className={`${classes['c-post-list__wrapper']}`}>
          <PostComponent post={post} />
        </div>
      ))}
    </div>
  );
};

export default PostListComponent;
