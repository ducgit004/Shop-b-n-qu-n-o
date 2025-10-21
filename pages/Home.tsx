import React from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import PromoSection from '../components/PromoSection';
import BrandSection from '../components/BrandSection';
import NewsSection from '../components/NewsSection';
import TestimonialSection from '../components/TestimonialSection';
import SubscribeSection from '../components/SubscribeSection';

const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 8);

  const FeaturedProducts = () => (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center">Sản phẩm nổi bật</h2>
      <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-24">
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <PromoSection />
      <BrandSection />
      <NewsSection />
      <TestimonialSection />
      <SubscribeSection />
    </div>
  );
};

export default Home;
