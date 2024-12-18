import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

// Helper function to shuffle an array
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
};

const ImageSlider = ({ food }) => {
  // Shuffle the products randomly and slice the first 10
  const randomProducts = shuffleArray(food).slice(0, 10);

  return (
    <div className="w-full px-4 py-8">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={4}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {randomProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="flex flex-col items-center border p-4 shadow-lg rounded-lg">
              <Link to={`food/${product.id}`} className="relative">
                <img
                  src={product.imagePath}
                  alt={product.name}
                  className="w-48 h-48 object-cover"
                />
                {product.category.name && (
                  <span className="absolute top-2 right-2 bg-[#4472C4] text-white text-xs px-2 py-1 rounded">
                    {product.category.name}
                  </span>
                )}
              </Link>

              <h2 className="font-bold text-center">{product.name}</h2>
              <p className="text-[#4472C4] text-lg font-bold">
                {product.price}
              </p>
              <p className="line-through text-gray-400">
                {product.originalPrice}
              </p>
              <p className="text-[#4472C4 "> {product.discount} %</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
