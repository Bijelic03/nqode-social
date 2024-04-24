import { PaperAirplaneIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { Comment } from 'src/models/Comment';
import classes from './CommentComponent.module.scss';
import Reply from '../core/Reply/Reply';
import { useRecoilState } from 'recoil';
import { commentsState } from '../../state/atom';
import { deleteComment } from 'src/services/CommentService';
import { Link } from 'react-router-dom';

interface CommentComponentProps {
  comment: Comment;
}

const CommentComponent: React.FC<CommentComponentProps> = ({ comment }) => {
  const [showChildComments, setShowChildComments] = useState<boolean>(false);
  const [allComments, setAllComments] = useRecoilState(commentsState);

  const userString = localStorage.getItem('user');
  const loggedUser = userString ? JSON.parse(userString) : null;

  const [showReply, setShowReply] = useState<boolean>(false);
  const [replies, setReplies] = useState<Comment[]>();
  useEffect(() => {
    setReplies(
      allComments
        .get(comment.postId)
        ?.filter((childComment) => childComment?.parentCommentId === comment.id)
    );
  }, [allComments, setShowChildComments]);

  const handleDelete = () => {
    deleteComment(comment).then(() => {
      setAllComments((prevMap) => {
        const newMap = new Map([...prevMap]);
        const currentComments = newMap.get(comment.postId) || [];
        newMap.set(comment.postId, [...currentComments.filter((c) => c.id !== comment.id)]);
        return newMap;
      });
    });
  };

  const handleShowChildComments = () => {
    console.log(replies);
    setShowChildComments(!showChildComments);
  };

  const toggleReply = () => {
    setShowReply(!showReply);
  };

  return (
    <div className={`${classes['c-comment__container']}`}>
      <div className={`${classes['c-comment__user-info']}`}>
        <UserCircleIcon className={`${classes['c-comment__profile-icon']}`} />
        <Link
          to={`/profile/${comment.authorUsername}`}
          className={`${classes['c-comment__username']}`}
        >
          {comment.authorUsername}
        </Link>
      </div>
      <span className={`${classes['c-comment__text']}`}>{comment.text}</span>
      <div className={`${classes['c-comment__reply-actions']}`}>
        <span onClick={handleShowChildComments}>replies</span>
        <span onClick={toggleReply}>reply</span>
        {(comment.authorUsername == loggedUser.username ||
          comment.postAuthorId == loggedUser.id) && <span onClick={handleDelete}>delete</span>}
        <hr className={`${classes['c-comment__line']}`}></hr>
      </div>
      <div className={`${classes['c-comment__replies-container']}`}>
        {showReply && (
          <Reply
            showReplies={setShowChildComments}
            postId={comment.postId}
            parentComment={comment}
            color='gray'
          />
        )}
        {showChildComments &&
          replies?.map((reply) => <CommentComponent key={reply.id} comment={reply} />)}
      </div>
    </div>
  );
};

export default CommentComponent;
