import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Về Rocket Global</h1>
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>
          Chào mừng bạn đến với Rocket Global, điểm đến của bạn cho thời trang hiện đại, chất lượng cao. Được thành lập vào năm 2023, sứ mệnh của chúng tôi là cung cấp quần áo thời trang và bền vững giúp bạn cảm thấy tự tin và thoải mái. Chúng tôi tin rằng thời trang nên dễ tiếp cận, thể hiện cá tính và có trách nhiệm.
        </p>
        <p>
          Các bộ sưu tập của chúng tôi được tuyển chọn cẩn thận để mang đến cho bạn những xu hướng mới nhất và những tác phẩm kinh điển vượt thời gian. Chúng tôi lấy nguồn nguyên liệu từ các nhà cung cấp có đạo đức và hợp tác với các nhà sản xuất chia sẻ cam kết của chúng tôi về thực hành lao động công bằng. Mỗi sản phẩm bạn tìm thấy tại Rocket Global đều được thiết kế với sự chú ý đến từng chi tiết, tay nghề chất lượng và tình yêu dành cho thời trang.
        </p>
        <div className="relative h-80 w-full rounded-lg overflow-hidden my-8">
            <img src="https://picsum.photos/seed/about/1000/400" alt="Đội ngũ của chúng tôi" className="w-full h-full object-cover"/>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 pt-4">Giá trị của chúng tôi</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Chất lượng:</strong> Chúng tôi không bao giờ thỏa hiệp về chất lượng vật liệu và tay nghề.</li>
          <li><strong>Bền vững:</strong> Chúng tôi cam kết giảm tác động môi trường thông qua việc tìm nguồn cung ứng và thực hành có trách nhiệm.</li>
          <li><strong>Lấy khách hàng làm trung tâm:</strong> Sự hài lòng của bạn là ưu tiên hàng đầu của chúng tôi. Chúng tôi cố gắng cung cấp một trải nghiệm mua sắm đặc biệt.</li>
          <li><strong>Hòa nhập:</strong> Chúng tôi tôn vinh sự đa dạng và mong muốn cung cấp các phong cách phục vụ cho tất cả mọi người.</li>
        </ul>
        <p>
          Cảm ơn bạn đã đồng hành cùng chúng tôi trên hành trình này. Chúng tôi rất vui được giúp bạn xây dựng một tủ quần áo mà bạn yêu thích.
        </p>
      </div>
    </div>
  );
};

export default About;