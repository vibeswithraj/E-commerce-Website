import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useContext } from "react";
import productContext from "../../contexts/ProductContext.jsx";
import deatilsContext from "../../contexts/DetailsContext.jsx";
import { delAtcp, dicrise, incrise, productDetails } from "../../logics.js";
import userContext from "../../contexts/UserContext.jsx";
import Nav from "../../components/Nav.jsx";
import Footer from "../../components/Footer.jsx";
import CartNav from "../../components/CartNav.jsx";
import axios from "axios";

const AddToCart = () => {
  const navigate = useNavigate();
  const { setProductDetail, addToCart, setAddToCart } =
    useContext(productContext);

  const { shipping, setShipping, mainSubTotal } = useContext(deatilsContext);
  const { count, setCount } = useContext(userContext);

  const incri = (pid) => {
    incrise(addToCart, setAddToCart, pid);
  };
  const dicri = (pid) => {
    dicrise(addToCart, setAddToCart, count, setCount, pid);
  };
  const delProduct = (pid) => {
    delAtcp(addToCart, setAddToCart, setCount, pid);
  };

  const handleNavLinks = () => {
    navigate("/cart/checkoutdetails");
  };

  const handleProduct = async (id) => {
    productDetails(setProductDetail, id);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/atcpro`, { withCredentials: true })
      .then((res) => setAddToCart(res.data.addtocart))
      .catch((err) => console.log(err));
  }, [setAddToCart]);

  return (
    <div className="w-full h-full flex flex-col justify-evenly">
      <div className="w-full h-auto">
        <Nav />
      </div>
      <div className="mt-10 h-auto w-full xl:px-20 px-4 m-auto overflow-x-hidden">
        <p className="text-[54px] font-medium text-center">Cart</p>
        <CartNav sc={false} />
        <div className="sm:h-[642px] md:h-auto h-auto m-auto w-full flex flex-wrap justify-between gap-0 py-20">
          <div className="sm:w-[642px] lg:w-[50%] max-w-5xl w-full h-full m-auto">
            <div className="w-full h-[50px] pb-6 pqps grid grid-cols-5 border-b-2 border-slate-600">
              <p className="w-auto col-span-2">Product</p>
              <p className="w-auto text-end">Quantity</p>
              <p className="w-auto text-end pr-3">Price</p>
              <p className="w-auto text-end">Subtotal</p>
            </div>
            <div
              className={
                addToCart && addToCart?.length > 0
                  ? "w-full h-auto overflow-y-scroll atcList m-auto"
                  : "w-full h-auto overflow-y-scroll atcList m-auto flex flex-col justify-center items-center"
              }
            >
              {addToCart && addToCart?.length === 0 && (
                <div className="flex justify-center items-center">
                  Cart is empty
                </div>
              )}
              {addToCart?.map((item, index) => (
                <div
                  className="w-full sm:h-[144px] md:h-[180px] grid grid-rows-2 sm:grid-cols-5 py-3"
                  key={index}
                >
                  <div className="sm:col-span-2 col-span-3 flex gap-4 w-auto">
                    <Link
                      to={`/product/${item?.id}`}
                      onClick={() => handleProduct(item?.id)}
                      className="shrink-0"
                    >
                      <img
                        className="w-20 h-24 -z-10 shrink-0 object-fill"
                        src={item?.image}
                        alt="img"
                      />
                    </Link>
                    <div className="flex items-center sm:items-start sm:flex-col flex-row gap-2 w-full">
                      <p className="text-base font-semibold">{item?.title}</p>
                      <p className="text-xs font-normal text-[#6C7275]">
                        {item?.brand}
                      </p>
                      <button
                        className="text-[#605F5F] flex justify-start items-center gap-1 hover:text-red-500"
                        onClick={() => delProduct(item?.id)}
                      >
                        <RxCross2 className="hover:text-red-500" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="w-auto h-full flex justify-end items-center">
                    <button
                      className="w-[26px] h-fit text-lg outline-none border-none bg-[#6C7275] text-white flex justify-center items-center cursor-pointer"
                      onClick={() => dicri(item?.id)}
                    >
                      -
                    </button>
                    <p className="text-sm w-[26px] h-[30px] bg-white flex justify-center items-center">
                      {item?.quantity}
                    </p>
                    <button
                      className="w-[26px] h-fit text-lg outline-none border-none bg-[#6C7275] text-white flex justify-center items-center cursor-pointer"
                      onClick={() => incri(item?.id)}
                    >
                      +
                    </button>
                  </div>
                  <div className="w-auto pr-3 text-end h-fit sm:block hidden">
                    ₹{item?.price}
                  </div>
                  <div className="w-auto pr-4 text-end h-fit">
                    ₹{item?.subtotal}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-[35%] max-w-5xl m-auto w-full h-[476px] p-4 lg:p-6 border border-slate-500 rounded-md">
            <p className="text-xl font-medium text-[#141718]">Cart summary</p>
            <div className="w-full flex flex-col gap-3 my-4">
              <div
                className={
                  shipping === "Free shipping"
                    ? "flex justify-between items-center cursor-pointer w-full h-[52px] py-[13px] px-4 rounded border border-[#141718] bg-gray-200"
                    : "flex justify-between items-center cursor-pointer w-full h-[52px] py-[13px] px-4 rounded border border-[#141718] hover:bg-gray-100"
                }
              >
                <div className="flex items-center gap-3 cursor-pointer">
                  <input
                    onClick={() => setShipping("Free shipping")}
                    type="radio"
                    checked={shipping === "Free shipping"}
                    name="radio"
                    className="peer/draft"
                    style={{ width: 17, height: 17 }}
                  />
                  <p className="peer-checked/draft:font-semibold">
                    Free shipping
                  </p>
                </div>
                <p>₹0</p>
              </div>
              <div
                className={
                  shipping === "Express shipping"
                    ? "flex justify-between items-center cursor-pointer w-full h-[52px] py-[13px] px-4 rounded border border-[#141718] bg-gray-200"
                    : "flex justify-between items-center cursor-pointer w-full h-[52px] py-[13px] px-4 rounded border border-[#141718] hover:bg-gray-100"
                }
              >
                <div className="flex gap-3 items-center cursor-pointer">
                  <input
                    onClick={() => setShipping("Express shipping")}
                    type="radio"
                    checked={shipping === "Express shipping"}
                    name="radio"
                    className="peer/draft"
                    style={{ width: 17, height: 17 }}
                  />
                  <p className="peer-checked/draft:font-semibold">
                    Express shipping
                  </p>
                </div>
                <p>+₹15</p>
              </div>
              <div
                className={
                  shipping === "Pick Up shipping"
                    ? "flex justify-between items-center cursor-pointer w-full h-[52px] py-[13px] px-4 rounded border border-[#141718] bg-gray-200"
                    : "flex justify-between items-center cursor-pointer w-full h-[52px] py-[13px] px-4 rounded border border-[#141718] hover:bg-gray-100"
                }
              >
                <div className="flex gap-3 items-center cursor-pointer">
                  <input
                    onClick={() => setShipping("Pick Up shipping")}
                    type="radio"
                    checked={shipping === "Pick Up shipping"}
                    name="radio"
                    className="peer/draft"
                    style={{ width: 17, height: 17 }}
                  />
                  <p className="peer-checked/draft:font-semibold">
                    Pick Up shipping
                  </p>
                </div>
                <p>+₹21</p>
              </div>
            </div>
            <div className="w-full h-[52px] py-[13px] flex justify-between">
              <p className="text-base font-normal text-[#141718]">Subtotal</p>
              <p>₹{mainSubTotal}</p>
            </div>
            <div className="w-full h-[52px] py-[13px] flex justify-between mb-8">
              <p className="text-xl font-semibold">Total</p>
              <p className="text-xl font-semibold">
                ₹{shipping === "Free shipping" ? mainSubTotal : ""}
                {shipping === "Express shipping" ? mainSubTotal + 15 : ""}
                {shipping === "Pick Up shipping" ? mainSubTotal + 21 : ""}
              </p>
            </div>
            <button
              disabled={addToCart && addToCart?.length === 0 ? true : false}
              className={
                addToCart && addToCart?.length > 0
                  ? "w-full h-[52px] bg-[#141718] rounded-lg text-white text-center cursor-pointer"
                  : "w-full h-[52px] bg-[#141718] rounded-lg text-white text-center cursor-not-allowed disabled:bg-slate-500"
              }
              onClick={handleNavLinks}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddToCart;
