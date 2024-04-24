export interface Comment {
  id?: number;
  text: string;
  postId: number;
  postAuthorId?: number;
  parentCommentId?: number;
  authorUsername: string;
}
