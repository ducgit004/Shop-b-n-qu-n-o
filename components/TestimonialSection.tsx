import React from 'react';

const testimonials = [
  {
    body: 'Chất lượng quần áo thật tuyệt vời và dịch vụ khách hàng cũng rất xuất sắc. Chắc chắn sẽ mua sắm ở đây một lần nữa!',
    author: {
      name: 'Anh Nguyễn',
      handle: 'anhnguyen',
      imageUrl: 'https://picsum.photos/seed/user1/100/100',
    },
  },
  {
    body: 'Tôi rất thích chiếc áo khoác denim tôi đã mua. Nó vừa vặn hoàn hảo và trông rất phong cách. Giao hàng cũng rất nhanh.',
    author: {
      name: 'Chị Trần',
      handle: 'chitran',
      imageUrl: 'https://picsum.photos/seed/user2/100/100',
    },
  },
  {
    body: 'Bộ sưu tập độc đáo và giá cả hợp lý. Tôi đã tìm thấy một vài món đồ tuyệt vời mà tôi không thể tìm thấy ở bất kỳ nơi nào khác.',
    author: {
      name: 'Minh Lê',
      handle: 'minhle',
      imageUrl: 'https://picsum.photos/seed/user3/100/100',
    },
  },
]

const TestimonialSection: React.FC = () => {
  return (
    <div className="bg-white py-16 sm:py-24 rounded-lg shadow-lg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Khách Hàng Nói Gì Về Chúng Tôi</h2>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author.handle} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                <figure className="rounded-2xl bg-gray-50 p-8 text-sm leading-6">
                  <blockquote className="text-gray-900">
                    <p>{`“${testimonial.body}”`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img className="h-10 w-10 rounded-full bg-gray-50" src={testimonial.author.imageUrl} alt="" />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
                      <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialSection;
