import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import Navbar from './components/Navbar';
import CheckoutPage from './pages/CheckoutPage';
import OfferPopup from './components/OfferPopup';



function App() {
  return (
    <BrowserRouter>
      <Navbar />
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/cart" element={<CartPage />} />
  <Route path="/checkout" element={<CheckoutPage />} />
</Routes>
<OfferPopup />
    </BrowserRouter>
  );
}

export default App;
