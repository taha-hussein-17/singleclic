import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [addingToCart, setAddingToCart] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch product');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.image);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-10">Loading product...</div>;
  if (error) return <div className="p-10 text-red-600">Error: {error}</div>;
  if (!product) return null;

  return (
    <div className="min-h-screen bg-white px-10 py-12">
      <div className="flex gap-8">
        {/* Left thumbnails */}
        <div className="flex flex-col  gap-4">
          {[...Array(4)].map((_, i) => (
            <img
              key={i}
              src={product.image}
              alt="thumb"
              onClick={() => setSelectedImage(product.image)}
              className="w-20 h-20 object-contain border cursor-pointer"
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 flex items-center justify-center ">
          <img
            src={selectedImage}
            alt={product.title}
            className="w-[400px] h-[400px] object-contain transition-transform duration-300 hover:scale-105
"
          />
        </div>

        {/* Product Info */}
        <div className="w-[350px] space-y-4">
          <h2 className="font-semibold text-xl">{product.title}</h2>
          <p className="text-gray-500 text-sm">quilted brown mules</p>
          <p className="text-2xl font-bold">${product.price}</p>

          <div className="text-right text-xs text-gray-500 underline cursor-pointer">
            Size Guide
          </div>

          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Choose an option</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
<button
  onClick={() => {
    setAddingToCart(true);
    addToCart(product);
    toast.success("Product added to cart!");
    setTimeout(() => setAddingToCart(false), 1000);
  }}
  disabled={addingToCart}
  className={`bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition ${
    addingToCart ? 'opacity-50 cursor-not-allowed' : ''
  }`}
>
  {addingToCart ? 'Adding...' : 'Add to Cart'}
</button>

          <button className="w-full bg-gray-200 text-black py-3 rounded font-semibold flex items-center justify-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="GPay" className="w-5 h-5" />
            Pay with GPay
          </button>

          {/* Payment icons */}
          <div className="flex items-center gap-2 mt-4">
            {['https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg',
              'https://upload.wikimedia.org/wikipedia/commons/0/0e/Mastercard-logo.png',
              'https://upload.wikimedia.org/wikipedia/commons/4/41/Apple_Pay_logo.svg',
              'https://upload.wikimedia.org/wikipedia/commons/4/4e/Google_Pay_Logo.svg',
              'https://upload.wikimedia.org/wikipedia/commons/f/fa/Paypal_2014_logo.png'].map((src, i) => (
              <img key={i} src={src} alt="pay" className="h-6 object-contain" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
