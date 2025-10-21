
import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import ProductCard from '../components/ProductCard';

// Dữ liệu mẫu cho đánh giá
const mockReviews = [
  { id: 1, author: 'Anh Khoa', rating: 5, comment: 'Chất vải rất tốt, mặc mát và thoải mái. Form dáng chuẩn, lên đồ rất đẹp. Sẽ ủng hộ shop lần sau!' },
  { id: 2, author: 'Minh Thư', rating: 4, comment: 'Sản phẩm giống hình, giao hàng nhanh. Chỉ có điều màu sắc bên ngoài hơi đậm hơn so với ảnh một chút.' },
  { id: 3, author: 'Gia Bảo', rating: 5, comment: 'Mua làm quà tặng bạn gái, bạn gái mình rất thích. Cảm ơn shop đã tư vấn nhiệt tình.' },
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const product = useMemo(() => PRODUCTS.find((p) => p.id === Number(id)), [id]);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Không tìm thấy sản phẩm</h2>
        <p className="text-gray-500">Xin lỗi, chúng tôi không thể tìm thấy sản phẩm bạn đang tìm kiếm.</p>
      </div>
    );
  }

  const { imageUrls } = product;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Vui lòng chọn màu sắc và kích cỡ.');
      return;
    }
    addToCart(product, quantity, selectedSize, selectedColor);
    alert('Đã thêm sản phẩm vào giỏ hàng!');
  };
  
  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  const ReviewForm = () => {
    const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Cảm ơn bạn đã gửi đánh giá!');
    };
    return (
        <form onSubmit={handleReviewSubmit} className="space-y-4 max-w-lg">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên của bạn</label>
              <input type="text" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent" />
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Bình luận</label>
              <textarea id="comment" rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"></textarea>
            </div>
            <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors">Gửi đánh giá</button>
        </form>
    );
  };

  const colorMap: { [key: string]: string } = {
    'Blue': '#3b82f6', 'Black': '#000000', 'White': '#FFFFFF',
    'Gray': '#9ca3af', 'Khaki': '#f0e68c', 'Navy': '#000080',
    'Charcoal': '#36454F', 'Burgundy': '#800020', 'Olive': '#808000',
    'Brown': '#a52a2a', 'Light Blue': '#add8e6', 'Beige': '#f5f5dc',
    'Red': '#ef4444', 'Yellow': '#f59e0b', 'Cream': '#fffdd0',
    'Faded Black': '#555555', 'Camel': '#c19a6b', 'Green': '#22c55e',
    'Heather Gray': '#d1d5db', 'Orange': '#f97316'
  };


  return (
    <div className="bg-white">
      <div className="p-4 sm:p-8 rounded-lg shadow-lg mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
            {/* Image Slideshow */}
            <div className="lg:col-span-1">
              <div className="relative aspect-square rounded-lg overflow-hidden group bg-gray-100">
                {imageUrls.map((url, index) => (
                  <div key={index} className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <img src={url} alt={`${product.name} image ${index + 1}`} className="w-full h-full object-center object-cover"/>
                  </div>
                ))}
                {imageUrls.length > 1 && (
                  <>
                    <button onClick={prevImage} aria-label="Previous image" className="absolute top-1/2 left-3 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-40 text-white rounded-full hover:bg-opacity-60 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={nextImage} aria-label="Next image" className="absolute top-1/2 right-3 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-40 text-white rounded-full hover:bg-opacity-60 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
                      {imageUrls.map((_, index) => (
                        <button key={index} onClick={() => setCurrentImageIndex(index)} aria-label={`Go to image ${index + 1}`} className={`h-2 w-2 rounded-full transition-colors duration-300 ${index === currentImageIndex ? 'bg-white ring-1 ring-black/50' : 'bg-white/50 hover:bg-white'}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0 lg:col-span-1">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
              <div className="mt-3"><p className="text-3xl text-gray-900">{formatCurrency(product.price)}</p></div>
              
              {/* Color picker */}
              <fieldset className="mt-6">
                <legend className="text-sm font-medium text-gray-900">Màu sắc</legend>
                <div className="flex items-center space-x-3 mt-2">
                  {product.colors.map(color => (
                    <label key={color} title={color} className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                      <input type="radio" name="color-choice" value={color} className="sr-only" checked={selectedColor === color} onChange={() => setSelectedColor(color)} />
                      <span className={`h-8 w-8 rounded-full border border-black border-opacity-10 ${selectedColor === color ? 'ring ring-offset-1 ring-accent' : ''}`} style={{ backgroundColor: colorMap[color] || color.toLowerCase() }}></span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Size picker */}
              <fieldset className="mt-6">
                <div className="flex items-center justify-between">
                    <legend className="text-sm font-medium text-gray-900">Kích cỡ</legend>
                    <a href="#" className="text-sm font-medium text-accent hover:text-indigo-500">Bảng kích cỡ</a>
                </div>
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-5 mt-2">
                    {product.sizes.map(size => (
                        <label key={size} className={`group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none cursor-pointer transition-colors ${selectedSize === size ? 'bg-primary text-white border-primary' : 'bg-white text-gray-900 shadow-sm'}`}>
                            <input type="radio" name="size-choice" value={size} className="sr-only" checked={selectedSize === size} onChange={() => setSelectedSize(size)} />
                            <span>{size}</span>
                        </label>
                    ))}
                </div>
              </fieldset>
              
              <div className="mt-8 flex items-center">
                <label htmlFor="quantity" className="mr-4 font-medium text-gray-700">Số lượng</label>
                <select id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-accent focus:border-accent sm:text-sm">
                  {[1, 2, 3, 4, 5].map(q => <option key={q} value={q}>{q}</option>)}
                </select>
              </div>
              <div className="mt-8 flex">
                <button onClick={handleAddToCart} type="submit" className="max-w-xs flex-1 bg-primary border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent sm:w-full disabled:bg-gray-300" disabled={!selectedColor || !selectedSize}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description and Reviews Section */}
      <div className="p-4 sm:p-8 rounded-lg shadow-lg mb-12">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button onClick={() => setActiveTab('description')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'description' ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Mô tả sản phẩm
            </button>
            <button onClick={() => setActiveTab('reviews')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Đánh giá ({mockReviews.length})
            </button>
          </nav>
        </div>
        <div className="mt-8">
          {activeTab === 'description' && (
            <div className="space-y-4 text-gray-600 leading-relaxed">
               <h3 className="text-xl font-semibold text-gray-900">Chi tiết sản phẩm</h3>
              <p>{product.description}</p>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Đánh giá từ khách hàng</h3>
              <div className="space-y-8">
                {mockReviews.map(review => (
                  <div key={review.id} className="flex space-x-4">
                    <div className="flex-shrink-0">
                        <svg className="h-10 w-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                    <div>
                      <StarRating rating={review.rating} />
                      <p className="mt-2 text-gray-600">{review.comment}</p>
                      <p className="mt-2 text-sm font-medium text-gray-800">— {review.author}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Viết đánh giá của bạn</h4>
                <ReviewForm />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
         <div className="p-4 sm:p-8 rounded-lg shadow-lg">
           <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Sản phẩm liên quan</h2>
           <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
             {relatedProducts.map(related => (
               <ProductCard key={related.id} product={related} />
             ))}
           </div>
         </div>
      )}
    </div>
  );
};

export default ProductDetail;
