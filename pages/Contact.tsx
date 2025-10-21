import React from 'react';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ liên hệ lại với bạn sớm.');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Liên hệ</h1>
      <p className="text-center text-gray-600 mb-10">
        Có câu hỏi? Chúng tôi rất muốn nghe từ bạn. Điền vào biểu mẫu bên dưới hoặc liên hệ với chúng tôi qua thông tin liên lạc.
      </p>
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Gửi tin nhắn cho chúng tôi</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Họ và tên</label>
              <input type="text" id="name" name="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Địa chỉ Email</label>
              <input type="email" id="email" name="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Lời nhắn</label>
              <textarea id="message" name="message" rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"></textarea>
            </div>
            <div>
              <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors duration-300">
                Gửi
              </button>
            </div>
          </form>
        </div>
        {/* Contact Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Thông tin liên hệ</h2>
          <div className="flex items-start space-x-4">
            <svg className="h-6 w-6 text-accent flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <div>
              <h3 className="font-semibold text-gray-800">Địa chỉ</h3>
              <p className="text-gray-600">123 Fashion Ave, Suite 100, New York, NY 10001</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <svg className="h-6 w-6 text-accent flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            <div>
              <h3 className="font-semibold text-gray-800">Điện thoại</h3>
              <p className="text-gray-600">(212) 555-0123</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <svg className="h-6 w-6 text-accent flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <div>
              <h3 className="font-semibold text-gray-800">Email</h3>
              <p className="text-gray-600">support@rocketglobal.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;