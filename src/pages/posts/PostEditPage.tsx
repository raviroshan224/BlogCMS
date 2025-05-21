import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../../components/Posts/PostForm';
import { fetchPostById, updatePost } from '../../services/postService';
import { toast } from 'react-toastify';

const PostEditPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchPostById(id)
        .then(res => setPost(res.data))
        .catch(() => toast.error('Failed to load post'));
    }
  }, [id]);

  const handleSubmit = async (data: any) => {
    try {
      await updatePost(id!, data);
      toast.success('Post updated successfully!');
      navigate('/posts');
    } catch {
      toast.error('Failed to update post');
    }
  };

  if (!post) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Post</h2>
      <PostForm defaultValues={post} onSubmit={handleSubmit} />
    </div>
  );
};

export default PostEditPage;