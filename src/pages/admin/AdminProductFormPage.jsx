import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, createProduct, updateProduct } from '../../api/productApi';
import { getCategories } from '../../api/categoryApi';

const AdminProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    price: '',
    stock: '',
    imageUrl: '',
    categoryId: '',
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);

        if (isEditMode) {
          const product = await getProduct(id);
          setFormData({
            name: product.name,
            shortDescription: product.shortDescription,
            price: product.price,
            stock: product.stock,
            imageUrl: product.imageUrl,
            categoryId: product.categoryId,
          });
        }
      } catch (err) {
        console.error(err);
        setError('Error al cargar datos');
      }
    };
    fetchData();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isEditMode) {
        await updateProduct(id, formData);
      } else {
        await createProduct(formData);
      }
      navigate('/admin/products');
    } catch (err) {
      console.error(err);
      setError('Error al guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-brand-orange pl-4">
        {isEditMode ? 'Editar Producto' : 'Nuevo Producto'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8 bg-brand-dark p-8 rounded-2xl shadow-2xl border border-gray-800">
        {error && <div className="text-red-500 bg-red-900/20 p-4 rounded-md">{error}</div>}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">Nombre del Producto</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Descripción Corta</label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-3"
            />
          </div>

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-300">Precio</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="block w-full pl-7 rounded-md border-gray-700 bg-gray-800 text-white focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-3"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-3"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Categoría</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-3"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">URL de Imagen</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-3"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {formData.imageUrl && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">Vista previa:</p>
                <img src={formData.imageUrl} alt="Preview" className="h-40 w-40 object-cover rounded-lg border border-gray-700" />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-800">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="bg-gray-700 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-brand-orange text-white px-8 py-3 rounded-md font-bold hover:bg-brand-orange-hover disabled:opacity-50 transition-colors shadow-lg shadow-brand-orange/20"
          >
            {loading ? 'Guardando...' : 'Guardar Producto'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductFormPage;
