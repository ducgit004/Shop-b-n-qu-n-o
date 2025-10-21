
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Giỏ hàng</h1>
      
      {cart.length === 0 ? (
        <div className="mt-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <h2 className="mt-2 text-lg font-medium text-gray-900">Giỏ hàng của bạn đang trống</h2>
          <p className="mt-1 text-sm text-gray-500">
            Có vẻ như bạn chưa thêm bất cứ thứ gì vào giỏ hàng của mình.
          </p>
          <div className="mt-6">
            <Link to="/products" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-opacity-80">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">Các mặt hàng trong giỏ hàng của bạn</h2>
            <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
              {cart.map((product) => (
                <li key={product.cartItemId} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img src={product.imageUrls[0]} alt={product.name} className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48" />
                  </div>
                  <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <Link to={`/products/${product.id}`} className="font-medium text-gray-700 hover:text-gray-800">{product.name}</Link>
                          </h3>
                        </div>
                         <div className="mt-1 flex text-sm">
                          <p className="text-gray-500 capitalize">{product.selectedColor}</p>
                          <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">{product.selectedSize}</p>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">{formatCurrency(product.price)}</p>
                      </div>
                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor={`quantity-${product.cartItemId}`} className="sr-only">Số lượng, {product.name}</label>
                        <select
                          id={`quantity-${product.cartItemId}`}
                          name={`quantity-${product.cartItemId}`}
                          value={product.quantity}
                          onChange={(e) => updateQuantity(product.cartItemId, parseInt(e.target.value))}
                          className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent sm:text-sm"
                        >
                          {[1,2,3,4,5,6,7,8].map(q => <option key={q} value={q}>{q}</option>)}
                        </select>
                        <div className="absolute top-0 right-0">
                          <button onClick={() => removeFromCart(product.cartItemId)} type="button" className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Xóa</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          
          <section aria-labelledby="summary-heading" className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">Tóm tắt đơn hàng</h2>
            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Tạm tính</dt>
                <dd className="text-sm font-medium text-gray-900">{formatCurrency(subtotal)}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="text-base font-medium text-gray-900">Tổng cộng</dt>
                <dd className="text-base font-medium text-gray-900">{formatCurrency(subtotal)}</dd>
              </div>
            </dl>
            <div className="mt-6">
              <Link to="/checkout" className="w-full bg-primary border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-accent block text-center">
                Thanh toán
              </Link>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Cart;
