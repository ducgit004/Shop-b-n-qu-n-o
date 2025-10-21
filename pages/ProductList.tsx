import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { formatCurrency } from '../utils/formatCurrency';

const ITEMS_PER_PAGE = 9;

const ProductList: React.FC = () => {
  const location = useLocation();

  const getFiltersFromQuery = () => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    return {
      category: category ? [category] : [],
    };
  };

  const [selectedCategories, setSelectedCategories] = useState<string[]>(getFiltersFromQuery().category);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState('default');
  const [priceRange, setPriceRange] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Sync filters with URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategories([category]);
      // Reset other filters for clarity when a category is chosen from header
      setSelectedSizes([]);
      setSelectedColors([]);
      setPriceRange('all');
    } else {
        // Optional: clear filters if navigating to the main products page without a category
        // setSelectedCategories([]); 
    }
  }, [location.search]);


  const categories = useMemo(() => [...new Set(PRODUCTS.map((p) => p.category))], []);
  const allSizes = useMemo(() => [...new Set(PRODUCTS.flatMap(p => p.sizes))].sort(), []);
  const allColors = useMemo(() => [...new Set(PRODUCTS.flatMap(p => p.colors))].sort(), []);
  
  const priceOptions = [
    { value: 'all', label: 'Tất cả' },
    { value: 'under-1m', label: `Dưới 1.000.000đ` },
    { value: '1m-2m', label: `1.000.000đ - 2.000.000đ` },
    { value: 'over-2m', label: `Trên 2.000.000đ` },
  ];

  const handleCheckboxChange = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (value: string) => {
    setter(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const handleCategoryChange = handleCheckboxChange(setSelectedCategories);
  const handleSizeChange = handleCheckboxChange(setSelectedSizes);
  const handleColorChange = handleCheckboxChange(setSelectedColors);

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange('all');
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortOrder('default');
  }

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedSizes, selectedColors, sortOrder, priceRange]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = PRODUCTS;

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }
    // Filter by size
    if (selectedSizes.length > 0) {
      result = result.filter(product => product.sizes.some(size => selectedSizes.includes(size)));
    }
     // Filter by color
    if (selectedColors.length > 0) {
      result = result.filter(product => product.colors.some(color => selectedColors.includes(color)));
    }

    // Filter by price
    result = result.filter(product => {
      const price = product.price;
      if (priceRange === 'all') return true;
      if (priceRange === 'under-1m') return price < 1000000;
      if (priceRange === '1m-2m') return price >= 1000000 && price <= 2000000;
      if (priceRange === 'over-2m') return price > 2000000;
      return true;
    });

    // Sort
    const sortedResult = [...result];
    switch (sortOrder) {
      case 'price-asc':
        sortedResult.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedResult.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sortedResult.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedResult.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return sortedResult;
  }, [selectedCategories, selectedSizes, selectedColors, sortOrder, priceRange]);
  
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredAndSortedProducts]);
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0); // Scroll to top on page change
    }
  };


  const FilterSidebarContent = () => (
    <div className="space-y-6">
        <div>
            <h3 className="text-lg font-semibold mb-3">Danh mục</h3>
            <div className="space-y-2">
                {categories.map(category => (
                    <div key={category} className="flex items-center">
                        <input id={`filter-category-${category}`} type="checkbox" checked={selectedCategories.includes(category)} onChange={() => handleCategoryChange(category)} className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"/>
                        <label htmlFor={`filter-category-${category}`} className="ml-3 text-sm text-gray-600">{category}</label>
                    </div>
                ))}
            </div>
        </div>
        <div>
            <h3 className="text-lg font-semibold mb-3">Giá</h3>
            <div className="space-y-2">
                {priceOptions.map(option => (
                     <div key={option.value} className="flex items-center">
                        <input id={`filter-price-${option.value}`} name="price-range" type="radio" value={option.value} checked={priceRange === option.value} onChange={(e) => setPriceRange(e.target.value)} className="h-4 w-4 border-gray-300 text-accent focus:ring-accent"/>
                        <label htmlFor={`filter-price-${option.value}`} className="ml-3 text-sm text-gray-600">{option.label}</label>
                    </div>
                ))}
            </div>
        </div>
        <div>
            <h3 className="text-lg font-semibold mb-3">Kích cỡ</h3>
            <div className="grid grid-cols-3 gap-2">
                {allSizes.map(size => (
                    <div key={size} className="flex items-center">
                         <input id={`filter-size-${size}`} type="checkbox" checked={selectedSizes.includes(size)} onChange={() => handleSizeChange(size)} className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"/>
                        <label htmlFor={`filter-size-${size}`} className="ml-2 text-sm text-gray-600">{size}</label>
                    </div>
                ))}
            </div>
        </div>
         <div>
            <h3 className="text-lg font-semibold mb-3">Màu sắc</h3>
            <div className="space-y-2">
                {allColors.map(color => (
                    <div key={color} className="flex items-center">
                         <input id={`filter-color-${color}`} type="checkbox" checked={selectedColors.includes(color)} onChange={() => handleColorChange(color)} className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"/>
                        <label htmlFor={`filter-color-${color}`} className="ml-3 text-sm text-gray-600">{color}</label>
                    </div>
                ))}
            </div>
        </div>
        <button onClick={clearFilters} className="w-full text-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Xóa bộ lọc
        </button>
    </div>
  );

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Bộ Sưu Tập</h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Duyệt qua bộ sưu tập quần áo và phụ kiện chất lượng cao được tuyển chọn của chúng tôi.
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 bg-gray-50 p-6 rounded-lg self-start sticky top-24">
            <h2 className="text-xl font-bold mb-6">Bộ lọc</h2>
            <FilterSidebarContent />
        </aside>

        {/* Mobile filter dialog */}
         <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ease-in-out ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)} />
            <div className={`relative z-50 flex flex-col w-4/5 max-w-xs h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-medium">Bộ lọc</h2>
                    <button onClick={() => setIsFilterOpen(false)} className="-mr-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400">
                        <span className="sr-only">Đóng menu</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="p-6 flex-1 overflow-y-auto">
                    <FilterSidebarContent />
                </div>
            </div>
        </div>

        {/* Product grid */}
        <main className="lg:col-span-3">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-8">
            <p className="text-sm text-gray-500">{filteredAndSortedProducts.length} sản phẩm</p>
            <div className="flex items-center">
              <label htmlFor="sort-order" className="mr-2 text-sm font-medium text-gray-700">Sắp xếp:</label>
              <select id="sort-order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="rounded-md border border-gray-300 py-1.5 pl-3 pr-8 text-base focus:outline-none focus:ring-accent focus:border-accent sm:text-sm">
                <option value="default">Mới nhất</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="name-asc">Tên: A-Z</option>
                <option value="name-desc">Tên: Z-A</option>
              </select>
            </div>
            <button onClick={() => setIsFilterOpen(true)} className="lg:hidden p-2 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L12 14.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 016 17v-2.586L3.293 6.707A1 1 0 013 6V4z" /></svg>
            </button>
          </div>
          
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
                  {paginatedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                  ))}
              </div>
              {totalPages > 1 && (
                <nav aria-label="Pagination" className="mt-12 flex items-center justify-center space-x-2">
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                      Trước
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button key={page} onClick={() => handlePageChange(page)} className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border rounded-md ${currentPage === page ? 'z-10 bg-indigo-50 border-accent text-accent' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}>
                          {page}
                      </button>
                  ))}
                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                      Sau
                  </button>
                </nav>
              )}
            </>
          ) : (
             <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-800">Không tìm thấy sản phẩm nào</h3>
                <p className="mt-2 text-gray-500">Vui lòng thử điều chỉnh bộ lọc của bạn.</p>
             </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductList;