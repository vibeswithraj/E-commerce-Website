import { useContext } from "react";
import productContext from "../contexts/ProductContext.jsx";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Hero from "../components/Hero";
import BannerFooter from "../components/BannerFooter";
import userContext from "../contexts/UserContext.jsx";
import { FaPlus } from "react-icons/fa6";
import { addCart, addToWishlist } from "../logics.js";
import Loader from "../components/Loader.jsx";

const Shop = () => {
  let {
    allProducts,
    setProduct,
    addToCart,
    setAddToCart,
    wishlist,
    setWishlist,
  } = useContext(productContext);
  const { search, setCount,loading } = useContext(userContext);

  const handleAddToCart = (pid) => {
    addCart(addToCart, setAddToCart, setCount, pid);
  };
  const handleAddToWishlist = (pid) => {
    addToWishlist(wishlist, setWishlist, pid);
  };

  const handleProduct = async (id) => {
    try {
      const find = await allProducts.find((i) => i.id === id);
      if (find) {
        setProduct(find);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const w_full = "col-span-3";
  return (
    <>
      <Hero />
      <div className="mt-10 w-full lg:px-0 md:px-20 sm:px-4 px-1 m-auto h-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-14 md:gap-10 justify-center items-center">
        {loading
          ? <Loader w_full={w_full}/>
          : allProducts
              ?.filter((items) =>
                search.toLowerCase() === ""
                  ? items
                  : items.title.toLowerCase().includes(search)
              )
              .map((items) => (
                <Link
                  key={items?.id}
                  onClick={() => handleProduct(items?.id)}
                  className="lg:h-[400px] border-2 shadow md:h-[400px] px-2 h-[400px] lg:w-[350px] md:w-[270px] w-[190px] gap-2 mb-10 m-auto sm:mb-0 flex justify-evenly flex-col cursor-pointer relative" //gap-3
                >
                  <button
                    className="w-[30px] h-[30px] absolute z-20 top-2 right-2 cursor-pointe bg-black hover:bg-slate-700 rounded text-white flex justify-center items-center"
                    onClick={() => handleAddToCart(items?.id)}
                  >
                    <FaPlus />
                  </button>
                  <div className="absolute sm:top-3 sm:right-3 left-2 top-2 w-[30px] cursor-pointer z-20 flex justify-center items-center">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-xl hover:text-red-500 text-slate-200 w-[25px] h-[25px]"
                      onClick={() => handleAddToWishlist(items?.id)}
                    />
                  </div>
                  <Link to={`/product`}>
                    <img
                      className="lg:w-[200px] md:w-[200px] sm:w-[180px] lg:h-[200px] md:h-[226px] h-[150px] bg-cover bg-center m-auto"
                      src={items?.image}
                      alt=""
                    />
                  </Link>
                  <div>
                    <div className="flex">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                    <p>{items?.title}</p>
                    <p className="font-semibold">${items?.price}</p>
                  </div>
                </Link>
              ))}
      </div>
      <BannerFooter />
    </>
  );
};

export default Shop;
