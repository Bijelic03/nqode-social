import React, { useCallback, useState } from 'react';
import classes from './PostForm.module.scss';
import { PhotoIcon } from '@heroicons/react/24/solid';
import Button from 'components/core/Button/Button';
import { createPost } from 'src/services/PostService';
import { PostCreate } from 'src/models/Post';
import Card from '../core/Card/Card';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { postsState } from '../../state/atom';

const PostForm = () => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const [post, setPost] = useState<PostCreate>({ authorId: user.id, text: '', file: null });
  const [posts, setPosts] = useRecoilState(postsState);
  const notify = () =>
    toast.error(`Can't upload empty post!`, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light'
    });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFile = e.target.files[0];
      setPost((prevPost) => ({
        ...prevPost,
        file: newFile
      }));
    }
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setPost((prevPost) => ({
      ...prevPost,
      text: newText
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (post.file || post.text) {
      createPost(post).then((response) => {
        setPosts([response.data, ...posts]);
      });
    } else {
      notify();
    }
    setPost({ authorId: user.id, text: '', file: null });
  };

  return (
    <Card align='left' title='Create Post' variant='large'>
      <form onSubmit={handleSubmit} className={`${classes['c-post-form']}`}>
        <textarea
          value={post.text}
          className={`${classes['c-post-form__textarea']}`}
          onChange={handleChangeText}
          placeholder='Whats on your mind?'
        />
        <div className={`${classes['c-post-form__footer']}`}>
          <label htmlFor='file-upload' className={classes['c-post-form__media-upload']}>
            <PhotoIcon className={classes['c-post-form__icon']} />
            <p>Photo/Video</p>
            <input
              onChange={handleFileUpload}
              id='file-upload'
              type='file'
              style={{ display: 'none' }}
            />
          </label>
          <Button variant='small' label='Publish' />
        </div>
      </form>
    </Card>
  );
};

export default PostForm;
