import axios from 'axios';

const API_URL = 'https://682d8f824fae188947568806.mockapi.io/posts'; // Replace with your actual mock API URL

export const getPosts = async () => {
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  return posts;
};


export const fetchPosts = () => axios.get(API_URL);

export const fetchPostById = (id: string) => axios.get(`${API_URL}/${id}`);

export const createPost = (postData: any) => axios.post(API_URL, postData);

export const updatePost = (id: string, postData: any) => axios.put(`${API_URL}/${id}`, postData);

export const deletePost = (id: string) => axios.delete(`${API_URL}/${id}`);
