import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import LoginPage from "../pages/auth/LoginPage";
import Layout from "../components/Layout/Layout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import AuthorListPage from "../pages/authors/AuthorListPage";
import CategoryListPage from "../pages/categories/CategoryListPage";
import PostListPage from "../pages/posts/PostListPage";
import PostCreatePage from "../pages/posts/PostCreatePage";
import PostEditPage from "../pages/posts/PostEditPage";
import AuthorForm from "../components/Authors/AuthorForm";
import AuthorEditPage from "../pages/authors/AuthorEditPage";
import CategoryForm from '../components/Categories/CategoryForm';


const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Private Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout>
              <DashboardHome />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <DashboardHome />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/posts"
        element={
          <PrivateRoute>
            <Layout>
              <PostListPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/posts/create"
        element={
          <PrivateRoute>
            <Layout>
              <PostCreatePage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/posts/edit/:id"
        element={
          <PrivateRoute>
            <Layout>
              <PostEditPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <PrivateRoute>
            <Layout>
              <CategoryListPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/authors"
        element={
          <PrivateRoute>
            <Layout>
              <AuthorListPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
  path="/authors/create"
  element={
    <PrivateRoute>
      <Layout>
        <AuthorForm />
      </Layout>
    </PrivateRoute>
  }
/>
<Route
  path="/authors/edit/:id"
  element={
    <PrivateRoute>
      <Layout>
        <AuthorEditPage />
      </Layout>
    </PrivateRoute>
  }
/>


<Route
  path="/categories/create"
  element={
    <PrivateRoute>
      <Layout>
        <CategoryForm />
      </Layout>
    </PrivateRoute>
  }
/>

<Route
  path="/categories/edit/:id"
  element={
    <PrivateRoute>
      <Layout>
        <CategoryForm />
      </Layout>
    </PrivateRoute>
  }
/>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
