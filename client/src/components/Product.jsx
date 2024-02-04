import { FaStar } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import productContext from "../contexts/ProductContext";
import hotToast from "react-hot-toast";
import { addCart, addToWishlist, dicrise, incrise } from "../logics";
import userContext from "../contexts/UserContext";

const Product = () => {
  const { product, addToCart, setAddToCart, wishlist, setWishlist } =
    useContext(productContext);
  const { count, setCount } = useContext(userContext);
  const [num, setNum] = useState(1);

  const addtocart = async (pid) => {
    addCart(addToCart, setAddToCart, setCount, pid);
  };

  const addWishlist = async (pid) => {
    addToWishlist(wishlist, setWishlist, pid);
  };

  const incri = (pid) => {
    const findP = addToCart.find((i) => i.id === pid);
    if (!findP) {
      return hotToast.error("first add to cart!");
    }
    setNum(num + 1);
    incrise(addToCart,setAddToCart,pid);
  };

  const dicri = (pid) => {
    if (num > 1) {
      setNum(num - 1);
    }
    dicrise(addToCart,setAddToCart,count,setCount,pid);
  };

  return (
    <div className="w-full mt-10 py-6 xlg:h-[986px] h-auto flex flex-wrap sm:flex-row justify-evenly lg:px-20 px-10 my-10 lg:gap-10 gap-10">
      <div className="md:w-[548px] w-[311px] h-auto flex flex-col gap-6 cursor-pointer">
        <div className="md:w-[548px] w-[548px] md:h-[729px] h-[414px]">
          <img
            src={product.image}
            className="md:w-[548px] w-[311px] md:h-[729px] h-[414px]"
            alt=""
          />
        </div>
        <div className="w-full h-[167px] flex justify-center items-center sm:gap-6 gap-2">
          <img
            src={product.image}
            className="sm:w-[167px] w-[140px] sm:h-[167px] h-[140px]"
            alt=""
          />
          <img
            src={product.image}
            className="sm:w-[167px] w-[140px] sm:h-[167px] h-[140px]"
            alt=""
          />
          <img
            src={product.image}
            className="sm:w-[167px] w-[140px] sm:h-[167px] h-[140px]"
            alt=""
          />
        </div>
      </div>
      <div className="sm:w-[508px] w-full h-auto flex items-center sm:items-start flex-col">
        <div className="sm:w-[508px] w-full flex flex-col h-auto gap-2 sm:gap-4">
          {/*h-248px*/}
          <div className="gap-[10px] flex items-center">
            <div className="flex">
              <FaStar size={16} />
              <FaStar size={16} />
              <FaStar size={16} />
              <FaStar size={16} />
              <FaStar size={16} />
            </div>
            <div>
              <p className="text-xs font-normal text-[#141718]">
                {100 || product.rating.count} Reviews
              </p>
            </div>
          </div>
          <div>
            <p className="md:text-[40px] text-[24px] font-medium text-[#141718]">
              {product.title}
            </p>
          </div>
          <div>
            <p className="text-base font-normal text-[#6C7275]">
              {product.description}
            </p>
          </div>
          <div className="gap-3 flex items-center">
            <p className="text-[28px] font-medium text-[#121212]">
              ${product.price}
            </p>
            <p className="text-xl font-medium text-[#6C7275] line-through">
              $400.00
            </p>
          </div>
        </div>
        <div className="lg:h-[200px] h-auto py-6 flex flex-col gap-6">
          <div className="flex flex-col gap-[18px]">
            <div className="w-[134px] flex flex-col gap-2">
              <p className="text-base font-semibold text-[#6C7275]">
                Choose Color<span className="ml-4">{">"}</span>
              </p>
              <p className="text-xl font-normal">Black</p>
            </div>
            <div className="flex items-center gap-4">
              <img
                src={product.image}
                className="w-[72px] h-[72px] border cursor-pointer"
                alt=""
              />
              <img
                src={product.image}
                className="w-[72px] h-[72px] border cursor-pointer"
                alt=""
              />
              <img
                src={product.image}
                className="w-[72px] h-[72px] border cursor-pointer"
                alt=""
              />
              <img
                src={product.image}
                className="w-[72px] h-[72px] border cursor-pointer"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="h-[184px] w-full flex flex-col gap-4 py-8">
          <div className="flex gap-6">
            <div className="w-[127px] h-[52px] flex justify-center items-center rounded">
              <button
                className="w-[42px] h-[52px] text-2xl outline-non rounded-l border-none bg-[#6C7275] text-white flex justify-center items-center cursor-pointer"
                onClick={() => dicri(product.id)}
              >
                -
              </button>
              <p className="text-2xl w-[42px] h-[52px] bg-white flex justify-center items-center">
                {num}
              </p>
              <button
                className="w-[42px] h-[52px] text-2xl outline-none rounded-r border-none bg-[#6C7275] text-white flex justify-center items-center cursor-pointer"
                onClick={() => incri(product.id)}
              >
                +
              </button>
            </div>
            <button
              className="text-lg font-medium text-[#141718] w-full h-[52px] group flex justify-center items-center rounded-lg border-[#141718] border-2"
              onClick={() => addWishlist(product.id)}
            >
              <span className="flex items-center mr-2">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-xl group-hover:text-red-500 transition-all duration-200 text-slate-200 w-[25px] h-[25px]"
                  //onClick={() => addToWishlist(items?.id)}
                />
              </span>
              Wishlist
            </button>
          </div>
          <button
            className="text-lg font-medium text-white w-full bg-black rounded-lg h-[52px]"
            onClick={() => addtocart(product.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
