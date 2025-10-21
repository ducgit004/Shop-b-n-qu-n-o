import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold text-primary">Rocket Global</h3>
            <p className="mt-4 text-gray-500 text-sm leading-relaxed">
              Mang đến những xu hướng thời trang hiện đại, chất lượng cao và bền vững cho tủ đồ của bạn.
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-primary">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.792 2.013 10.146 2 12.315 2zM12 7.151c-2.673 0-4.849 2.176-4.849 4.849S9.327 16.85 12 16.85s4.849-2.176 4.849-4.849S14.673 7.151 12 7.151zm0 7.698c-1.571 0-2.85-1.279-2.85-2.85s1.279-2.85 2.85-2.85 2.85 1.279 2.85 2.85-1.279 2.85-2.85 2.85zm4.905-6.883c-.765 0-1.385-.62-1.385-1.385s.62-1.385 1.385-1.385 1.385.62 1.385 1.385-.62 1.385-1.385 1.385z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Hỗ trợ khách hàng */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">Hỗ trợ khách hàng</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-base text-gray-500 hover:text-primary">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-primary">Chính sách vận chuyển</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-primary">Chính sách đổi trả</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-primary">Theo dõi đơn hàng</a></li>
            </ul>
          </div>
          
          {/* Về chúng tôi */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">Về chúng tôi</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/about" className="text-base text-gray-500 hover:text-primary">Giới thiệu</Link></li>
              <li><Link to="/contact" className="text-base text-gray-500 hover:text-primary">Liên hệ</Link></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-primary">Cơ hội nghề nghiệp</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-primary">Blog</a></li>
            </ul>
          </div>
          
          {/* Hệ thống cửa hàng */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">Hệ thống cửa hàng</h3>
            <ul className="mt-4 space-y-3 text-base text-gray-500">
              <li className="flex flex-col">
                <span className="font-medium">Hà Nội</span>
                <span>123 Phố Huế, Hai Bà Trưng</span>
              </li>
              <li className="flex flex-col">
                <span className="font-medium">TP. Hồ Chí Minh</span>
                <span>456 Lê Lợi, Quận 1</span>
              </li>
              <li className="flex flex-col">
                <span className="font-medium">Đà Nẵng</span>
                <span>789 Bạch Đằng, Hải Châu</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 text-center">&copy; {new Date().getFullYear()} Rocket Global. Đã đăng ký bản quyền.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;