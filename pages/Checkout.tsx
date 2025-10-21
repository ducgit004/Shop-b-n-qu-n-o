
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'online'
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Giỏ hàng của bạn đang trống.");
      return;
    }
    // Handle checkout logic here
    alert("Đặt hàng thành công! Cảm ơn bạn đã mua hàng.");
    clearCart();
    // Ideally, navigate to an order confirmation page
  };

  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Thanh toán</h1>
      
      <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
        <section className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Thông tin liên hệ</h2>
              <div className="mt-4">
                <label htmlFor="email-address" className="block text-sm font-semibold text-gray-800">Địa chỉ email</label>
                <div className="mt-1">
                  <input type="email" id="email-address" name="email-address" autoComplete="email" required className="block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent sm:text-sm transition duration-150 ease-in-out" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900">Thông tin giao hàng</h2>
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-semibold text-gray-800">Tên</label>
                  <input type="text" id="first-name" name="first-name" required className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent sm:text-sm transition duration-150 ease-in-out" />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-semibold text-gray-800">Họ</label>
                  <input type="text" id="last-name" name="last-name" required className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent sm:text-sm transition duration-150 ease-in-out" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-800">Địa chỉ</label>
                  <input type="text" id="address" name="address" required className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent sm:text-sm transition duration-150 ease-in-out" />
                </div>
              </div>
            </div>

            <div>
                <h2 className="text-lg font-medium text-gray-900">Phương thức thanh toán</h2>
                <fieldset className="mt-4">
                    <legend className="sr-only">Phương thức thanh toán</legend>
                    <div className="space-y-4">
                        <div 
                            onClick={() => setPaymentMethod('cod')}
                            className={`relative block rounded-lg border px-6 py-4 shadow-sm cursor-pointer transition-all duration-200 ${paymentMethod === 'cod' ? 'border-accent ring-2 ring-accent' : 'border-gray-300 hover:border-gray-400'}`}
                        >
                            <input
                                id="cod"
                                type="radio"
                                name="payment-method"
                                value="cod"
                                checked={paymentMethod === 'cod'}
                                onChange={() => setPaymentMethod('cod')}
                                className="absolute top-4 right-4 h-4 w-4 text-accent focus:ring-accent border-gray-300"
                            />
                            <p className="font-medium text-gray-900">Thanh toán khi nhận hàng (COD)</p>
                            <p className="mt-1 text-sm text-gray-500">Thanh toán bằng tiền mặt khi nhận hàng.</p>
                        </div>

                        <div 
                            onClick={() => setPaymentMethod('online')}
                            className={`relative block rounded-lg border px-6 py-4 shadow-sm cursor-pointer transition-all duration-200 ${paymentMethod === 'online' ? 'border-accent ring-2 ring-accent' : 'border-gray-300 hover:border-gray-400'}`}
                        >
                            <input
                                id="online"
                                type="radio"
                                name="payment-method"
                                value="online"
                                checked={paymentMethod === 'online'}
                                onChange={() => setPaymentMethod('online')}
                                className="absolute top-4 right-4 h-4 w-4 text-accent focus:ring-accent border-gray-300"
                            />
                            <p className="font-medium text-gray-900">Thanh toán online</p>
                            <p className="mt-1 text-sm text-gray-500">Sử dụng thẻ tín dụng hoặc thẻ ghi nợ.</p>
                        </div>
                    </div>
                </fieldset>
            </div>

            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${paymentMethod === 'online' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pt-6">
                    <h2 className="text-lg font-medium text-gray-900">Chi tiết thanh toán</h2>
                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-4">
                        <div className="sm:col-span-4">
                        <label htmlFor="card-number" className="block text-sm font-semibold text-gray-800">Số thẻ</label>
                        <input type="text" id="card-number" name="card-number" required={paymentMethod === 'online'} className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent sm:text-sm transition duration-150 ease-in-out" />
                        </div>
                        <div className="sm:col-span-2">
                        <label htmlFor="expiration-date" className="block text-sm font-semibold text-gray-800">Ngày hết hạn (MM/YY)</label>
                        <input type="text" id="expiration-date" name="expiration-date" required={paymentMethod === 'online'} className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent sm:text-sm transition duration-150 ease-in-out" />
                        </div>
                        <div>
                        <label htmlFor="cvc" className="block text-sm font-semibold text-gray-800">CVC</label>
                        <input type="text" id="cvc" name="cvc" required={paymentMethod === 'online'} className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent sm:text-sm transition duration-150 ease-in-out" />
                        </div>
                    </div>
                </div>
            </div>

             <div className="pt-6 border-t border-gray-200">
                <button type="submit" className="w-full bg-primary border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-accent">
                    Xác nhận đơn hàng
                </button>
            </div>
          </form>
        </section>
        
        <section aria-labelledby="summary-heading" className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
          <h2 id="summary-heading" className="text-lg font-medium text-gray-900">Tóm tắt đơn hàng</h2>
          {cart.length > 0 ? (
            <>
              <ul role="list" className="mt-6 divide-y divide-gray-200">
                {cart.map((product) => (
                  <li key={product.cartItemId} className="flex py-6 space-x-4">
                    <img src={product.imageUrls[0]} alt={product.name} className="flex-none w-20 h-20 rounded-md object-center object-cover"/>
                    <div className="flex-auto space-y-1">
                      <h3 className="text-gray-900 font-medium">{product.name}</h3>
                      <p className="text-gray-500 text-sm capitalize">{product.selectedColor} / {product.selectedSize}</p>
                      <p className="text-gray-500 text-sm">SL: {product.quantity}</p>
                    </div>
                    <p className="flex-none text-base font-medium text-gray-900">{formatCurrency(product.price * product.quantity)}</p>
                  </li>
                ))}
              </ul>
              <dl className="mt-6 space-y-4 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Tạm tính</dt>
                  <dd className="text-sm font-medium text-gray-900">{formatCurrency(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Vận chuyển</dt>
                  <dd className="text-sm font-medium text-gray-900">{formatCurrency(0)}</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">Tổng cộng</dt>
                  <dd className="text-base font-medium text-gray-900">{formatCurrency(subtotal)}</dd>
                </div>
              </dl>
            </>
           ) : (
            <p className="mt-6 text-sm text-gray-500">Giỏ hàng của bạn đang trống.</p>
           )}
        </section>
      </div>
    </div>
  );
};

export default Checkout;
