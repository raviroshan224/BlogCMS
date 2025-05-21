// src/pages/authors/AuthorEditPage.tsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuthor } from "../../services/authorService";
import AuthorForm from "../../components/Authors/AuthorForm";

const AuthorEditPage = () => {
  const { id } = useParams();
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    if (id) {
      getAuthor(id).then(setAuthorData);
    }
  }, [id]);

  if (!authorData) return <div>Loading author data...</div>;

  return <AuthorForm defaultValues={authorData} />;
};

export default AuthorEditPage;
