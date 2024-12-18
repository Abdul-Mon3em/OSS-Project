import React, { useState, useEffect } from "react";

function AdditionPanners() {
  // State for the countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Function to calculate the time difference
  const calculateTimeLeft = (endDate) => {
    const difference = endDate - new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  useEffect(() => {
    const targetDate = new Date(); // Example: Set target to 2 days from now
    targetDate.setDate(targetDate.getDate() + 2);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const banners = [
    {
      img: "./public/icons/Rectangle 54.png",
      title: "Sale of the Month",
      subtitle: "Best Deals",
      offer: `Up to 48% OFF`,
      countdown: `${timeLeft.days} DAYS : ${timeLeft.hours} HOURS : ${timeLeft.minutes} MINS : ${timeLeft.seconds} SECS`,
    },
    {
      img: "./public/icons/Rectangle 54 (2).png",
      title: "Low-Fat Meat",
      subtitle: "85% FAT FREE",
      price: "Started at $79.99",
    },
    {
      img: "./public/icons/Rectangle 54 (1).png",
      title: "100% Fresh Fruit",
      subtitle: "Summer Sale",
      offer: "Up to 64% OFF",
    },
  ];

  return (
    <div className="flex gap-5 justify-center mb-20">
      {banners.map((banner, index) => (
        <div key={index} className="relative w-[300px] h-[400px]">
          <img
            src={banner.img}
            alt={banner.title}
            className="w-full h-full object-cover rounded-lg"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white rounded-lg p-4">
            <h3 className="text-lg font-bold">{banner.subtitle}</h3>
            <h2 className="text-2xl font-extrabold mt-2">{banner.title}</h2>
            {banner.countdown && (
              <p className="text-sm mt-2 font-medium">{banner.countdown}</p>
            )}
            {banner.offer && (
              <p className="text-lg mt-2 font-semibold">{banner.offer}</p>
            )}
            {banner.price && (
              <p className="text-lg mt-2 font-semibold">{banner.price}</p>
            )}
            <button className="mt-4 px-6 py-2 bg-[#4472C4] text-white rounded-lg hover:bg-[#4472a4]">
              Shop Now →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdditionPanners;
