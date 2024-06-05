import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { SlSocialFacebook } from "react-icons/sl";
import { FiYoutube } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="w-full h-auto sm:px-[160px] px-8 py-[80px] flex justify-center items-center bg-black">
      <div className='w-full flex flex-col justify-between items-center gap-[49px]'>
        <div className="flex flex-col lg:flex-row w-full sm:justify-between justify-center items-center gap-10 sm:gap-10">
          <div className="flex flex-col sm:flex-row sm:gap-8 gap-4  text-white w-[350px] items-center">
            <p className="text-2xl font-medium">3legant.</p>
            <p className="sm:invisible md:visible m-auto">|</p>
            <p className="text-sm font-normal text-[#E8ECEF]">
              Gift & Decoration Store
            </p>
          </div>
          <div>
            <ul className="flex flex-col sm:flex-row md:flex-wrap justify-center text-center gap-10 text-white">
              <li className="text-sm font-normal hover:text-gray-200">
                <Link>Home</Link>
              </li>
              <li className="text-sm font-normal hover:text-gray-200">
                <Link>Shop</Link>
              </li>
              <li className="text-sm font-normal hover:text-gray-200">
                <Link>Product</Link>
              </li>
              <li className="text-sm font-normal hover:text-gray-200">
                <Link>Blog</Link>
              </li>
              <li className="text-sm font-normal hover:text-gray-200">
                <Link>Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row w-full justify-between items-center gap-8 sm:gap-0">
            <div className='text-white flex flex-col-reverse lg:flex-row gap-7'>
                <p className='text-xs font-normal'>Copyright © 2023 3legant. All rights reserved</p>
                <div className="flex sm:flex-row justify-between w-[200px] sm:w-auto sm:gap-7 m-auto sm:m-0">
                <p className='text-xs font-semibold cursor-pointer hover:text-gray-200'>Privacy Policy</p>
                <p className='text-xs font-semibold cursor-pointer hover:text-gray-200'>Terms of Use</p>
                </div>
            </div>
            <div className='flex gap-6 text-white'>
                <FaInstagram className='cursor-pointer hover:text-gray-300' size={24}/>
                <SlSocialFacebook className='cursor-pointer hover:text-gray-300' size={24}/>
                <FiYoutube className='cursor-pointer hover:text-gray-300' size={24}/>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
