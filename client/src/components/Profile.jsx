import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { useRef } from "react";
import userContext from "../contexts/UserContext.jsx";

const Profile = () => {

  const AccLinks = [
    {
      name: "Account",
      path: "/accountdetail/account",
    },
    {
      name: "Address",
      path: "/accountdetail/address",
    },
    {
      name: "Orders",
      path: "/accountdetail/orderhistory",
    },
    {
      name: "Wishlist",
      path: "/accountdetail/yourwishlist",
    },
    {
      name: "Log Out",
      path: "/accountdetail/logout",
    },
  ];

  const { user, image, setImage } = useContext(userContext);
  const refImg = useRef(null);

  const handleImage = () => {
    refImg.current.click();
  };
  const handleOnChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    localStorage.setItem("image", URL.createObjectURL(file));
  };

  return (
    <>
      <div className="sm:w-[262px] w-full m-auto h-[498px] border bg-gray-100 rounded-lg flex justify-center items-center flex-col gap-10">
        <div
          className="w-[131px] h-[120px] relative flex flex-col gap-2 justify-center items-center"
          onClick={handleImage}
        >
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              width={82}
              height={82}
              className="rounded-full border border-black w-[82px] h-[82px] outline-none bg-cover"
              alt=""
            />
          ) : (
            <img
              src={image}
              width={82}
              height={82}
              className="rounded-full border border-black w-[82px] h-[82px] outline-none bg-cover"
              alt=""
            />
          )}
          <input
            type="file"
            alt=""
            ref={refImg}
            onChange={handleOnChange}
            className="hidden"
          />
          <p className="text-xl text-black font-semibold">
            {user?.firstName} {user?.lastName}
          </p>
        </div>
        <div className="sm:w-[230px] w-full px-4 h-[256px]">
          <ul className="flex flex-col gap-4">
            {AccLinks.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={(navClass) =>
                  navClass.isActive
                    ? "w-full h-[42px] py-2 border-b-2 text-lg font-normal border-black"
                    : "w-full h-[42px] py-2 text-lg font-normal"
                }
              >
                <li>{item.name}</li>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Profile;
