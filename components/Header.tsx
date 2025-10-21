import React, { useState, useEffect, useMemo } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../constants';

const Header: React.FC = () => {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);

  const location = useLocation();

  const categories = useMemo(() => [...new Set(PRODUCTS.map((p) => p.category))], []);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMenuOpen(false);
  }, [location]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `relative py-5 text-sm font-medium transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-primary after:transition-transform after:duration-300 after:origin-center ${
      isActive ? 'text-primary after:scale-x-100' : 'text-gray-600 hover:text-primary after:scale-x-0 hover:after:scale-x-100'
    }`;
  
  const isProductPageActive = location.pathname.startsWith('/products');

  const productLinkClasses = `relative py-5 text-sm font-medium transition-colors cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-primary after:transition-transform after:duration-300 after:origin-center ${
      isProductPageActive ? 'text-primary after:scale-x-100' : 'text-gray-600 group-hover:text-primary after:scale-x-0 group-hover:after:scale-x-100'
    }`;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block py-3 px-4 rounded-md text-base font-medium transition-colors ${
      isActive ? 'bg-accent text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
    }`;

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <NavLink to="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary">Rocket Global</h1>
              </NavLink>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <NavLink to="/" className={navLinkClasses}>Trang chủ</NavLink>
                <div 
                  className="relative group"
                  onMouseEnter={() => setIsCategoryMenuOpen(true)}
                  onMouseLeave={() => setIsCategoryMenuOpen(false)}
                >
                  <Link to="/products" className={productLinkClasses}>
                    Sản phẩm
                  </Link>
                  <div 
                    className={`absolute left-0 top-full pt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 transition-opacity duration-300 ease-in-out ${
                        isCategoryMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                  >
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <Link to="/products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                          Tất cả sản phẩm
                      </Link>
                      {categories.map(category => (
                        <Link
                          key={category}
                          to={`/products?category=${encodeURIComponent(category)}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          onClick={() => setIsCategoryMenuOpen(false)}
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <NavLink to="/about" className={navLinkClasses}>Giới thiệu</NavLink>
                <NavLink to="/contact" className={navLinkClasses}>Liên hệ</NavLink>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden md:block">
                 <div className="ml-4 flex items-center md:ml-6">
                  <NavLink to="/login" className="text-gray-600 hover:text-primary text-sm font-medium">Đăng nhập</NavLink>
                  <NavLink to="/register" className="ml-4 text-gray-600 hover:text-primary text-sm font-medium">Đăng ký</NavLink>
                </div>
              </div>
              <NavLink to="/cart" className="ml-4 p-2 rounded-full text-gray-600 hover:text-primary hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white relative">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                    {totalItems}
                  </span>
                )}
              </NavLink>
              <div className="-mr-2 flex md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-200 focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`relative z-50 flex flex-col w-4/5 max-w-xs h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <NavLink to="/" className="flex-shrink-0">
                <h1 className="text-xl font-bold text-primary">Rocket Global</h1>
            </NavLink>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100"
            >
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1">
            <NavLink to="/" className={mobileNavLinkClasses}>Trang chủ</NavLink>
            
            <div>
              <button 
                onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)} 
                className={`w-full flex justify-between items-center py-3 px-4 rounded-md text-base font-medium transition-colors ${
                  isProductPageActive ? 'bg-accent text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                }`}
              >
                <span>Sản phẩm</span>
                <svg className={`w-5 h-5 transition-transform duration-200 ${isMobileCategoryOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMobileCategoryOpen && (
                <div className="pl-4 mt-1 space-y-1">
                  <NavLink to="/products" className={mobileNavLinkClasses}>Tất cả sản phẩm</NavLink>
                  {categories.map(category => (
                    <NavLink
                      key={category}
                      to={`/products?category=${encodeURIComponent(category)}`}
                      className={mobileNavLinkClasses}
                    >
                      {category}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
            
            <NavLink to="/about" className={mobileNavLinkClasses}>Giới thiệu</NavLink>
            <NavLink to="/contact" className={mobileNavLinkClasses}>Liên hệ</NavLink>
            
            <div className="border-t my-4" />
            
            <NavLink to="/login" className={mobileNavLinkClasses}>Đăng nhập</NavLink>
            <NavLink to="/register" className={mobileNavLinkClasses}>Đăng ký</NavLink>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;