import React, { useEffect, useState } from 'react';
import { Comment } from 'src/models/Comment';
import { getAllComments } from 'src/services/CommentService';
import classes from './CommentListComponent.module.scss';
import CommentComponent from '../Comment/CommentComponent';
import { commentsState } from '../../state/atom';
import { useRecoilState } from 'recoil';

interface CommentListComponentProps {
  postId: number;
}
const CommentListComponent: React.FC<CommentListComponentProps> = ({ postId }) => {
  const [allComments, setAllComments] = useRecoilState(commentsState);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  useEffect(() => {
    getAllComments(postId).then((response) => {
      setAllComments(allComments.set(postId, response));
      setFilteredComments(response);
    });
  }, [postId]);

  useEffect(() => {
    setFilteredComments(allComments.get(postId)!);
  }, [allComments, filteredComments, postId]);

  return (
    <div className={`${classes['c-comments__wrapper']}`}>
      {filteredComments &&
        filteredComments.map(
          (comment) =>
            !comment.parentCommentId && <CommentComponent key={comment.id} comment={comment} />
        )}
    </div>
  );
};

export default CommentListComponent;
