import { useContext, useEffect, useState } from "react";
import productContext from "../contexts/ProductContext.jsx";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import BannerFooter from "../components/BannerFooter";
import userContext from "../contexts/UserContext.jsx";
import { addCart, addToWishlist, productDetails } from "../logics.js";
import Nav from "../components/Nav.jsx";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Footer from "../components/Footer.jsx";
import filter from "../images/filter 05.png";
import { FaAngleDown } from "react-icons/fa6";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { BsFillGridFill } from "react-icons/bs";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import Loader from "../components/Loader.jsx";
import axios from "axios";

const Shop = () => {
  let {
    allProducts,
    setProducts,
    addToCart,
    setAddToCart,
    wishlist,
    setWishlist,
    setProductDetail,
    loading,
    setLoading,
  } = useContext(productContext);

  const { search, setImage, setSearch, setCount } = useContext(userContext);
  let { checkbox, setCheckbox } = useContext(userContext);
  const [open, setOpen] = useState(false);
  const handleAddToCart = (pid) => {
    addCart(addToCart, setAddToCart, setCount, pid);
  };

  const handleAddToWishlist = (pid) => {
    addToWishlist(wishlist, setWishlist, allProducts, setProducts, pid);
  };

  const handleProduct = (id) => {
    productDetails(setProductDetail, id);
  };

  const col_span_3 = "col-span-3";
  const color = "lightgray";

  const categories = [
    {
      name: "All",
    },
    // {
    //   name: "Smartphones",
    // },
    // {
    //   name: "Laptops",
    // },
    // {
    //   name: "Fragrances",
    // },
    // {
    //   name: "Skincare",
    // },
    // {
    //   name: "Groceries",
    // },
    // {
    //   name: "Home-decoration",
    // },
    {
      name: "Men's clothing",
    },
    {
      name: "Jewelery",
    },
    {
      name: "Electronics",
    },
    {
      name: "Women's clothing",
    },
  ];

  const priceList = [
    {
      id: 0,
      title: "All price",
    },
    {
      id: 1,
      title: "0.00 - 99.99",
    },
    {
      id: 2,
      title: "100.00 - 199.99",
    },

    {
      id: 3,
      title: "200.00 - 299.99",
    },
    {
      id: 4,
      title: "300.00 - 399.99",
    },
    {
      id: 5,
      title: "400.00+",
    },
  ];

  const handleInput = (id, amount) => {
    setCheckbox((checkbox = { id, price: amount }));
  };

  useEffect(() => {
    setLoading(true);
    const cancelToken = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/products?search=${search}&price=${checkbox?.price}`,
          {
            withCredentials: true,
            cancelToken: cancelToken.token,
          }
        );

        if (data) {
          setProducts(data);
          setLoading(false);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("request is cancelled");
        }
        console.log(error);
      }
    };

    const getImage = localStorage.getItem("image");
    setImage(getImage);

    fetchData();
    return () => {
      cancelToken.cancel();
    };
  }, [search, checkbox, setImage, setLoading, setProducts]);

  return (
    <div className="w-full h-auto">
      <div className="w-full h-auto">
        <Nav />
      </div>
      <div className="w-full h-auto px-4 xl:px-10 mt-2">
        <Hero />
      </div>
      <div className="w-full h-full flex gap-2 lg:gap-5 mt-5 px-4 xl:px-10">
        <div
          className={
            open
              ? "w-[262px] h-full -ml-[270px] lg:-ml-[284px] hidden transition-all ease-in-out duration-300"
              : "w-[262px] h-full ml-0 hidden sm:block transition-all ease-in-out duration-300"
          }
        >
          <button
            className="w-fit h-fit text-lg font-semibold flex items-center gap-3 mb-5"
            onClick={() => setOpen((prev) => !prev)}
          >
            <img src={filter || ""} width={23} height={8} alt="img" />
            Filter
          </button>
          <span className="w-fit h-fit text-base font-semibold">
            CATEGORIES
          </span>
          <ul className="w-full h-fit felx flex-col mt-5 mb-8">
            {categories?.map((item, index) => (
              <li
                className={
                  search.toLowerCase() === item?.name.toLowerCase()
                    ? "w-fit h-auto text-base font-medium text-black border-b border-black cursor-pointer mt-1 pb-1"
                    : "w-fit h-auto text-base text-gray-700 hover:text-black cursor-pointer mt-1 pb-1"
                }
                key={index}
                onClick={() => setSearch(item?.name)}
              >
                {item?.name}
              </li>
            ))}
          </ul>
          <span className="w-fit h-fit text-base font-semibold">PRICE</span>
          <ul className="w-full h-fit felx flex-col mt-5">
            {priceList?.map((item, index) => (
              <li
                className="w-full h-fit flex justify-between items-center mt-2"
                key={index}
              >
                <span className="text-base text-gray-800">₹{item?.title}</span>
                <input
                  type="checkbox"
                  name="checkbox"
                  value={item?.title}
                  checked={checkbox?.id === index}
                  onChange={(e) => handleInput(item?.id, e.target.value)}
                  className="w-5 h-5"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full h-auto flex flex-col gap-0 sm:gap-6 items-center justify-start">
          <div className="w-full h-fit flex flex-wrap items-end justify-between">
            <div
              className={
                open
                  ? "w-full md:w-fit h-fit flex flex-wrap gap-10 visible"
                  : "w-full md:w-fit h-fit flex flex-wrap gap-10 visible md:invisible"
              }
            >
              <div className="w-full md:w-auto h-auto flex flex-col gap-3">
                <span className="w-full md:w-fit h-fit text-base text-gray-400 font-semibold">
                  CATEGORIES
                </span>
                <div className="w-full md:w-auto h-auto relative group">
                  <div className="w-full md:w-[200px] h-[40px] cursor-pointer border border-black rounded-md flex items-center justify-between px-3">
                    <span className="w-fit h-fit text-lg">{search}</span>
                    <span className="w-fit h-fit group-hover:rotate-180">
                      <FaAngleDown size={15} color="black" />
                    </span>
                  </div>
                  <ul className="w-full h-auto flex flex-col bg-gray-50 border absolute top-[42px] z-50 invisible group-hover:visible">
                    {categories?.map((item, index) => (
                      <li
                        className={
                          search.toLowerCase() === item?.name.toLowerCase()
                            ? "w-full h-fit py-1 px-3 bg-gray-100 font-medium cursor-pointer text-gray-900"
                            : "w-full h-fit bg-white py-1 px-3 hover:bg-gray-100 cursor-pointer text-gray-600 hover:text-gray-900"
                        }
                        key={index}
                        onClick={() => setSearch(item?.name)}
                      >
                        {item?.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-full md:w-auto h-auto flex flex-col gap-3">
                <span className="w-fit h-fit text-base text-gray-400 font-semibold">
                  PRICE
                </span>
                <div className="w-full md:w-auto h-auto relative group">
                  <div className="w-full md:w-[200px] h-[40px] cursor-pointer border border-black rounded-md flex items-center justify-between px-3">
                    <span className="w-fit h-fit text-lg">
                      {checkbox?.price}
                    </span>
                    <span className="w-fit h-fit group-hover:rotate-180">
                      <FaAngleDown size={15} color="black" />
                    </span>
                  </div>
                  <ul className="w-full h-auto flex flex-col rounded-br-md rounded-bl-md bg-gray-50 border absolute top-[42px] z-50 invisible group-hover:visible">
                    {priceList?.map((item, index) => (
                      <li
                        className={
                          checkbox?.price === item?.title
                            ? "w-full h-fit py-1 px-3 bg-gray-100 font-medium cursor-pointer text-gray-900"
                            : "w-full h-fit bg-white py-1 px-3 hover:bg-gray-100 cursor-pointer text-gray-600 hover:text-gray-900"
                        }
                        key={index}
                        onClick={() => handleInput(item?.id, item?.title)}
                      >
                        {item?.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-fit h-auto flex items-center invisible sm:visible">
              <button
                className={
                  !open
                    ? "w-auto h-auto border p-[6px] bg-gray-50"
                    : "w-auto h-auto border p-[6px] hover:bg-gray-50"
                }
                onClick={() => setOpen((prev) => !prev)}
              >
                <BsFillGrid3X3GapFill
                  size={22}
                  color={!open ? "black" : "lightgray"}
                />
              </button>
              <button
                className={
                  open
                    ? "w-auto h-auto border p-[6px] bg-gray-50"
                    : "w-auto h-auto border p-[6px] hover:bg-gray-50"
                }
                onClick={() => setOpen((prev) => !prev)}
              >
                <BsFillGridFill
                  size={22}
                  color={open ? "black" : "lightgray"}
                />
              </button>
              <button
                className="w-auto h-auto border p-1 hover:bg-gray-50"
                // onClick={() => setGrid((prev) => !prev)}
              >
                <ViewAgendaIcon className="w-[20px] h-[20px] rotate-90 text-gray-300" />
              </button>
              <button className="w-auto h-auto border p-1 hover:bg-gray-50">
                <ViewAgendaIcon className="w-[20px] h-[20px] text-gray-300" />
              </button>
            </div>
          </div>
          {loading ? (
            <Loader col_span_3={col_span_3} color={color} />
          ) : (
            <div
              className={
                open
                  ? "w-full h-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-5 transition-all ease-in-out duration-300"
                  : "w-full h-auto grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5 transition-all ease-in-out duration-300"
              }
            >
              {allProducts?.length === 0 ? (
                <div className="w-full h-screen flex items-center text-center mx-auto justify-evenly">
                  <h1 className="w-fit h-fit text-3xl">no product found.</h1>
                </div>
              ) : (
                allProducts?.map((items, index) => (
                  <div
                    key={index}
                    className="xl:h-[433px] 2xl:h-[400px] h-auto pb-1 xl:w-[262px] w-[152px] flex mx-auto flex-col mb-5 gap-5 cursor-pointer group relative shadow hover:shadow-lg hover:scale-105 transition-all ease-in-out duration-300"
                  >
                    {items?.bestSeller && (
                      <>
                        <span className="w-fit h-fit px-2 pb-[1.50px] bg-white text-black text-sm rounded absolute top-3 left-3 z-20 font-semibold">
                          NEW
                        </span>
                        <span className="w-fit h-fit px-2 pb-[1.50px] bg-[#38CB89] text-white text-sm rounded absolute top-10 left-3 z-20 font-semibold">
                          "-50%"
                        </span>
                      </>
                    )}
                    <div className="absolute sm:top-3 right-2 top-2 w-fit h-fit cursor-pointer z-40 flex justify-center items-center">
                      <FavoriteIcon
                        className={
                          items?.like
                            ? "text-red-500"
                            : "text-gray-200 hover:text-red-500"
                        }
                        onClick={() => handleAddToWishlist(items?.id)}
                      />
                    </div>
                    <Link
                      to={`/product/${items?.id}`}
                      onClick={() => handleProduct(items?.id)}
                      className="xl:w-[262px] w-[152px] xl:h-[349px] h-[203px] relative flex items-center justify-center"
                    >
                      <img
                        // className="sm:w-[262px] w-[231px] sm:h-[349px] h-[308px] shrink-0"
                        className="w-[150px] xl:w-[180px] h-[150px] xl:h-[180px] shrink-0"
                        src={items?.image || ""}
                        alt="img"
                      />
                      <div className="w-full h-fit z-50 absolute px-2 -bottom-4 lg:-bottom-7 visible lg:invisible transition-all ease-in-out delay-100 duration-300g lg:group-hover:visible lg:group-hover:bottom-0">
                        <button
                          className="w-full h-fit py-2 bg-black text-white text-base rounded-md"
                          onClick={() => handleAddToCart(items?.id)}
                        >
                          Add to cart
                        </button>
                      </div>
                    </Link>
                    <div className="w-full xl:w-[262px] h-auto flex flex-col gap-2 sm:gap-1 px-0 xl:px-2">
                      <div className="flex gap-[3px]">
                        <FaStar size={15} color="orange" />
                        <FaStar size={15} color="orange" />
                        <FaStar size={15} color="orange" />
                        <FaStar size={15} color="lightgray" />
                        <FaStar size={15} color="lightgray" />
                      </div>
                      <span className="w-auto h-auto font-semibold">
                        {items?.title}
                      </span>
                      <span className="font-semibold">
                        ₹{items?.price}
                        <span className="text-gray-500 ml-3 line-through opacity-60">
                          ₹{"400.00"}
                        </span>
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      <BannerFooter />
      <Footer />
    </div>
  );
};

export default Shop;
