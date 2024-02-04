import React from 'react'
import banner from '../images/Image Placeholder.png';
import { MdOutlineEmail } from "react-icons/md";

const BannerFooter = () => {
  return (
    <div className="w-full h-[360px] relative mt-[100px] flex justify-center items-center">
      <img src={banner} className='w-full h-[360px]' alt="" />
      <div className="absolute flex flex-col justify-center items-center sm:w-[540px] px-4 sm:px-0 w-full">
        <p className='text-[40px] font-medium text-[#141718] text-center'>Join Our Newsletter</p>
        <p className='text-lg font-normal mb-8 text-center'>Sign up for deals, new products and promotions</p>
        <div className='flex justify-center items-center gap-2 border-b-[1px] border-[#6C7275] w-full'>
            <MdOutlineEmail size={24}/>
            <input type="email" name='email' placeholder='Email address' className='text-base font-medium text-[#6C7275] w-full h-[36px] bg-transparent outline-none border-none' />
            <button className='text-base font-medium text-[#6C7275] hover:text-black'>Signup</button>
        </div>
      </div>
    </div>
  )
}

export default BannerFooter
