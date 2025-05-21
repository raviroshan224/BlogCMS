import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createAuthor, updateAuthor } from '../../services/authorService';
import { toast } from 'react-toastify';

export const authorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  bio: z.string().min(1, 'Bio is required'),
  avatar: z.string().url('Avatar must be a valid URL').optional(),
});

type AuthorFormData = z.infer<typeof authorSchema>;

type AuthorFormProps = {
  defaultValues?: {
    id?: string;
    name: string;
    bio: string;
    avatar?: string;
  };
  onSuccess?: () => void;
};

const AuthorForm: React.FC<AuthorFormProps> = ({ defaultValues, onSuccess }) => {
  const form = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
    defaultValues: defaultValues || { name: '', bio: '', avatar: '' },
  });

  const onSubmit = async (data: AuthorFormData) => {
    try {
      if (defaultValues?.id) {
        await updateAuthor(defaultValues.id, data);
        toast.success('Author updated');
      } else {
        await createAuthor(data);
        toast.success('Author created');
      }
      onSuccess?.();
      form.reset();
    } catch {
      toast.error('Failed to save author');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-8">
          {defaultValues?.id ? 'Update Author' : 'Create New Author'}
        </h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
            <input
              {...form.register('name')}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Bio</label>
            <textarea
              {...form.register('bio')}
              rows={4}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {form.formState.errors.bio && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.bio.message}</p>
            )}
          </div>

          {/* Avatar */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Avatar URL</label>
            <input
              {...form.register('avatar')}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {form.formState.errors.avatar && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.avatar.message}</p>
            )}
            {form.watch('avatar') && (
              <img
                src={form.watch('avatar')}
                alt="Avatar preview"
                className="mt-4 w-24 h-24 object-cover rounded-full border shadow"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
            >
              Save Author
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthorForm;
