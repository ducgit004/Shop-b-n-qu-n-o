import React from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Tạo tài khoản mới
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hoặc{' '}
            <Link to="/login" className="font-medium text-accent hover:text-indigo-500">
              đăng nhập vào tài khoản hiện có của bạn
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="full-name" className="sr-only">Họ và tên</label>
              <input
                id="full-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                placeholder="Họ và tên"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Địa chỉ email</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                placeholder="Địa chỉ email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Mật khẩu</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                placeholder="Mật khẩu"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            >
              Tạo tài khoản
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;