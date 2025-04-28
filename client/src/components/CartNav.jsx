import React from "react";
import { FaCheck } from "react-icons/fa";

// #33FF42  Green color

const CartNav = ({ sc = false, cd = false, oc = false }) => {
  return (
    <div className="w-[832px] grid grid-cols-3 gap-8 mt-10 justify-center m-auto">
      <div
        className={
          sc
            ? "border-b-2 w-[256px] border-[#33FF42]"
            : "border-b-2 w-[256px] border-black"
        }
      >
        <div className="flex gap-4 cursor-pointer justify-center items-center pb-5">
          <div
            className={
              sc
                ? "rounded-full w-[40px] h-[40px] flex justify-center items-center text-white bg-[#33FF42]"
                : "rounded-full w-[40px] h-[40px] flex justify-center items-center text-white bg-black"
            }
          >
            {sc ? <FaCheck size={20} /> : "1"}
          </div>
          <div
            className={
              sc
                ? "text-base font-semibold text-[#33FF42]"
                : "text-base font-semibold text-black"
            }
          >
            <div>Shoppingcart</div>
          </div>
        </div>
      </div>
      <div
        className={
          cd
            ? "border-b-2 w-[256px] border-[#33FF42]"
            : "border-b-2 w-[256px] border-black"
        }
      >
        <div className="flex gap-4 cursor-pointer justify-center items-center pb-5">
          <div
            className={
              cd
                ? "rounded-full w-[40px] h-[40px] flex justify-center items-center text-white bg-[#33FF42]"
                : "rounded-full w-[40px] h-[40px] flex justify-center items-center text-white bg-black"
            }
          >
            <div className="rounded-full py-[7.5px]">
              {cd ? <FaCheck size={20} /> : "2"}
            </div>
          </div>
          <div
            className={
              cd
                ? "text-base font-semibold text-[#33FF42]"
                : "text-base font-semibold text-black"
            }
          >
            <div>Checkout details</div>
          </div>
        </div>
      </div>
      <div
        className={
          oc
            ? "border-b-2 w-[256px] border-[#33FF42]"
            : "border-b-2 w-[256px] border-black"
        }
      >
        <div className="flex gap-4 cursor-pointer justify-center items-center pb-5">
          <div
            className={
              oc
                ? "rounded-full w-[40px] h-[40px] flex justify-center items-center text-white bg-[#33FF42]"
                : "rounded-full w-[40px] h-[40px] flex justify-center items-center text-white bg-black"
            }
          >
            <div className="rounded-full py-[7.5px]">
              {oc ? <FaCheck size={20} /> : "3"}
            </div>
          </div>
          <div
            className={
              oc
                ? "text-base font-semibold text-[#33FF42]"
                : "text-base font-semibold text-black"
            }
          >
            <div>Order complete</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartNav;
