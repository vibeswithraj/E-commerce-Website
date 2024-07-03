import { FaStar } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import productContext from "../contexts/ProductContext";
import hotToast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addtocart,
//   addtowishlist,
//   dicrise,
//   incrise,
// } from "../contexts/productSlice";
import { FiArrowLeft } from "react-icons/fi";
import { addCart, addToWishlist, dicrise, incrise } from "../logics";
import userContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const {
    allProducts,
    setProduct,
    addToCart,
    setAddToCart,
    wishlist,
    setWishlist,
    productDetail,
  } = useContext(productContext);
  const { count, setCount } = useContext(userContext);
  const navigate = useNavigate();
  //const addToCart = useSelector((state) => state.addToCart);
  // const dispatch = useDispatch();
  const [num, setNum] = useState(1);

  const addcart = async (pid) => {
    // dispatch(addtocart(pid));
    addCart(addToCart, setAddToCart, setCount, pid);
  };

  const addWishlist = async (pid) => {
    // dispatch(addtowishlist(pid));
    addToWishlist(wishlist, setWishlist, allProducts, setProduct, pid);
  };

  const incri = async (pid) => {
    const findP = await addToCart.find((i) => i.id === pid);
    if (!findP) {
      return hotToast.error("first add to cart!");
    }
    setNum(num + 1);
    // dispatch(incrise(pid));
    incrise(addToCart, setAddToCart, pid);
  };

  const dicri = (pid) => {
    if (num > 1) {
      setNum(num - 1);
    }
    // dispatch(dicrise(pid));
    dicrise(addToCart, setAddToCart, count, setCount, pid);
  };

  return (
    <div className="w-full py-6 h-screen flex flex-wrap justify-evenly items-center px-10 relative">
      <div
        className="absolute top-4 left-4 cursor-pointer p-1 bg-gray-200 rounded-full"
        onClick={() => navigate("/shop")}
      >
        <FiArrowLeft size={27} />
      </div>
      <div className="w-auto h-auto flex flex-col items-center gap-12 cursor-pointer">
        <div className="w-auto h-auto flex justify-center items-center">
          <img
            src={productDetail?.image || ""}
            className="w-[300px] h-[350px]"
            width={300}
            height={350}
            alt="product img"
          />
        </div>
        <div className="w-full h-[167px] flex justify-center items-center sm:gap-6 gap-2">
          <img
            src={productDetail?.image}
            className="w-[140px] h-[140px]"
            alt="product images"
          />
          <img
            src={productDetail?.image}
            className="w-[140px] h-[140px]"
            alt="product images"
          />
          <img
            src={productDetail?.image}
            className="w-[140px] h-[140px]"
            alt="product images"
          />
        </div>
      </div>
      <div className="w-auto h-auto flex items-center sm:items-start flex-col">
        <div className="max-w-[508px] w-full flex flex-col h-auto gap-2 sm:gap-4">
          <div className="gap-[10px] flex items-center">
            <div className="flex gap-[1px]">
              <FaStar size={16} color="orange" />
              <FaStar size={16} color="orange" />
              <FaStar size={16} color="orange" />
              <FaStar size={16} color="lightgray" />
              <FaStar size={16} color="lightgray" />
            </div>
            <div>
              <p className="text-xs font-normal text-[#141718]">
                {productDetail?.rating.count || 1000} Reviews
              </p>
            </div>
          </div>
          <div>
            <p className="md:text-[40px] text-[24px] font-medium text-[#141718]">
              {productDetail?.title}
            </p>
          </div>
          <div>
            <p className="text-base md:text-lg font-normal text-[#6C7275]">
              {productDetail?.description}
            </p>
          </div>
          <div className="gap-3 flex items-center">
            <p className="text-[28px] font-medium text-[#121212]">
              ₹{productDetail?.price}
            </p>
            <p className="text-xl font-medium text-[#6C7275] line-through">
              ₹400.00
            </p>
          </div>
        </div>
        <div className="h-auto py-6 flex flex-col gap-6">
          <div className="flex flex-col gap-[18px]">
            <div className="w-[134px] flex flex-col gap-2">
              <p className="text-base font-semibold text-[#6C7275]">
                Choose Color<span className="ml-4">{">"}</span>
              </p>
              {/* <p className="text-xl font-normal">Black</p> */}
            </div>
            <div className="flex items-center gap-4">
              <div className="w-[62px] h-[62px] border cursor-pointer bg-black rounded-lg ring-2 ring-offset-4 ring-orange-300"></div>
              <div className="w-[62px] h-[62px] border cursor-pointer bg-white/10 rounded-lg hover:ring-2 ring-offset-4 ring-orange-300"></div>
              <div className="w-[62px] h-[62px] border cursor-pointer bg-orange-500 rounded-lg hover:ring-2 ring-offset-4 ring-orange-300"></div>
              <div className="w-[62px] h-[62px] border cursor-pointer bg-gray-300 rounded-lg hover:ring-2 ring-offset-4 ring-orange-300"></div>
            </div>
          </div>
        </div>
        <div className="h-[184px] w-full flex flex-col pt-4 gap-4">
          <div className="flex gap-6">
            <div className="w-[127px] h-[52px] flex justify-center items-center rounded">
              <button
                className="w-[38px] h-[38px] text-2xl outline-non rounded-l border-none bg-[#6C7275] text-white flex justify-center items-center cursor-pointer"
                onClick={() => dicri(productDetail?.id)}
              >
                -
              </button>
              <p className="text-2xl w-[42px] h-[52px] bg-white flex justify-center items-center">
                {num}
              </p>
              <button
                className="w-[38px] h-[38px] text-2xl outline-none rounded-r border-none bg-[#6C7275] text-white flex justify-center items-center cursor-pointer"
                onClick={() => incri(productDetail?.id)}
              >
                +
              </button>
            </div>
            <button
              className="text-lg font-medium bg-white text-[#141718] w-full h-[52px] group flex justify-center items-center rounded-lg border-[#141718] border-[1px]"
              onClick={() => addWishlist(productDetail?.id)}
            >
              <span className="flex items-center mr-2">
                <FontAwesomeIcon
                  icon={faHeart}
                  className={
                    productDetail?.like
                      ? "text-xl text-red-500 transition-all duration-200 w-[25px] h-[25px]"
                      : "text-xl group-hover:text-red-500 transition-all duration-200 text-slate-200 w-[25px] h-[25px]"
                  }
                />
              </span>
              Wishlist
            </button>
          </div>
          <button
            className="text-lg font-medium text-white hover:bg-[rgba(0,0,0,0.81)] w-full bg-black rounded-lg h-[52px]"
            onClick={() => addcart(productDetail?.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
