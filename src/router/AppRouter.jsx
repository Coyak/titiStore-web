import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HomePage from '../pages/HomePage';
import ProductDetailPage from '../pages/ProductDetailPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import CheckoutSuccessPage from '../pages/CheckoutSuccessPage';
import ContactPage from '../pages/ContactPage';
import CategoryPage from '../pages/CategoryPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminProductsPage from '../pages/admin/AdminProductsPage';
import AdminProductFormPage from '../pages/admin/AdminProductFormPage';
import AdminOrdersPage from '../pages/admin/AdminOrdersPage';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/categorias/:slug" element={<CategoryPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
            {/* <Route path="/orders" element={<OrdersPage />} /> */}
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
             <Route path="/admin" element={<AdminDashboardPage />} />
             <Route path="/admin/products" element={<AdminProductsPage />} />
             <Route path="/admin/orders" element={<AdminOrdersPage />} />
             <Route path="/admin/products/new" element={<AdminProductFormPage />} />
             <Route path="/admin/products/:id/edit" element={<AdminProductFormPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AppRouter;
