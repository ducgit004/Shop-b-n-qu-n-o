import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Áo Khoác', href: '/products', imageSrc: 'https://picsum.photos/seed/cat1/600/800' },
  { name: 'Áo Thun', href: '/products', imageSrc: 'https://picsum.photos/seed/cat2/600/800' },
  { name: 'Quần Dài', href: '/products', imageSrc: 'https://picsum.photos/seed/cat3/600/800' },
  { name: 'Phụ Kiện', href: '/products', imageSrc: 'https://picsum.photos/seed/cat4/600/800' },
];

const CategorySection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-10">Khám phá theo danh mục</h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 gap-x-6">
          {categories.map((category) => (
            <Link key={category.name} to={category.href} className="group">
              <div className="relative w-full h-80 rounded-lg overflow-hidden group-hover:opacity-75">
                <img
                  src={category.imageSrc}
                  alt={category.name}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900 text-center">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
