import React, { useEffect, useState } from 'react';
import Layout from 'src/components/Layout/Layout/Layout';
import PostListComponent from 'src/components/PostListComponent/PostListComponent';
import { Post } from 'src/models/Post';
import { getAllPosts } from 'src/services/PostService';
import PostForm from 'src/components/PostForm/PostForm';

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    getAllPosts().then((response) => {
      setPosts(response);
    });
  }, []);

  return posts ? (
    <Layout>
      <PostForm />
      <PostListComponent postList={posts} />
    </Layout>
  ) : (
    <></>
  );
};
export default HomePage;
