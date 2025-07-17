import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({ name: '', address: '', email: '' });
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.email) {
      toast.error('Please fill in all fields');
      return;
    }

    // Simulate order process
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] px-[70px] pt-10 pb-20">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-xl">
        <div className="mb-4">
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded mt-1"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            className="w-full border p-2 rounded mt-1"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded mt-1"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <p className="mb-4 text-sm font-semibold">Total: ${total.toFixed(2)}</p>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
