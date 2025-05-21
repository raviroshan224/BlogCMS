const STORAGE_KEY = 'categories';

const getCategoriesFromStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getCategories = () => getCategoriesFromStorage();

export const createCategory = (category: { name: string }) => {
  const categories = getCategoriesFromStorage();
  const newCategory = { ...category, id: Date.now().toString() };
  categories.push(newCategory);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
};

export const updateCategory = (id: string, updated: { name: string }) => {
  const categories = getCategoriesFromStorage().map((cat: any) =>
    cat.id === id ? { ...cat, ...updated } : cat
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
};

export const deleteCategory = (id: string) => {
  const categories = getCategoriesFromStorage().filter((cat: any) => cat.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
};

export const getCategory = (id: string) => {
  return getCategoriesFromStorage().find((cat: any) => cat.id === id);
};
