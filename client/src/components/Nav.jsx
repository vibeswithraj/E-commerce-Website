import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { BsHandbag } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import userContext from "../contexts/UserContext.jsx";
import { RxCross2 } from "react-icons/rx";
import { FiMenu } from "react-icons/fi";
import productContext from "../contexts/ProductContext.jsx";

const Nav = () => {
  const navLinks = [
    { id: 1, name: "Home", path: "/home" },
    { id: 2, name: "Shop", path: "/shop" },
    { id: 3, name: "Blog", path: "/blog" },
    { id: 4, name: "Contact Us", path: "/contact us" },
  ];
  const featuresLinks = [
    {
      id: 1,
      icon: <HiOutlineUserCircle size={24} />,
      path: "/accountdetail/account",
    },
    { id: 2, icon: <BsHandbag size={24} />, path: "/addtocart" },
  ];

  const { search, setSearch, count } = useContext(userContext);
  const { addToCart } = useContext(productContext);
  const [change, setChange] = useState(false);

  const handleSearch = () => {
    const search = document.getElementById("search");
    search.classList.toggle("search");
  };
  const handleBurger = () => {
    const burger = document.getElementById("burger");
    burger.classList.toggle("burger");
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const wh = window.scrollY;
      if (wh >= 60) {
        setChange(true);
      } else {
        setChange(false);
      }
    });
  }, []);

  return (
    <div
      className={
        change
          ? "sm:px-40 md:px-10 px-8 relative z-50 top-0 left-0 flex justify-center w-full items-center bg-white sticky-nav"
          : "sm:px-40 md:px-10 px-8 relative z-50 top-0 left-0 flex justify-center w-full items-center bg-white transition-all duration-300"
      }
      id="nav"
    >
      <div className="w-full h-[60px] flex justify-between items-center">
        <div className="flex gap-3 justify-center items-center">
          <div onClick={() => handleBurger()} className="showMenu">
            <FiMenu size={26} />
          </div>
          <div className="font-medium text-2xl">3legant</div>
        </div>
        <div className="flex gap-10">
          {navLinks?.map((item) => (
            <ul className="hidden md:block" key={item?.id}>
              <li>
                <NavLink
                  className={(navClass) =>
                    navClass.isActive
                      ? "text-sm font-medium text-black"
                      : "text-sm font-medium text-[#6C7275] hover:text-black duration-300"
                  }
                  to={item?.path}
                >
                  {item?.name}
                </NavLink>
              </li>
            </ul>
          ))}
        </div>
        <div className="flex gap-4 relative">
          <FiSearch
            size={24}
            className="cursor-pointer text-slate-500 hover:text-black duration-300 search-icon"
            onClick={handleSearch}
          />
          {featuresLinks?.map((item) => (
            <NavLink
              key={item?.id}
              to={item?.path}
              className={(navClass) =>
                navClass.isActive
                  ? "text-black cursor-pointer hover:text-black duration-300"
                  : "text-slate-500 cursor-pointer hover:text-black duration-300"
              }
            >
              {item?.icon}
            </NavLink>
          ))}
          {count || addToCart.length ? (
            <div className="w-5 h-5 absolute cursor-pointer -right-2 bottom-2 rounded-full flex justify-center items-center bg-black text-white text-xs font-bold">
              {count || addToCart.length}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className="sm:w-[450px] w-[300px] absolute m-auto z-40 flex justify-between px-2 items-center transition duration-300 rounded h-10 border-gray-400 border-2 bg-white"
        id="search"
      >
        <input
          type="text"
          name="search"
          value={search}
          placeholder="search"
          className="w-full h-9 text-lg mx-2 mb-[1.5px] flex justify-center items-center outline-none border-none bg-none"
          onChange={(e) => setSearch(e.target.value)}
        />
        <RxCross2
          size={24}
          className="cursor-pointer text-slate-500 hover:text-black duration-300 search-icon"
          onClick={handleSearch}
        />
      </div>
      <div
        id="burger"
        className="menu flex flex-col justify-center items-center w-[300px] h-screen top-0 -left-[300px] duration-300 z-50 bg-slate-900 absolute"
      >
        <div
          onClick={() => handleBurger()}
          className="cursor-pointer absolute top-4 right-4"
        >
          <RxCross2
            size={35}
            className="cursor-pointer text-slate-500 float-right hover:text-black duration-300 search-icon"
          />
        </div>
        <div className="flex w-full flex-col gap-8">
          {navLinks?.map((item) => (
            <ul
              className="flex items-center flex-col m-auto w-full text-center gap-2"
              key={item?.id}
            >
              <li className="w-[250px] h-10 bg-white">
                <NavLink
                  className={(navClass) =>
                    navClass.isActive
                      ? "text-2xl font-medium text-slate-600"
                      : "text-2xl font-medium text-slate-600 hover:text-slate-500 duration-300"
                  }
                  to={item?.path}
                >
                  {item?.name}
                </NavLink>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Nav;
