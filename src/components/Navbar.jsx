import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow px-8 py-4 flex justify-between items-center mb-6">
      <Link to="/" className="text-xl font-bold text-indigo-600">MyStore</Link>
      <div className="flex items-center gap-6">
        <Link to="/cart" className="relative text-sm font-medium text-gray-700 hover:text-indigo-600">
          🛒 Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
