import React from 'react';
import { Link } from 'react-router-dom';

const PromoSection: React.FC = () => {
  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-xl">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://picsum.photos/seed/promo/1600/600"
          alt="Promotional background"
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-60" />
      </div>
      <div className="relative max-w-4xl mx-auto text-center py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          <span className="block">Giảm Giá Cuối Mùa</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-indigo-200">
          Đừng bỏ lỡ! Giảm giá tới 50% cho các mặt hàng chọn lọc.
        </p>
        <Link
          to="/products"
          className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-indigo-50 sm:w-auto"
        >
          Mua Sắm Ngay
        </Link>
      </div>
    </div>
  );
};

export default PromoSection;
