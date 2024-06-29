import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useContext } from "react";
import productContext from "../../contexts/ProductContext.jsx";
import deatilsContext from "../../contexts/DetailsContext.jsx";
import { FaCheck } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { delAtcp, dicrise, incrise } from "../../logics.js";
import userContext from "../../contexts/UserContext.jsx";
import Nav from "../../components/Nav.jsx";
import Footer from "../../components/Footer.jsx";
//import { useDispatch, useSelector } from "react-redux";
//import { dicrise, incrise, remove } from "../../contexts/productSlice.js";

const AddToCart = () => {
  const navigate = useNavigate();
  const { allProducts, setProduct, addToCart, setAddToCart } =
    useContext(productContext);
  // const addToCart = useSelector((state) => state.AddToCart);
  // const count = useSelector((state) => state.count);
  // const mainSubTotal = useSelector((state) => state.mainSubTotal);
  // const dispatch = useDispatch();
  // const cartSummary = [
  //   {
  //     name: "Free shipping",
  //     textAmount: "₹0",
  //     amount: 0,
  //     checked: false,
  //   },
  //   {
  //     name: "Express shipping",
  //     textAmount: "+₹15.00",
  //     amount: 15,
  //     checked: false,
  //   },
  //   {
  //     name: "Pick Up shipping",
  //     textAmount: "+₹21.00",
  //     amount: 21,
  //     checked: false,
  //   },
  // ];

  const { shipping, setShipping, mainSubTotal } = useContext(deatilsContext);
  const { count, setCount } = useContext(userContext);

  const [change, setChange] = useState(false);
  const [changeTwo, setChangeTwo] = useState(false);
  const [changeThree, setChangeThree] = useState(false);

  const incri = (pid) => {
    // dispatch(incrise(pid));
    incrise(addToCart, setAddToCart, pid);
  };
  const dicri = (pid) => {
    // dispatch(dicrise(pid));
    dicrise(addToCart, setAddToCart, count, setCount, pid);
  };
  const delProduct = (pid) => {
    delAtcp(addToCart, setAddToCart, setCount, pid);
    // dispatch(remove(pid));
  };

  const handleNavLinks = () => {
    const colorChange = document.getElementById("colorChange");
    const borderChange = document.getElementById("borderChange");
    const textChange = document.getElementById("textChange");
    colorChange.style.backgroundColor = "#33FF42";
    borderChange.style.borderBottomColor = "#33FF42";
    textChange.style.color = "#33FF42";
    setChange(true);
    setChangeTwo(false);
    setChangeThree(false);
    navigate("/cart/checkoutdetails");
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
  return (
    <div className="w-full h-auto">
      <div className="w-full h-auto">
        <Nav />
      </div>
      <div className="mt-10 h-auto w-full sm:px-40 md:px-20 px-8 m-auto overflow-x-hidden">
        <p className="text-[54px] font-medium text-center">Cart</p>
        <div className="w-[832px] grid grid-cols-3 gap-8 mt-10 justify-center m-auto">
          <NavLink
            to={"/addtocart"}
            id="borderChange"
            className={(bb) =>
              bb.isActive ? "border-b-2 w-[256px] border-black" : "border-none"
            }
          >
            <div className="flex gap-4 w-full cursor-pointer items-center pb-5">
              <NavLink
                id="colorChange"
                className={(round) =>
                  round.isActive
                    ? "bg-black rounded-full w-[40px] h-[40px] flex justify-center items-center text-white"
                    : "bg-slate-500 rounded-full w-[40px] h-[40px] flex justify-center items-center text-white"
                }
              >
                {change ? (
                  <div>
                    <FaCheck size={20} />
                  </div>
                ) : (
                  "1"
                )}
              </NavLink>
              <NavLink
                id="textChange"
                className={(navClass) =>
                  navClass.isActive
                    ? "text-base font-semibold text-black"
                    : "text-base font-semibold text-slate-500"
                }
              >
                <div id="colorName">Shoppingcart</div>
              </NavLink>
            </div>
          </NavLink>
          <NavLink
            //to={"/checkoutdetails"}
            //id="borderChange"
            className="border-none w-[256px]"
          >
            <div className="flex w-full gap-4 cursor-pointer items-center pb-5">
              <NavLink
                //id="colorChange"
                className="bg-slate-500 rounded-full w-[40px] h-[40px] flex justify-center items-center text-white"
              >
                {changeTwo ? (
                  <div className="rounded-full py-[7.5px]">
                    <FaCheck size={20} />
                  </div>
                ) : (
                  "2"
                )}
              </NavLink>
              <NavLink
                //id="textChange"
                className="text-base font-semibold text-slate-500"
              >
                <div id="colorName">Checkout details</div>
              </NavLink>
            </div>
          </NavLink>
          <NavLink
            //to={"/ordercomplete"}
            //id="borderChange"
            className="border-none w-[256px]"
          >
            <div className="flex w-full gap-4 cursor-pointer items-center pb-5">
              <NavLink
                //id="colorChange"
                className="bg-slate-500 rounded-full w-[40px] h-[40px] flex justify-center items-center text-white"
              >
                {changeThree ? (
                  <div className="rounded-full py-[7.5px]">
                    <FaCheck size={20} />
                  </div>
                ) : (
                  "3"
                )}
              </NavLink>
              <NavLink
                //id="textChange"
                className="text-base font-semibold text-slate-500"
              >
                <div id="colorName">Order complete</div>
              </NavLink>
            </div>
          </NavLink>
        </div>
        <div className="sm:h-[642px] md:h-auto h-auto m-auto w-full flex flex-wrap justify-between gap-10 py-20">
          <div className="sm:w-[642px] lg:w-[642px] w-full h-full m-auto">
            <div className="w-full h-[50px] pb-6 grid pqps grid-cols-5 border-b-2 border-slate-600">
              <p className="col-span-2">Product</p>
              <p>Quantity</p>
              <p>Price</p>
              <p>Subtotal</p>
            </div>
            <div
              className={
                count !== 0
                  ? "w-full h-auto overflow-y-scroll atcList m-auto"
                  : "w-full h-auto overflow-y-scroll atcList m-auto flex flex-col justify-center items-center"
              }
            >
              {count === 0 ? (
                <div className="flex justify-center items-center">
                  Cart is empty
                </div>
              ) : (
                addToCart?.map((item) => (
                  <div
                    className="w-full sm:h-[144px] md:h-[180px] items-center grid grid-rows-2 sm:grid-cols-5 py-3 m-auto"
                    key={item?.id}
                  >
                    <div className="sm:col-span-2 col-span-3 m-auto flex gap-4">
                      <Link
                        to={"/product"}
                        onClick={() => handleProduct(item?.id)}
                      >
                        <img
                          className="w-20 h-24 -z-10"
                          src={item?.image}
                          alt=""
                        />
                      </Link>
                      <div className="flex items-center sm:items-start sm:flex-col flex-row gap-2 sm:w-[145px] w-full">
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
                    <div className="w-20 h-8 flex justify-center items-center rounded">
                      <button
                        className="w-[26px] text-lg outline-none border-none bg-[#6C7275] text-white flex justify-center items-center cursor-pointer"
                        onClick={() => dicri(item?.id)}
                      >
                        -
                      </button>
                      <p className="text-sm w-[26px] h-[30px] bg-white flex justify-center items-center">
                        {item?.quantity}
                      </p>
                      <button
                        className="w-[26px] text-lg outline-none border-none bg-[#6C7275] text-white flex justify-center items-center cursor-pointer"
                        onClick={() => incri(item?.id)}
                      >
                        +
                      </button>
                    </div>
                    <div className="sm:block hidden">₹{item?.price}</div>
                    <div className="col-span-2 sm:col-span-1">
                      ₹{item?.subtotal}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="sm:w-[413px] m-auto w-full h-[476px] p-6 border border-slate-500 rounded-md">
            <p className="text-xl font-medium text-[#141718]">Cart summary</p>
            <div className="flex flex-col gap-3 my-4">
              <div
                className={
                  shipping === "Free shipping"
                    ? "flex justify-between items-center cursor-pointer sm:w-[365px] w-full h-[52px] py-[13px] px-4 rounded border border-[#141718] bg-gray-200"
                    : "flex justify-between items-center cursor-pointer sm:w-[365px] w-full h-[52px] py-[13px] px-4 rounded border border-[#141718] hover:bg-gray-100"
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
                    ? "flex justify-between items-center cursor-pointer sm:w-[365px] w-full h-[52px] py-[13px] px-4 rounded border border-[#141718] bg-gray-200"
                    : "flex justify-between items-center cursor-pointer sm:w-[365px] w-full h-[52px] py-[13px] px-4 rounded border border-[#141718] hover:bg-gray-100"
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
                    ? "flex justify-between items-center cursor-pointer sm:w-[365px] w-full h-[52px] py-[13px] px-4 rounded border border-[#141718] bg-gray-200"
                    : "flex justify-between items-center cursor-pointer sm:w-[365px] w-full h-[52px] py-[13px] px-4 rounded border border-[#141718] hover:bg-gray-100"
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
            <div className="sm:w-[365px] w-full h-[52px] py-[13px] flex justify-between">
              <p className="text-base font-normal text-[#141718]">Subtotal</p>
              <p>₹{mainSubTotal}</p>
            </div>
            <div className="sm:w-[365px] w-full h-[52px] py-[13px] flex justify-between mb-8">
              <p className="text-xl font-semibold">Total</p>
              <p className="text-xl font-semibold">
                ₹{shipping === "Free shipping" ? mainSubTotal : ""}
                {shipping === "Express shipping" ? mainSubTotal + 15 : ""}
                {shipping === "Pick Up shipping" ? mainSubTotal + 21 : ""}
              </p>
            </div>
            <button
              disabled={addToCart?.length === 0 ? true : false}
              className={
                count > 0
                  ? "sm:w-[365px] w-full h-[52px] bg-[#141718] rounded-lg text-white text-center cursor-pointer"
                  : "sm:w-[365px] w-full h-[52px] bg-[#141718] rounded-lg text-white text-center cursor-not-allowed disabled:bg-slate-500"
              }
              onClick={() => handleNavLinks()}
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
