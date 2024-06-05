import React, { useContext } from "react";
import Profile from "../../components/Profile";
import { BiEditAlt } from "react-icons/bi";
import userContext from "../../contexts/UserContext";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

const Address = () => {
  const { user } = useContext(userContext);
  return (
    <>
      <Nav />
      <div className="mt-10 w-full sm:px-40 md:px-20 px-8 m-auto">
        <p className="text-[54px] font-medium text-center my-20">My Account</p>
        <div className="flex w-full flex-col justify-evenly sm:flex-row gap-10 mb-20">
          <div>
            <Profile />
          </div>
          <div className="sm:w-[707px] w-full">
            <div className="w-[350px] h-[160px] p-3 rounded-md border-[2px] outline-none shadow-sm border-gray-200">
              <div className="w-full flex justify-between">
                <p className="text-lg font-semibold">Billing Address</p>
                <button className="flex items-center">
                  <BiEditAlt className="mr-1" />
                  Edit
                </button>
              </div>
              <p className="w-full text-lg mt-3">
                {user?.user?.firstName + " " + user?.user?.lastName}
              </p>
              <p className="w-full text-lg mt-1">
                +91 {user?.user?.phoneNumber}
              </p>
              <p className="w-full text-lg mt-1">{user?.user?.address}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Address;
