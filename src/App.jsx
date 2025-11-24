import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { CategoryProvider } from './context/CategoryContext';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;
