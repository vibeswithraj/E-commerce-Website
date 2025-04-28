import { useContext } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import adminContext from "../contexts/AdminProvider.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AdminNav = () => {
  const { catName, setCatName, open, setOpen, asideOpen, setAsideOpen } =
    useContext(adminContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/logout`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.error) return toast.error(data.error);
      if (data.message) {
        toast.success(data.message);
        navigate("/signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      className={
        asideOpen
          ? "w-full h-[70px] flex justify-between md:pr-10 pr-3 items-center bg-[#FAFAFA] z-30 transition-all ease-linear duration-300"
          : "w-full h-[70px] flex justify-between md:pr-10 pr-3 items-center bg-[#FAFAFA] z-30"
      }
    >
      <div
        className={
          asideOpen
            ? "w-fit h-auto flex items-center gap-3 ml-3 visible"
            : "w-fit h-auto flex items-center gap-3 ml-3 invisible"
        }
      >
        <FiMenu
          size={25}
          onClick={() => setAsideOpen((prev) => !prev)}
          className="cursor-pointer"
        />
        <p className="font-medium text-2xl hidden md:block">3legant</p>
      </div>
      <div className="flex md:gap-8 gap-3 items-center w-auto h-fit relative">
        <div className="w-auto max-w-[275px] h-9 flex justify-between items-center px-2 border-[1.5px] outline-none border-gray-400 rounded-full">
          <input
            type="text"
            placeholder="Search products"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            className={
              "text-base w-full h-5 pl-1 bg-transparent outline-none border-none"
            }
          />
          <IoIosSearch size={28} className="cursor-pointer" />
        </div>
        <div
          className={
            !open
              ? "absolute top-[60px] right-0 w-[233px] h-[152px] visible rounded-lg bg-[#FAFAFA] float-right z-20 mt-2 flex flex-col opacity-100 justify-around p-2 transition-all ease-in duration-300"
              : "absolute top[60px] right-0 w-[233px] h-[152px] invisible rounded-lg bg-[#FAFAFA] float-right -mt-[30px] opacity-0 flex flex-col justify-around p-2"
          }
        >
          <p className="w-full h-fit px-2 text-lg font-semibold text-black">
            Admin
          </p>
          <div className="flex justify-between items-center w-full h-[40px] hover:bg-gray-200 cursor-pointer px-2 rounded-md">
            <p className="text-sm font-normal text-black uppercase">
              Change password
            </p>
            <IoIosArrowForward />
          </div>
          <div
            onClick={handleLogout}
            className="flex justify-between items-center w-full h-[40px] hover:bg-gray-200 cursor-pointer px-2 rounded-md"
          >
            <p className="text-sm font-normal text-black uppercase">Login</p>
            <IoExitOutline />
          </div>
        </div>
        <button
          className="w-[100px] h-[40px] text-sm font-semibold uppercase shrink-0 flex justify-center items-center rounded-xl border-[1px] gap-2 bg-black text-white border-black"
          onClick={() => setOpen((prev) => !prev)}
        >
          Admin
          <IoIosArrowDown size={16} className={!open ? "rotate-180" : ""} />
        </button>
      </div>
    </nav>
  );
};

export default AdminNav;
