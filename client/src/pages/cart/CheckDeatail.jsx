import { BsCreditCard2Front } from "react-icons/bs";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import hotToast from "react-hot-toast";
import { dicrise, incrise } from "../../logics";
import productContext from "../../contexts/ProductContext";
import userContext from "../../contexts/UserContext";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import deatilsContext from "../../contexts/DetailsContext";
// import { useDispatch, useSelector } from "react-redux";
// import { dicrise, incrise } from "../../contexts/productSlice.js";

const CheckDeatail = () => {
  const [change, setChange] = useState(true);
  const [changeTwo, setChangeTwo] = useState(false);
  const [changeThree, setChangeThree] = useState(false);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [townCity, setTownCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  // const addToCart = useSelector((state) => state.AddToCart);
  // const dispatch = useDispatch();
  const { count, setCount } = useContext(userContext);
  const { addToCart, setAddToCart } = useContext(productContext);
  const { mainSubTotal, shipping, payBy, setPayBy } =
    useContext(deatilsContext);
  const incri = (pid) => {
    // dispatch(incrise(pid));
    incrise(addToCart, setAddToCart, pid);
  };
  const decri = (pid) => {
    // dispatch(dicrise(pid));
    dicrise(addToCart, setAddToCart, count, setCount, pid);
  };

  const handleNavLinks = async (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !address ||
      !country ||
      !townCity ||
      !state ||
      !zipCode ||
      !cardNumber
    ) {
      return hotToast.error("enter all filed!");
    }
    if (!payBy?.card && !payBy?.paypal) {
      return hotToast.error("select payment method!");
    }
    try {
      const { data } = await axios.post(
        "http://localhost:5050/checkoutdetails",
        {
          firstName,
          lastName,
          phoneNumber,
          email,
          address,
          townCity,
          state,
          zipCode,
          country,
          addToCart,
          payment: payBy?.card ? "Card" : "Paypal",
          shipping,
          mainSubTotal,
          status: "Pennding",
          cardNumber,
        },
        { withCredentials: true }
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
      }
      const colorChange = document.getElementById("colorChange");
      const borderChange = document.getElementById("borderChange");
      const textChange = document.getElementById("textChange");
      colorChange.style.backgroundColor = "#33FF42";
      borderChange.style.borderBottomColor = "#33FF42";
      textChange.style.color = "#33FF42";
      setChange(true);
      setChangeTwo(true);
      setChangeThree(false);
      navigate("/ordercomplete");
      addToCart?.splice(0, addToCart?.length);
      setAddToCart([]);
      setCount(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-auto">
      <div className="w-full h-auto">
        <Nav />
      </div>
      <div className="mt-10 w-full sm:px-40 md:px-20 px-8 m-auto overflow-x-hidden">
        <p className="text-[54px] m-auto font-medium text-center">Cart</p>
        <div className="w-[832px] grid grid-cols-3 gap-8 mt-10 justify-center m-auto">
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
            to={"/checkoutdetails"}
            id="borderChange"
            className="border-b-2 w-[256px] border-black"
          >
            <div className="flex gap-4 cursor-pointer justify-center items-center pb-5">
              <NavLink
                id="colorChange"
                className={(round) =>
                  round.isActive
                    ? "bg-black rounded-full w-[40px] h-[40px] flex justify-center items-center text-white"
                    : "bg-slate-500 rounded-full w-[40px] h-[40px] flex justify-center items-center text-white"
                }
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
                id="textChange"
                className={(navClass) =>
                  navClass.isActive
                    ? "text-base font-semibold text-black"
                    : "text-base font-semibold text-slate-500"
                }
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
            <div className="flex gap-4 cursor-pointer justify-center items-center pb-5">
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
        <div className="my-20 m-auto flex sm:flex-row flex-col w-full h-auto justify-evenly sm:gap-6">
          <form
            className="sm:w-[643px] w-full h-auto flex flex-col gap-6"
            method="post"
            onSubmit={handleNavLinks}
          >
            <div className="w-full h-[372px] px-4 py-10 border border-[#6C7275] rounded">
              <p className="text-xl font-medium">Contact Infomation</p>
              <ul className="w-full grid grid-cols-2 mt-6 gap-5">
                <li className="flex flex-col gap-3">
                  <label
                    htmlFor="first name"
                    className="uppercase text-xs font-bold text-[#6C7275]"
                  >
                    first name
                  </label>
                  <input
                    id="first name"
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    className="w-full px-4 sm:w-[285px] md:w-full lg:w-full h-[40px] py-0 border border-[#CBCBCB] flex items-center rounded-md"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoFocus
                  />
                </li>
                <li className="flex flex-col gap-3">
                  <label
                    htmlFor="last name"
                    className="uppercase text-xs font-bold text-[#6C7275]"
                  >
                    last name
                  </label>
                  <input
                    id="last name"
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    className="border sm:w-[285px] md:w-full lg:w-full w-full h-[40px] py-0 px-4 border-[#CBCBCB] flex items-center rounded-md"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </li>
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <label
                  htmlFor="phone number"
                  className="uppercase text-xs font-bold text-[#6C7275]"
                >
                  Phone Number
                </label>
                <input
                  id="phone number"
                  type="text"
                  placeholder="Phone number"
                  name="phoneNumber"
                  className="w-full h-[40px] py-0 px-4 border border-[#CBCBCB] flex items-center rounded-md"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <label
                  htmlFor="email"
                  className="uppercase text-xs font-bold text-[#6C7275]"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  name="email"
                  className="w-full h-[40px] py-0 px-4 border border-[#CBCBCB] flex items-center rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full h-[480px] px-6 py-10 border border-[#6C7275] rounded">
              <p className="text-xl font-medium">Shipping Address</p>
              <ul className="w-full mt-6">
                <li className="flex flex-col gap-3">
                  <label
                    htmlFor="Street Address"
                    className="uppercase text-xs font-bold text-[#6C7275]"
                  >
                    Street Address *
                  </label>
                  <input
                    id="Street Address"
                    type="text"
                    placeholder="Street Address"
                    name="StreetAddress"
                    required
                    className="w-full h-[40px] py-0 px-4 border border-[#CBCBCB] flex items-center rounded-md"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </li>
                <li className="flex flex-col gap-3 mt-6">
                  <label
                    htmlFor="Country"
                    className="uppercase text-xs font-bold text-[#6C7275]"
                  >
                    Country *
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="w-full text-black cursor-pointer h-[40px] py-0 px-4 border border-[#CBCBCB] flex items-center rounded-md"
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option>country</option>
                    <option>Afghanistan</option>
                    <option>Bangladesh</option>
                    <option>Canada</option>
                    <option>Denmark</option>
                    <option>Denmark</option>
                    <option>Egypt</option>
                    <option>France</option>
                    <option>Germany</option>
                    <option>Haiti</option>
                    <option>India</option>
                    <option>Jamaica</option>
                    <option>Kazakhstan</option>
                    <option>Kazakhstan</option>
                    <option>Lithuania</option>
                    <option>Malaysia</option>
                    <option>New Zealand</option>
                    <option>Oman</option>
                    <option>Philippines</option>
                    <option>Qatar</option>
                    <option>Russia</option>
                    <option>Saudi Arabia</option>
                    <option>Thailand</option>
                    <option>Thailand</option>
                    <option>Uganda</option>
                    <option>Vietnam</option>
                    <option>Yemen</option>
                    <option>Zambia</option>
                  </select>
                </li>
                <li className="flex flex-col gap-3 mt-6">
                  <label
                    htmlFor="Town / City"
                    className="uppercase text-xs font-bold text-[#6C7275]"
                  >
                    Town / City *
                  </label>
                  <input
                    id="Town / City"
                    type="text"
                    placeholder="Town / City"
                    name="Town / City"
                    required
                    className="w-full h-[40px] py-0 px-4 border border-[#CBCBCB] flex items-center rounded-m"
                    value={townCity}
                    onChange={(e) => setTownCity(e.target.value)}
                  />
                </li>
              </ul>
              <ul className="w-full grid grid-cols-2 mt-6 gap-2">
                <li className="flex flex-col gap-3">
                  <label
                    htmlFor="State"
                    className="uppercase text-xs font-bold text-[#6C7275]"
                  >
                    State
                  </label>
                  <input
                    id="State"
                    type="text"
                    placeholder="State"
                    required
                    name="state"
                    className="sm:w-[285px] md:w-full lg:w-full w-full h-[40px] py-0 px-4 border border-[#CBCBCB] flex items-center rounded-md"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </li>
                <li className="flex flex-col gap-3">
                  <label
                    htmlFor="Zip Code"
                    className="uppercase text-xs font-bold text-[#6C7275]"
                  >
                    Zip Code
                  </label>
                  <input
                    id="Zip Code"
                    type="text"
                    placeholder="Zip Code"
                    required
                    name="zipCode"
                    className="sm:w-[285px] md:w-full lg:w-full w-full h-[40px] py-0 px-4 border border-[#CBCBCB] flex items-center rounded-md"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </li>
              </ul>
            </div>
            <div className="w-full h-[468px] px-6 py-10 border border-[#6C7275] rounded">
              <p className="text-xl font-medium">Payment method</p>
              <ul className="w-full flex flex-col gap-6 mt-6">
                <li
                  className="py-[13px] px-4 w-full h-[52px] flex justify-between items-center text-base font-normal border border-[#6C7275] rounded cursor-pointer hover:bg-gray-100"
                  onClick={() => setPayBy({ paypal: false, card: true })}
                >
                  <div className="flex justify-between items-center">
                    <input
                      type="radio"
                      name="card"
                      value={payBy?.card}
                      checked={payBy?.card}
                      className="text-base font-normal mr-3 w-[18px] h-[18px] cursor-pointer"
                    />
                    <p
                      className={payBy?.card ? "font-semibold" : "font-normal"}
                    >
                      Pay by Card Credit
                    </p>
                  </div>
                  <BsCreditCard2Front size={20} />
                </li>
                <li
                  className="py-[13px] px-4 w-full h-[52px] flex items-center text-base font-normal border border-[#6C7275] rounded cursor-pointer hover:bg-gray-100"
                  onClick={() => setPayBy({ paypal: true, card: false })}
                >
                  <input
                    type="radio"
                    name="card"
                    value={payBy?.paypal}
                    checked={payBy?.paypal}
                    className="text-base font-normal mr-3 w-[18px] h-[18px] cursor-pointer"
                  />
                  <p
                    className={payBy?.paypal ? "font-semibold" : "font-normal"}
                  >
                    Paypal
                  </p>
                </li>
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <label
                  htmlFor="Card Number"
                  className="uppercase text-xs font-bold text-[#6C7275]"
                >
                  Card Number
                </label>
                <input
                  id="Card Number"
                  type="text"
                  maxLength={12}
                  placeholder="1234 1234 1234"
                  name="card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="text-base font-normal text-[#6C7275] w-full px-4 h-[52px] flex items-center border border-[#6C7275] rounded"
                />
              </div>
              <ul className="w-full grid grid-cols-2 mt-6 gap-5">
                <li className="flex flex-col gap-3">
                  <label
                    htmlFor="Expiration date"
                    className="uppercase text-xs font-bold text-[#6C7275]"
                  >
                    Expiration date
                  </label>
                  <input
                    id="Expiration date"
                    type="date"
                    name="ExpirationDate"
                    className="cursor-pointer text-[#6C7275] sm:w-[285px] md:w-full lg:w-full w-full h-[40px] py-0 px-4 border border-[#6C7275] flex items-center rounded-md"
                  />
                </li>
                <li className="flex flex-col gap-3">
                  <label
                    htmlFor="CVC"
                    className="uppercase text-xs font-bold text-[#6C7275]"
                  >
                    CVC
                  </label>
                  <input
                    id="CVC"
                    type="text"
                    placeholder="CVC code"
                    name="CVC"
                    className="sm:w-[285px] md:w-full lg:w-full w-full h-[40px] py-0 px-4 border border-[#6C7275] flex items-center rounded-md"
                  />
                </li>
              </ul>
            </div>
            <div className="w-full h-fit my-5">
              <button
                className="w-full h-fit rounded-lg bg-[#141718] text-white py-3 flex justify-center items-center text-base font-medium mb-6 mt-6 sm:-mt-16 z-50 cursor-pointer"
                onSubmit={handleNavLinks}
                disabled={count === 0 ? true : false}
              >
                Place Order
              </button>
            </div>
          </form>
          <div className="sm:w-[413px] w-full h-[875px] m-auto sm:m-0 py-4 px-6 border-[#6C7275] flex flex-col justify-between rounded-md border">
            <p className="text-xl font-medium">Order summary</p>
            <div className="sm:w-[365px] w-full h-[556px] mt-6 m-auto flex flex-col gap-6">
              {addToCart.map((item, index) => (
                <div
                  key={index}
                  className="sm:w-[365px] w-full sm:h-[144px] md:h-auto h-auto sm:py-6 py-3 flex justify-center flex-col lg:flex-row lg:items-center items-end border-b-2 border-[#E8ECEF]"
                >
                  <div className="flex w-full items-center justify-between lg:justify-normal gap-4">
                    <img
                      src={item?.image}
                      className="w-[80px] h-[96px] bg-cover bg-center"
                      width={80}
                      height={96}
                      alt=""
                    />
                    <div className="flex items-end lg:items-start flex-col gap-2">
                      <p className="text-base text-end lg:text-start font-semibold w-[180px]">
                        {item?.category}
                      </p>
                      <p className="text-xs font-normal text-[#6C7275]">
                        {item?.brand}
                      </p>
                      <div className="w-20 h-8 py-3 px-2 flex justify-center items-center gap-3 rounded border border-black">
                        <button
                          className="text-lg"
                          onClick={() => decri(item?.id)}
                        >
                          -
                        </button>
                        <p className="text-sm">{item?.quantity}</p>
                        <button
                          className="text-lg"
                          onClick={() => incri(item?.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>₹{item?.subtotal}</div>
                </div>
              ))}
            </div>
            <div className="w-full h-fit flex justify-between items-center float-right">
              <div className="flex flex-col gap-4 text-left">
                <p className="text-xl">Subtotal</p>
                <p className="text-xl">Discount</p>
                <p className="text-xl">
                  {shipping + " "}
                  Rate
                </p>
                <p className="text-2xl font-semibold mt-1">Total</p>
              </div>
              <div className="flex flex-col gap-4 text-right">
                <p className="text-xl">
                  ₹{mainSubTotal ? mainSubTotal : "error"}
                </p>
                <p className="text-xl">₹0</p>
                <p className="text-xl">
                  {shipping === "Free shipping" ? "₹0" : ""}
                  {shipping === "Express shipping" ? "₹15" : ""}
                  {shipping === "Pick Up shipping" ? "₹21" : ""}
                </p>
                <p className="text-2xl font-semibold mt-1">
                  ₹{shipping === "Express shipping" ? mainSubTotal + 15 : ""}
                  {shipping === "Free shipping" ? mainSubTotal : ""}
                  {shipping === "Pick Up shipping" ? mainSubTotal + 21 : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckDeatail;
