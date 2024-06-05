import { MdOutlineDashboard } from "react-icons/md";
import { HiCollection } from "react-icons/hi";
import { FaFileAlt } from "react-icons/fa";
// import { FiArrowLeft } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import productsContext from "../contexts/ProductContext";
import { FiMenu } from "react-icons/fi";
import deatilsContext from "../contexts/DetailsContext";

const Aside = () => {
  const [open, setOpen] = useState(false);
  const { asideOpen, setAsideOpen } = useContext(deatilsContext);

  const allLinks = [
    {
      name: "dashboard",
      path: "/admin/dashboard",

      icon: <MdOutlineDashboard size={16} className="mr-1" />,
    },
    {
      name: "all products",
      path: "/admin/allproducts",
      icon: <HiCollection size={16} className="mr-1" />,
    },
    {
      name: "order list",
      path: "/admin/orderlist",
      icon: <FaFileAlt size={16} className="mr-1" />,
    },
  ];

  const categories = [
    {
      name: "all",
    },
    {
      name: "smartphones",
    },
    {
      name: "laptops",
    },
    {
      name: "fragrances",
    },
    {
      name: "skincare",
    },
    {
      name: "groceries",
    },
    {
      name: "home-decoration",
    },
    {
      name: "men's clothing",
    },
    {
      name: "jewelery",
    },
    {
      name: "electronics",
    },
    {
      name: "women's clothing",
    },
  ];

  const { setCatName } = useContext(productsContext);

  return (
    <aside
      className={
        asideOpen
          ? "w-[260px] shadow-none border-none outline-none h-auto px-4 pt-5 bg-[#FAFAFA] invisible -ml-[260px] transition-all ease-in duration-300"
          : "w-[260px] shadow-none border-none outline-none h-auto px-4 pt-5 bg-[#FAFAFA] visible transition-all ease-in duration-300"
      }
    >
      <div className="w-full flex justify-between items-center">
        <p className="text-3xl font-bold text-black">3legant</p>
        <div>
          <FiMenu
            size={25}
            onClick={() => setAsideOpen(true)}
            className="cursor-pointer mt-2"
          />
        </div>
      </div>
      <div className="mt-12">
        {allLinks.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={(path) =>
              path.isActive
                ? "w-[212px] h-[48px] shrink-0 rounded-lg text-xs font-semibold border border-black cursor-pointer pl-3 flex items-center uppercase mt-5 bg-black text-white"
                : "w-[212px] h-[48px] shrink-0 rounded-lg text-xs font-semibold border border-black cursor-pointer pl-3 flex items-center uppercase mt-5 bg-[#FAFAFA] text-black hover:bg-gray-200"
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </div>
      <div
        className="w-full mt-5 flex justify-between items-center cursor-pointer relative"
        onClick={() => setOpen((prev) => !prev)}
      >
        <p className="text-lg font-semibold text-black">Categories</p>
        <IoIosArrowDown size={18} className={open ? "rotate-180" : ""} />
        <div
          className={
            open
              ? "w-full absolute top-7 left-0 flex flex-col visible border-[1px] mt-2"
              : "w-full absolute top-7 left-0 flex flex-col invisible border-[1px] mt-2"
          }
        >
          {categories?.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setCatName(item?.name);
                //setOpen(false);
              }}
              className="w-full h-10 text-base text-left font-normal text-black bg-transparent hover:bg-gray-200 pl-2 border-b-2"
            >
              {item?.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Aside;
