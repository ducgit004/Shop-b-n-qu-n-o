
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { formatCurrency } from '../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative border rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col">
      <Link to={`/products/${product.id}`} className="block">
        <div className="w-full h-80 bg-gray-200 overflow-hidden">
          <img
            src={product.imageUrls[0]}
            alt={product.name}
            className="w-full h-full object-center object-cover group-hover:opacity-75 transition-opacity duration-300"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm text-gray-700 flex-grow">
          <Link to={`/products/${product.id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{formatCurrency(product.price)}</p>
        <div className="mt-4">
          <Link
            to={`/products/${product.id}`}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent flex items-center justify-center text-sm"
          >
            Xem tùy chọn
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
