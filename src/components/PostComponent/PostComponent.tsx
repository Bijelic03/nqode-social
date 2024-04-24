import React, { useState } from 'react';
import { Post } from 'src/models/Post';
import Card from '../core/Card/Card';
import classes from './PostComponent.module.scss';
import Button from '../core/Button/Button';
import { ChatBubbleLeftIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import Reply from '../core/Reply/Reply';
import CommentListComponent from '../CommentList/CommentListComponent';

interface PostComponentProps {
  post: Post;
}

const PostComponent: React.FC<PostComponentProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);

  const handleShowComments = () => {
    setShowComments(!showComments);
  };
  return (
    <Card variant='large'>
      <div className={`${classes['c-post__info']}`}>
        <Link to={`/profile/${post.author.username}`} className={`${classes['c-post__user-info']}`}>
          <UserCircleIcon className={`${classes['c-post__profile-icon']}`} />
          <span>
            <h3>
              {post.author.name} {post.author.surname}
            </h3>
            <p className={`${classes['c-post__username']}`}>{post.author.username}</p>
          </span>
        </Link>
        <span className={`${classes['c-post__text']}`}>{post.text}</span>
      </div>
      <div className={`${classes['c-post__image']}`}>
        {post.mediaPaths?.map((path) => (
          <img key={path} src={import.meta.env.VITE_MINIO_PATH + path} alt='' />
        ))}
      </div>
      <div className={`${classes['c-post__actions-container']}`}>
        <hr className={`${classes['c-post__line']}`}></hr>

        <div className={`${classes['c-post__comment-button']}`}>
          <Button
            onClick={handleShowComments}
            icon={ChatBubbleLeftIcon}
            color='secondary'
            variant='small'
            label='Comments'
          ></Button>
        </div>
      </div>
      {showComments ? (
        <>
          <Reply postId={post.id} showReplies={setShowComments} />
          <CommentListComponent postId={post.id} />{' '}
        </>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default PostComponent;
