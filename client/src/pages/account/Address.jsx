import React from "react";
import Profile from "../../components/Profile";

const Address = () => {
  return (
    <div className="mt-10 w-full sm:px-40 md:px-20 px-8 m-auto">
      <p className="text-[54px] font-medium text-center my-20">My Account</p>
      <div className="flex w-full flex-col justify-evenly sm:flex-row gap-10 mb-20">
        <div>
          <Profile />
        </div>
        <div className="sm:w-[707px] w-full">address</div>
      </div>
    </div>
  );
};

export default Address;
