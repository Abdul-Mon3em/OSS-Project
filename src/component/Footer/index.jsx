import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* Top Section */}
      <div className="bg-gray-50 text-gray-900 py-6 px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="../public/component/plant 1.svg" alt="" className=" h-6" />
          <span className="text-lg font-bold">Smart Label</span>
        </div>
        {/* Newsletter */}
        <div className="flex items-center space-x-4">
          <p>Subscribe our Newsletter</p>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 outline-none"
            />
            <button className="bg-[#4472C4] text-white px-6 py-2 hover:bg-[#4472a4">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="py-10 px-8 grid grid-cols-2 md:grid-cols-5 gap-6">
        {/* About */}
        <div>
          <h3 className="text-white font-bold mb-4">About Shopery</h3>
          <p className="text-sm">
            Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis
            dui, eget bibendum magna congue nec.
          </p>
          <div className="mt-4">
            <p>(219) 555-0114</p>
            <p>or</p>
            <p className="text-green-600">Prony@gmail.com</p>
          </div>
        </div>
        {/* My Account */}
        <div>
          <h3 className="text-white font-bold mb-4">My Account</h3>
          <ul className="space-y-2">
            <li>My Account</li>
            <li>Order History</li>
            <li>Shopping Cart</li>
            <li>Wishlist</li>
            <li>Settings</li>
          </ul>
        </div>
        {/* Helps */}
        <div>
          <h3 className="text-white font-bold mb-4">Helps</h3>
          <ul className="space-y-2">
            <li>Contact</li>
            <li>FAQs</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        {/* Proxy */}
        <div>
          <h3 className="text-white font-bold mb-4">Proxy</h3>
          <ul className="space-y-2">
            <li>About</li>
            <li>Shop</li>
            <li>Product</li>
            <li>Product Details</li>
            <li>Track Order</li>
          </ul>
        </div>
        {/* Mobile App */}
        <div>
          <h3 className="text-white font-bold mb-4">Download our Mobile App</h3>
          <div className="space-y-2">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center">
              <img
                src="../public/component/Apple.png"
                alt=""
                className=" m-2 h-6"
              />
              App Store
            </button>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center">
              <img
                src="../public/component/Group.png"
                className=" m-2 h-6"
                alt=""
              />
              Google Play
            </button>
            <img
              src="D:\\Sites\\site14391\\wwwroot\\wwwroot\\images\\project expectaion.png"
              alt=""
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 py-6 px-8 flex justify-between items-center">
        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="text-green-600 hover:text-white">
            <img src="../public/component/Social Media.png" alt="" />
          </a>
          <a href="#" className="text-green-600 hover:text-white">
            <img src="../public/component/Social Media (1).png" alt="" />
          </a>
          <a href="#" className="text-green-600 hover:text-white">
            <img src="../public/component/Social Media (2).png" alt="" />
          </a>
          <a href="#" className="text-green-600 hover:text-white">
            <img src="../public/component/Social Media (3).png" alt="" />
          </a>
        </div>
        {/* Copyright */}
        <p className="text-sm">
          &copy; Ecobazar eCommerce 2021, All Rights Reserved
        </p>
        {/* Payment Methods */}
        <div className="flex space-x-4">
          <img src="../public/component/Payment Method.png" alt="" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
