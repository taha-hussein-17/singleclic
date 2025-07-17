import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="w-full max-w-[310px] bg-white rounded-md   hover:shadow-md duration-200">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[290px] object-contain p-4"
        />
        <div className="px-4 pb-4">
          <p className="text-xs text-gray-500 mb-1">Moon Boots</p>
          <h2 className="text-[13px] font-semibold leading-4 mb-1 line-clamp-2 min-h-[35px]">
            {product.title}
          </h2>
          <p className="text-sm font-semibold">${product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
