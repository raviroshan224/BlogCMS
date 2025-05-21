import { useEffect, useState } from 'react';
import { getAuthors, deleteAuthor } from '../../services/authorService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AuthorListPage = () => {
  const [authors, setAuthors] = useState<
    { id: string; name: string; bio: string; avatar: string }[]
  >([]);

  const fetchAuthors = async () => {
    try {
      const res = await getAuthors();
      setAuthors(res);
    } catch (err) {
      toast.error('Failed to load authors');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      try {
        await deleteAuthor(id);
        toast.success('Author deleted');
        fetchAuthors();
      } catch (err) {
        toast.error('Failed to delete author');
      }
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 md:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Authors</h2>
          <Link
            to="/authors/create"
            className="bg-black hover:bg-black-700 text-white px-5 py-2 rounded-md shadow"
          >
            + Create Author
          </Link>
        </div>

        {authors.length === 0 ? (
          <p className="text-gray-500 text-center py-10 text-lg">No authors found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author) => (
              <div
                key={author.id}
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-5"
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={author.avatar || '/assets/default-avatar.png'}
                    alt={author.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 mb-3"
                  />
                  <h3 className="text-lg font-semibold mb-1">{author.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{author.bio}</p>
                  <div className="flex gap-4">
                    <Link
                      to={`/authors/edit/${author.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(author.id)}
                      className="text-red-500 hover:text-red-700 font-medium text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorListPage;
