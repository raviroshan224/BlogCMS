import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../../components/Posts/PostForm';
import { createPost } from '../../services/postService';

const PostCreatePage = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    // Add createdAt timestamp
    createPost({ ...data, createdAt: new Date().toISOString() }).then(() => {
      navigate('/posts');
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
};

export default PostCreatePage;
