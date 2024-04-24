import React, { useEffect } from 'react';
import Layout from 'src/components/Layout/Layout/Layout';
import PostListComponent from 'src/components/PostListComponent/PostListComponent';
import { getAllPosts } from 'src/services/PostService';
import PostForm from 'src/components/PostForm/PostForm';
import { useRecoilState } from 'recoil';
import { postsState } from '../../state/atom';

const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsState);

  useEffect(() => {
    getAllPosts().then((response) => {
      setPosts(response);
    });
  }, [setPosts]);

  return posts ? (
    <Layout>
      <PostForm />
      <PostListComponent />
    </Layout>
  ) : (
    <></>
  );
};
export default HomePage;
