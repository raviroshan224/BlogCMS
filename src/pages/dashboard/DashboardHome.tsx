import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthors } from '../../services/authorService';
import { getCategories } from '../../services/categoryService';
import { getPosts } from '../../services/postService';
import { toast } from 'react-toastify';

const DashboardHome = () => {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);

  const fetchAll = async () => {
    try {
      const [a, c, p] = await Promise.all([getAuthors(), getCategories(), getPosts()]);
      console.log('Posts from API:', p);
      setAuthors(a);
      setCategories(c);
      setPosts(p);
    } catch {
      toast.error('Failed to load data');
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="p-6 space-y-8 w-full">
      <h1 className="text-3xl font-bold text-gray-800">CMS Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Authors Section */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <button
              className="text-blue-600 underline text-sm"
              onClick={() => navigate('/authors')}
            >
              Author
            </button>
          </div>
          
        </section>

        {/* Categories Section */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <button
              className="text-blue-600 underline text-sm"
              onClick={() => navigate('/categories')}
            >
              Category
            </button>
          </div>
         
        </section>

        {/* Posts Section */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <button
              className="text-blue-600 underline text-sm"
              onClick={() => navigate('/posts')}
            >
              Posts
            </button>
          </div>
          
        </section>
      </div>
    </div>
  );
};

export default DashboardHome;
