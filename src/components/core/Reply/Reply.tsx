import React, { useState } from 'react';
import classes from './Reply.module.scss';
import Input from '../Input/Input';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { Comment } from 'src/models/Comment';
import { createComment } from 'src/services/CommentService';
import { useRecoilState } from 'recoil';
import { commentsState } from '../../../state/atom';

interface ReplyProps {
  showReplies: React.Dispatch<React.SetStateAction<boolean>>;
  parentComment?: Comment;
  postId: number;
  color?: 'white' | 'gray';
}

const Reply: React.FC<ReplyProps> = ({ color = 'white', parentComment, postId, showReplies }) => {
  const [newComment, setNewComment] = useState<string>('');
  const [allComments, setAllComments] = useRecoilState(commentsState);

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleSubmit = () => {
    const comment: Comment = {
      text: newComment!,
      authorUsername: user.username,
      postId: postId,
      ...(parentComment && { parentCommentId: parentComment.id })
    };

    createComment(comment).then((response) => {
      setAllComments((prevMap) => {
        const newMap = new Map([...prevMap]);
        const currentComments = newMap.get(postId) || [];
        newMap.set(postId, [...currentComments, response]);
        return newMap;
      });
      showReplies(true);
      setNewComment('');
    });
  };

  const handleReplyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  return (
    <div className={`${classes['c-reply']} ${classes[`c-reply--${color}`]}`}>
      <div className={`${classes['c-reply__container']}`}>
        <Input
          value={newComment}
          color={color}
          onChange={handleReplyInput}
          variant='large'
          placeholder='Type comment'
        />
        {newComment && (
          <PaperAirplaneIcon
            className={`${classes['c-reply__icon']}`}
            onClick={handleSubmit}
          ></PaperAirplaneIcon>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Reply;
