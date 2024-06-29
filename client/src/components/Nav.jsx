import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { BsHandbag } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import userContext from "../contexts/UserContext.jsx";
import { RxCross2 } from "react-icons/rx";
import { FiMenu } from "react-icons/fi";
// import { useSelector } from "react-redux";

const Nav = () => {
  const navLinks = [
    { id: 1, name: "Home", path: "/home" },
    { id: 2, name: "Shop", path: "/shop" },
    { id: 3, name: "Blog", path: "/blog" },
    { id: 4, name: "Contact Us", path: "/contactus" },
  ];
  const featuresLinks = [
    {
      id: 1,
      icon: <HiOutlineUserCircle size={24} />,
      path: "/accountdetail/account",
    },
    { id: 2, icon: <BsHandbag size={24} />, path: "/cart/addtocart" },
  ];

  const [open, setOpen] = useState(false);
  const { search, setSearch, count } = useContext(userContext);
  // const count = useSelector((state) => state.count);

  const handleSearch = () => {
    const searchBar = document.getElementById("search");
    searchBar.classList.toggle("search");
  };
  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     const wh = window.scrollY;
  //     if (wh >= 60) {
  //       setChange(true);
  //     } else {
  //       setChange(false);
  //     }
  //   });
  // }, []);

  return (
    <div
      className="relative z-50 top-0  px-4 sm:px-10 left-0 flex justify-center w-full shadow items-center bg-white transition-all duration-300"
      id="nav"
    >
      <div className="w-full h-[60px] flex justify-between items-center">
        <div className={"flex gap-3 justify-center items-center"}>
          <div
            onClick={() => setOpen((prev) => !prev)}
            className={"showMenu visible md:hidden"}
          >
            <FiMenu size={26} />
          </div>
          <div className="font-medium text-2xl">3legant</div>
        </div>
        <div className="flex gap-4">
          {navLinks?.map((item) => (
            <ul className="hidden md:block" key={item?.id}>
              <li>
                <NavLink
                  className={(navClass) =>
                    navClass.isActive
                      ? "text-base font-medium text-black border-black border-b-2 py-4 px-5 transition-all ease-in duration-75"
                      : "text-base font-medium text-[#6C7275] hover:text-black py-4 px-5 transition-all border-black border-b-2 border-hidden duration-300"
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
          {count ? (
            <div className="w-5 h-5 absolute cursor-pointer -right-2 bottom-2 rounded-full flex justify-center items-center bg-black text-white text-xs font-bold">
              {count}
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
          defaultValue={"All"}
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
        // id="burger"
        className={
          open
            ? "flex flex-col justify-center items-center px-4 w-full h-screen top-0 left-0 duration-300 z-50 bg-[rgba(0,0,0,0.2)] backdrop-blur-sm absolute"
            : "flex flex-col justify-center items-center px-4 w-full h-screen top-0 -left-[100%] duration-300 z-50 bg-[rgba(0,0,0,0.2)] backdrop-blur-sm absolute"
        }
      >
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="cursor-pointer absolute top-4 right-4"
        >
          <RxCross2
            size={35}
            className="cursor-pointer float-right text-black duration-300 search-icon"
          />
        </div>
        <ul className="flex items-center justify-center flex-col m-auto w-full text-center gap-5">
          {navLinks?.map((item) => (
            <li className="w-full max-w-[350px] py-2 rounded-lg bg-white h-fit" key={item?.id}>
              <NavLink
                className={(navClass) =>
                  navClass.isActive
                    ? "w-full h-fit text-2xl font-medium text-black"
                    : "w-full h-fit text-2xl font-medium text-gray-600 duration-300"
                }
                to={item?.path}
              >
                {item?.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
