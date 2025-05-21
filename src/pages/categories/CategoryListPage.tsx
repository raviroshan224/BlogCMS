import { useEffect, useState } from 'react';
import { getCategories, deleteCategory } from '../../services/categoryService';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CategoryListPage = () => {
  const [categories, setCategories] = useState<any[]>([]);

  const loadCategories = () => {
    try {
      const data = getCategories();
      setCategories(data);
    } catch {
      toast.error('Failed to load categories');
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        deleteCategory(id);
        toast.success('Category deleted');
        loadCategories();
      } catch {
        toast.error('Failed to delete category');
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-3xl font-bold text-gray-800">Categories</h2>
          <Link
            to="/categories/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
          >
            + Create Category
          </Link>
        </div>

        {categories.length === 0 ? (
          <p className="text-gray-500 text-center py-10 text-lg">No categories found.</p>
        ) : (
          <ul className="space-y-4">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className="bg-white border rounded-lg shadow-md px-5 py-4 flex justify-between items-center"
              >
                <span className="text-gray-800 font-medium text-lg">{cat.name}</span>
                <div className="flex gap-3">
                  <Link
                    to={`/categories/edit/${cat.id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoryListPage;
