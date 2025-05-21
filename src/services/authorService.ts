
import axios from 'axios';

const BASE_URL = 'https://682d8f824fae188947568806.mockapi.io';
const ENDPOINT = `${BASE_URL}/authors`;

export const getAuthors = async () => {
  const res = await axios.get(ENDPOINT);
  return res.data;
};

export const getAuthor = async (id: string) => {
  const res = await axios.get(`${ENDPOINT}/${id}`);
  return res.data;
};

export const createAuthor = async (data: any) => {
  const res = await axios.post(ENDPOINT, data);
  return res.data;
};

export const updateAuthor = async (id: string, data: any) => {
  const res = await axios.put(`${ENDPOINT}/${id}`, data);
  return res.data;
};

export const deleteAuthor = async (id: string) => {
  const res = await axios.delete(`${ENDPOINT}/${id}`);
  return res.data;
};
