import React from 'react';

const posts = [
  {
    id: 1,
    title: '5 Xu Hướng Thời Trang Mùa Thu Bạn Cần Biết',
    href: '#',
    description:
      'Hãy sẵn sàng cho mùa thu với những phong cách mới nhất. Từ áo khoác statement đến giày chunky, chúng tôi đã tổng hợp tất cả.',
    imageUrl:
      'https://picsum.photos/seed/news1/600/400',
    date: '16 Tháng 3, 2024',
    datetime: '2024-03-16',
  },
  {
    id: 2,
    title: 'Cách Phối Đồ Với Áo Denim Của Bạn',
    href: '#',
    description:
      'Áo khoác denim là một món đồ không thể thiếu trong tủ đồ. Khám phá những cách mới để tạo kiểu cho món đồ cổ điển này cho bất kỳ dịp nào.',
    imageUrl:
      'https://picsum.photos/seed/news2/600/400',
    date: '10 Tháng 3, 2024',
    datetime: '2024-03-10',
  },
  {
    id: 3,
    title: 'Hướng Dẫn Chăm Sóc Vải Bền Vững',
    href: '#',
    description:
      'Tìm hiểu cách chăm sóc quần áo của bạn để chúng bền lâu hơn và giảm tác động đến môi trường. Mẹo giặt, sấy và bảo quản.',
    imageUrl:
      'https://picsum.photos/seed/news3/600/400',
    date: '5 Tháng 3, 2024',
    datetime: '2024-03-05',
  },
]

const NewsSection: React.FC = () => {
  return (
    <div className="bg-white py-16 sm:py-24 rounded-lg shadow-lg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tin Tức & Cập Nhật</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Cập nhật những tin tức mới nhất về thời trang và các mẹo tạo kiểu.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-col items-start justify-between">
              <div className="relative w-full">
                <img
                  src={post.imageUrl}
                  alt=""
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewsSection;
