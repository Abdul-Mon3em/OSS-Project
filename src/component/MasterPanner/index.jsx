import React from "react";
import { Link } from "react-router-dom";

function MasterPanner() {
  return (
    <div className="flex justify-between items-center  px-10 py-8 rounded-lg shadow-lg w-full">
      {/* Text Content */}
      <div className="max-w-md">
        <p className="text-sm text-[#4472C4] font-bold">WELCOME TO SHOPERY</p>
        <h1 className="text-4xl font-extrabold text-gray-900 leading-snug">
          Fresh & Healthy <br /> Organic Food
        </h1>
        <p className="mt-4 text-lg text-[#4472C4]">
          Sale up to <span className="text-[#4472C4] font-bold">30% OFF</span>
        </p>
        <p className="mt-2 text-sm text-gray-500 mb-5">
          Free shipping on all your order. we deliver, you enjoy
        </p>
        <Link
          to={"/allproduct"}
          className="mt-6 px-6 py-3 bg-[#4472C4] text-white text-sm font-medium rounded-lg shadow hover:bg-[#4472a1] transition"
        >
          Shop now →
        </Link>
      </div>
      {/* Image */}
      <div className="w-1/2">
        <img
          src="./public/icons/fruits.png"
          alt="Fresh Organic Food"
          className="rounded-lg "
        />
      </div>
    </div>
  );
}

export default MasterPanner;
