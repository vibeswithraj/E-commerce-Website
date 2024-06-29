import React from "react";
import banner from "../images/Image placeholder shop.png";

const Hero = () => {
  return (
    <div className="relative flex justify-center items-center w-full img">
      <img
        src={banner}
        className="w-full h-[308px] lg:h-auto object-cover"
        alt=""
      />
      <div className="absolute flex flex-col text-center px-2">
        <p className="text-[#605F5F]">Home {"> "}<span className="text-black font-semibold">Shop</span></p>
        <p className="sm:text-[54px] text-[27px] mt-2 mb-8 font-medium">Shop page</p>
        <p className="sm:text-xl text-xl font-normal text-center md:text-start">
          Let’s design the place you always imagined.
        </p>
      </div>
    </div>
  );
};

export default Hero;
