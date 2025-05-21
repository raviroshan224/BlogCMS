import React, { useEffect, useState } from 'react';
import { fetchPosts, deletePost } from '../../services/postService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostListPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const navigate = useNavigate();

  const load = () => {
    fetchPosts()
      .then(res => setPosts(res.data))
      .catch(() => toast.error('Failed to fetch posts'));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this post?')) {
      try {
        await deletePost(id);
        toast.success('Post deleted');
        load();
      } catch {
        toast.error('Failed to delete');
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-3xl font-bold text-gray-800">Blog Posts</h2>
          <button
            onClick={() => navigate('/posts/create')}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
          >
            + Create New Post
          </button>
        </div>

        {posts.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-10">
            No posts found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <div key={post.id} className="bg-white border rounded-xl shadow hover:shadow-lg transition-all p-5">
                <h3 className="font-semibold text-xl mb-1 text-gray-800 truncate">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-1">Author: {post.author}</p>
                <p className="text-gray-500 text-sm mb-4">Status: {post.status}</p>
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded"
                    onClick={() => navigate(`/posts/edit/${post.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1 rounded"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostListPage;
