import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../api/productApi';
import formatCurrency from '../../utils/formatCurrency';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.data || []);
    } catch (error) {
      console.error('No se pudieron obtener los productos', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error('No se pudo eliminar el producto', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64 text-brand-orange">Cargando...</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400">Inventario</p>
          <h1 className="text-3xl font-bold text-white border-l-4 border-brand-orange pl-4 mt-2">Gestión de productos</h1>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center rounded-xl bg-brand-orange px-5 py-3 font-semibold text-white shadow-lg hover:bg-brand-orange-hover transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Nuevo producto
        </Link>
      </div>

      <div className="rounded-3xl border border-gray-800 bg-brand-dark shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-brand-darker">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">Producto</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">Precio</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">Categoría</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-widest text-gray-400">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-800/30 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 overflow-hidden rounded-xl bg-gray-900">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">Sin imagen</div>
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-white">{product.name}</p>
                        <p className="text-xs text-gray-500">ID #{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-200">{formatCurrency(product.price)}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${product.stock > 0 ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{product.category?.name || 'Sin categoría'}</td>
                  <td className="px-6 py-4 text-right text-sm">
                    <Link to={`/admin/products/${product.id}/edit`} className="text-brand-orange hover:text-brand-orange-hover mr-4">
                      Editar
                    </Link>
                    <button onClick={() => handleDelete(product.id)} className="text-red-400 hover:text-red-300">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminProductsPage;
