import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const postSchema = z.object({
  title: z.string().min(3, "Title is required"),
  body: z.string().min(10, "Body is required"),
  author: z.string().min(1, "Select an author"),
  category: z.string().min(1, "Select a category"),
  tags: z.string().optional(),
  status: z.enum(["draft", "published"]),
  coverImage: z.string().url("Enter a valid URL").optional(),
});

type PostFormData = z.infer<typeof postSchema>;

type PostFormProps = {
  defaultValues?: PostFormData;
  onSubmit: (data: PostFormData) => void;
};

const PostForm: React.FC<PostFormProps> = ({ defaultValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues,
  });

  const coverImageUrl = watch("coverImage");

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4 md:px-12">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create a New Post</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              {...register("title")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
          </div>

          {/* Body */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Body (Markdown)</label>
            <textarea
              {...register("body")}
              rows={6}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.body && <p className="text-sm text-red-500 mt-1">{errors.body.message}</p>}
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <select
              {...register("author")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select author</option>
              <option value="Author 1">Author 1</option>
              <option value="Author 2">Author 2</option>
            </select>
            {errors.author && <p className="text-sm text-red-500 mt-1">{errors.author.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              {...register("category")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Design">Design</option>
            </select>
            {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>}
          </div>

          {/* Tags */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
            <input
              {...register("tags")}
              placeholder="e.g. react,typescript"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              {...register("status")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
            <input
              {...register("coverImage")}
              placeholder="https://example.com/image.jpg"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {coverImageUrl && (
              <img
                src={coverImageUrl}
                alt="Cover Preview"
                className="mt-3 max-h-48 w-full object-contain rounded border"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-full text-center mt-4">
            <button
              type="submit"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-md"
            >
              Save Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
