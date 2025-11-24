import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, createProduct, updateProduct } from '../../api/productApi';
import { getCategories } from '../../api/categoryApi';

const AdminProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

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
            name: product.name || '',
            shortDescription: product.shortDescription || '',
            price: product.price ?? '',
            stock: product.stock ?? '',
            imageUrl: product.imageUrl || '',
            categoryId: product.categoryId || '',
          });
        }
      } catch (err) {
        console.error(err);
        setError('No pudimos cargar los datos del producto.');
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
      setError('Hubo un problema al guardar el producto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-gray-400">Inventario</p>
        <h1 className="text-3xl font-bold text-white border-l-4 border-brand-orange pl-4 mt-2">
          {isEditMode ? 'Editar producto' : 'Nuevo producto'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 rounded-3xl border border-gray-800 bg-brand-dark p-8 shadow-2xl">
        {error && <div className="rounded-xl border border-red-500/40 bg-red-900/20 px-4 py-3 text-sm text-red-200">{error}</div>}

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Nombre del producto</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Categoría</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Descripción corta</label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Precio CLP</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">URL de imagen</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
            placeholder="https://..."
          />
          {formData.imageUrl && (
            <div className="mt-4">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Vista previa</p>
              <img src={formData.imageUrl} alt="Vista previa" className="h-48 w-full rounded-2xl object-cover border border-gray-800" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end border-t border-gray-800 pt-6">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="rounded-xl border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-200 hover:border-gray-500 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-brand-orange px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-orange-hover transition disabled:opacity-60"
          >
            {loading ? 'Guardando...' : 'Guardar producto'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminProductFormPage;
