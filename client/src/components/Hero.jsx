import React from "react";
import banner from "../images/Image Placeholder header.png";

const Hero = () => {
  return (
      <div className="relative flex justify-center items-center w-full img">
        <img src={banner} className="w-full h-[392px] object-cover" alt="" />
        <div className="absolute flex flex-col gap-3 text-center px-2">
          <p className="text-[#605F5F]">Home {">"} Shop</p>
          <p className="sm:text-[54px] text-[27px] font-medium">Shop page</p>
          <p className="sm:text-xl text-lg font-normal text-center md:text-start">Let’s design the place you always imagined.</p>
        </div>
      </div>
  );
};

export default Hero;
