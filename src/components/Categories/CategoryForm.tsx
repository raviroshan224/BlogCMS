import { useState, useEffect } from 'react';
import { createCategory, updateCategory } from '../../services/categoryService';

type CategoryFormProps = {
  defaultValues?: {
    id?: string;
    name: string;
  };
  onSuccess?: () => Promise<void> | void;
};

const CategoryForm: React.FC<CategoryFormProps> = ({ defaultValues, onSuccess }) => {
  const [name, setName] = useState(defaultValues?.name || '');

  useEffect(() => {
    if (defaultValues?.name) {
      setName(defaultValues.name);
    }
  }, [defaultValues]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (defaultValues?.id) {
        await updateCategory(defaultValues.id, { name });
        alert('Category updated');
      } else {
        await createCategory({ name });
        alert('Category created');
      }
      if (onSuccess) await onSuccess();
      setName('');
    } catch {
      alert('Failed to save category');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">
          {defaultValues?.id ? 'Update Category' : 'Create New Category'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
            >
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
