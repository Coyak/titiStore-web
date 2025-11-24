import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getCategories } from '../api/categoryApi';

const CategoryContext = createContext();

export const useCategories = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState('');

  const loadCategories = useCallback(async () => {
    try {
      setLoadingCategories(true);
      const data = await getCategories();
      setCategories(data);
      setError('');
    } catch (err) {
      console.error('Error al cargar categorías', err);
      setError('No pudimos cargar las categorías');
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loadingCategories,
        categoriesError: error,
        reloadCategories: loadCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
