import React from 'react';

const brands = [
  { name: 'BrandA', logo: 'https://dummyimage.com/158x48/e5e7eb/a3a3a3.png&text=Brand+A' },
  { name: 'BrandB', logo: 'https://dummyimage.com/158x48/e5e7eb/a3a3a3.png&text=Brand+B' },
  { name: 'BrandC', logo: 'https://dummyimage.com/158x48/e5e7eb/a3a3a3.png&text=Brand+C' },
  { name: 'BrandD', logo: 'https://dummyimage.com/158x48/e5e7eb/a3a3a3.png&text=Brand+D' },
  { name: 'BrandE', logo: 'https://dummyimage.com/158x48/e5e7eb/a3a3a3.png&text=Brand+E' },
];

const BrandSection: React.FC = () => {
  return (
    <div className="bg-white py-12 sm:py-16 rounded-lg shadow-lg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold leading-8 text-gray-900 mb-10">
          Thương Hiệu Nổi Bật
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {brands.map(brand => (
             <img
              key={brand.name}
              className="col-span-1 max-h-12 w-full object-contain filter grayscale hover:grayscale-0 transition duration-300"
              src={brand.logo}
              alt={brand.name}
              width={158}
              height={48}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSection;