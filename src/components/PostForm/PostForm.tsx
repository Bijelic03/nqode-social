import React, { useCallback, useState } from 'react';
import classes from './PostForm.module.scss';
import { PhotoIcon } from '@heroicons/react/24/solid';
import Button from 'components/core/Button/Button';
import { createPost } from 'src/services/PostService';
import { Post, PostCreate } from 'src/models/Post';
import Card from '../core/Card/Card';

const PostForm = () => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const [file, setFile] = useState<File | null>(null);
  const [post, setPost] = useState<PostCreate>();
  const [text, setText] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFile = e.target.files[0];
      setFile(newFile);
      setPost({
        text: text,
        file: file,
        authorId: user.id
      });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (post) {
      createPost(post);
    }
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    setPost({
      text: text,
      file: file,
      authorId: user.id
    });
  };
  return (
    <Card align='left' title='Create Post' variant='large'>
      <form onSubmit={handleSubmit} className={`${classes['c-post-form']}`}>
        <textarea
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
