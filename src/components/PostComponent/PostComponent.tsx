import React from 'react';
import { Post } from 'src/models/Post';
import Card from '../core/Card/Card';
import classes from './PostComponent.module.scss';
import Button from '../core/Button/Button';
import { ChatBubbleLeftIcon, PaperAirplaneIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import Input from '../core/Input/Input';

interface PostComponentProps {
  post: Post;
}

const PostComponent: React.FC<PostComponentProps> = ({ post }) => {
  return (
    <Card variant='large'>
      <div className={`${classes['c-post__info']}`}>
        <div className={`${classes['c-post__user-info']}`}>
          <UserCircleIcon className={`${classes['c-post__profile-icon']}`} />
          <span>
            <h3>
              {post.author.name} {post.author.surname}
            </h3>
            <p className={`${classes['c-post__username']}`}>{post.author.username}</p>
          </span>
        </div>
        <p className={`${classes['c-post__text']}`}>{post.text}</p>
      </div>
      <div className={`${classes['c-post__image']}`}>
        {post.mediaPaths.map((path) => (
          <img key={path} src={import.meta.env.VITE_MINIO_PATH + path} alt='' />
        ))}
      </div>
      <div className={`${classes['c-post__actions-container']}`}>
        <hr className={`${classes['c-post__line']}`}></hr>

        <div className={`${classes['c-post__comment-button']}`}>
          <Button
            icon={ChatBubbleLeftIcon}
            color='secondary'
            variant='small'
            label='Comments'
          ></Button>
        </div>

        <div className={`${classes['c-post__leave-comment-container']}`}>
          <Input variant='large' placeholder='Type comment'></Input>
          <Button variant='rounded' icon={PaperAirplaneIcon}></Button>
        </div>
      </div>
    </Card>
  );
};

export default PostComponent;
