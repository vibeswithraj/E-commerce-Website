import { FaCheck } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
// import { useSelector } from "react-redux";
import productContext from "../../contexts/ProductContext";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import userContext from "../../contexts/UserContext";

const OrderComplete = () => {
  // const addToCart = useSelector((state) => state.AddToCart);
  const { addToCart, setAddToCart } = useContext(productContext);
  const { setCount } = useContext(userContext);
  const [change, setChange] = useState(true);
  const [changeTwo, setChangeTwo] = useState(true);
  const [changeThree, setChangeThree] = useState(false);

  const handleNavLinks = () => {
    const colorChange = document.getElementById("colorChange");
    const borderChange = document.getElementById("borderChange");
    const textChange = document.getElementById("textChange");
    colorChange.style.backgroundColor = "#33FF42";
    borderChange.style.borderBottomColor = "#33FF42";
    textChange.style.color = "#33FF42";
    setChange(true);
    setChangeTwo(true);
    setChangeThree(true);
    localStorage.clear();
    addToCart.splice(0, addToCart.length);
    setAddToCart([]);
    setCount(0);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <div className="w-full h-auto">
        <Nav />
      </div>
      <div className="mt-10 w-full sm:px-40 md:px-20 px-8 m-auto h-auto overflow-x-hidden">
        <p className="text-[54px] font-medium text-center">Cart</p>
        <div className="w-[832px] h-auto grid grid-cols-3 gap-8 mt-10 justify-center m-auto">
          <NavLink
            //to={"/addtocart"}
            //id="borderChange"
            className="border-b-2 w-[256px] border-[#33FF42]"
          >
            <div className="flex gap-4 cursor-pointer justify-center items-center pb-5">
              <NavLink
                //id="colorChange"
                className="bg-[#33FF42] rounded-full w-[40px] h-[40px] flex justify-center items-center text-white"
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
                //id="textChange"
                className="text-base font-semibold text-[#33FF42]"
              >
                <div id="colorName">Shoppingcart</div>
              </NavLink>
            </div>
          </NavLink>
          <NavLink
            //to={"/checkoutdetails"}
            //id="borderChange"
            className="border-b-2 w-[256px] border-[#33FF42]"
          >
            <div className="flex gap-4 cursor-pointer justify-center items-center pb-5">
              <NavLink
                //id="colorChange"
                className="bg-[#33FF42] rounded-full w-[40px] h-[40px] flex justify-center items-center text-white"
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
                className="text-base font-semibold text-[#33FF42]"
              >
                <div id="colorName">Checkout details</div>
              </NavLink>
            </div>
          </NavLink>
          <NavLink
            to={"/ordercomplete"}
            id="borderChange"
            className="border-b-2 w-[256px] border-black"
          >
            <div className="flex gap-4 cursor-pointer justify-center items-center pb-5">
              <NavLink
                id="colorChange"
                className="bg-black rounded-full w-[40px] h-[40px] flex justify-center items-center text-white"
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
                id="textChange"
                className="text-base font-semibold text-black"
              >
                <div id="colorName">Order complete</div>
              </NavLink>
            </div>
          </NavLink>
        </div>
        <div className="w-full h-[500px] flex flex-col gap-8 justify-center items-center">
          <button
            className={
              !changeThree
                ? "w-[365px] h-[52px] flex justify-center items-center bg-[#141718] rounded-lg text-white text-center cursor-pointer"
                : "w-[365px] h-[52px] flex justify-center items-center"
            }
            onClick={handleNavLinks}
          >
            {changeThree ? (
              <div className="flex flex-col gap-8">
                <p className="text-[#141718] text-center text-[30px] font-medium">
                  Your order has been received
                </p>
                <p>Thank you! 🎉</p>
              </div>
            ) : (
              "Click to complete"
            )}
          </button>
          <Link
            className="text-[#141718] cursor-pointer mt-8 w-fit h-fit rounded-lg py-2 px-6 border border-black bg-white hover:bg-black hover:text-white transition-all ease-linear text-center text-base"
            to={"/shop"}
          >
            Countinue shopping
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderComplete;
