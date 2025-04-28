import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { useRef } from "react";
import userContext from "../contexts/UserContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const { user } = useContext(userContext);
  const refImg = useRef(null);
  const [image, setImage] = useState(null);

  const AccLinks = useMemo(() => {
    return [
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
  }, []);

  const handleImage = () => {
    refImg.current.click();
  };

  const handleOnChange = (event) => {
    event.preventDefault();
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = async () => {
      console.log(reader.result);
      setImage(reader.result);

      const { data } = await axios.post(
        "http://localhost:6060/profileImage",
        { image: reader.result },
        { withCredentials: true }
      );

      console.log(data);
      if (data.success) {
        toast.success(data.success);
      }
      if (data.error) {
        toast.error(data.error);
      }
    };
    reader.onerror = (err) => {
      console.log("error img ", err);
    };
  };

  return (
    <>
      <div className="sm:w-[262px] w-full m-auto h-[498px] border bg-gray-100 rounded-lg flex justify-center items-center flex-col gap-10">
        <div
          className="w-[131px] h-[120px] relative flex flex-col gap-2 justify-center items-center"
          onClick={handleImage}
        >
          <img
            src={image || user?.image}
            alt=""
            width={82}
            height={82}
            className={`rounded-full text-2xl text-inherit border border-black w-[82px] h-[82px] outline-none object-fill`}
          />
          <input
            type="file"
            ref={refImg}
            onChange={handleOnChange}
            accept="image/*"
            name="profileImg"
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
