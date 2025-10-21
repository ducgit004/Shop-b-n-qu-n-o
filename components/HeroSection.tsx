import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    title: "Bộ Sưu Tập Mùa Thu",
    subtitle: "Khám phá những món đồ ấm cúng và phong cách nhất.",
    imageUrl: "https://picsum.photos/seed/slide1/1600/800",
    link: "/products"
  },
  {
    title: "Hàng Mới Về Hàng Tuần",
    subtitle: "Luôn dẫn đầu xu hướng với những thiết kế mới nhất của chúng tôi.",
    imageUrl: "https://picsum.photos/seed/slide2/1600/800",
    link: "/products"
  },
  {
    title: "Giảm Giá Lên Tới 50%",
    subtitle: "Sở hữu những món đồ yêu thích của bạn với mức giá không thể tốt hơn.",
    imageUrl: "https://picsum.photos/seed/slide3/1600/800",
    link: "/products"
  }
];

const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative h-[50vh] md:h-[70vh] w-full rounded-lg shadow-xl overflow-hidden group">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0'}`}
        >
          <img
            className="h-full w-full object-cover"
            src={slide.imageUrl}
            alt={`Slide ${index + 1}`}
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-500">
          {slides[currentIndex].title}
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-xl text-indigo-100 sm:max-w-3xl transition-all duration-500">
          {slides[currentIndex].subtitle}
        </p>
        <div className="mt-10">
          <Link
            to={slides[currentIndex].link}
            className="flex items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-primary shadow-sm hover:bg-indigo-50"
          >
            Mua Ngay
          </Link>
        </div>
      </div>
      
      {/* Navigation Arrows */}
       <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute top-1/2 left-4 z-30 -translate-y-1/2 p-2 bg-white/30 rounded-full hover:bg-white/50 transition opacity-0 group-hover:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute top-1/2 right-4 z-30 -translate-y-1/2 p-2 bg-white/30 rounded-full hover:bg-white/50 transition opacity-0 group-hover:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2 flex space-x-2">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            aria-label={`Go to slide ${slideIndex + 1}`}
            className={`h-3 w-3 rounded-full transition-colors ${currentIndex === slideIndex ? 'bg-white' : 'bg-white/50 hover:bg-white'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;