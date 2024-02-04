import { BsCreditCard2Front } from "react-icons/bs";
import { useContext, useState } from "react";
import productContext from "../../contexts/ProductContext.jsx";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import hotToast from "react-hot-toast";
import { dicrise, incrise } from "../../logics.js";
import userContext from "../../contexts/UserContext.jsx";

const CheckDeatail = () => {
  const { addToCart,setAddToCart } = useContext(productContext);
  const { count, setCount } = useContext(userContext);

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


  const incri = (pid) => {
    incrise(addToCart,setAddToCart,pid);
  };
  const decri = (pid) => {
    dicrise(addToCart,setAddToCart,count,setCount,pid);
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
      !zipCode
    ) {
      hotToast.error("enter all filed!");
    } else {
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
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
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
          to={"/ordercomplete"}
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
      <div className="mt-20 m-auto flex sm:flex-row flex-col w-full justify-evenly sm:gap-6">
        <form
          className="sm:w-[643px] w-full h-[1474px] flex flex-col gap-6"
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
                <div className="sm:w-[285px] md:w-full lg:w-full w-full h-[40px] py-0 px-4 border border-[#CBCBCB] flex items-center rounded-md">
                  <input
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    className="outline-none border-none w-full"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </li>
              <li className="flex flex-col gap-3">
                <label
                  htmlFor="last name"
                  className="uppercase text-xs font-bold text-[#6C7275]"
                >
                  last name
                </label>
                <div className="sm:w-[285px] md:w-full lg:w-full w-full h-[40px] py-0 px-4 border border-[#CBCBCB] flex items-center rounded-md">
                  <input
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    className="outline-none border-none w-full"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </li>
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <label
                htmlFor="phone number"
                className="uppercase text-xs font-bold text-[#6C7275]"
              >
                Phone Number
              </label>
              <div className="w-full h-[40px] py-0 px-4 border border-[#CBCBCB] flex items-center rounded-md">
                <input
                  type="text"
                  placeholder="Phone number"
                  name="phoneNumber"
                  className="outline-none border-none w-full"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <label
                htmlFor="phone number"
                className="uppercase text-xs font-bold text-[#6C7275]"
              >
                Email address
              </label>
              <div className="w-full h-[40px] py-0 px-4 border border-[#CBCBCB] flex items-center rounded-md">
                <input
                  type="text"
                  placeholder="Your email"
                  name="phoneNumber"
                  className="outline-none border-none w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
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
                <div className="w-full h-[40px] py-0 px-4 border border-[#CBCBCB] flex items-center rounded-md">
                  <input
                    type="text"
                    placeholder="Street Address"
                    name="StreetAddress"
                    className="outline-none border-none w-full"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </li>
              <li className="flex flex-col gap-3 mt-6">
                <label
                  htmlFor="Country"
                  className="uppercase text-xs font-bold text-[#6C7275]"
                >
                  Country *
                </label>
                <div className="w-full h-[40px] py-0 px-4 border border-[#CBCBCB] flex items-center rounded-md">
                  <select
                    id="country"
                    name="country"
                    className="w-full text-black cursor-pointer outline-none border-none"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option></option>
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
                </div>
              </li>
              <li className="flex flex-col gap-3 mt-6">
                <label
                  htmlFor="Town / City"
                  className="uppercase text-xs font-bold text-[#6C7275]"
                >
                  Town / City *
                </label>
                <div className="w-full h-[40px] py-0 px-4 border border-[#CBCBCB] flex items-center rounded-md">
                  <input
                    type="text"
                    placeholder="Town / City"
                    name="Town / City"
                    className="outline-none border-none w-full"
                    value={townCity}
                    onChange={(e) => setTownCity(e.target.value)}
                  />
                </div>
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
                <div className="sm:w-[285px] md:w-full lg:w-full w-full h-[40px] py-0 px-4 border border-[#CBCBCB] flex items-center rounded-md">
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    className="outline-none border-none w-full"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </li>
              <li className="flex flex-col gap-3">
                <label
                  htmlFor="Zip Code"
                  className="uppercase text-xs font-bold text-[#6C7275]"
                >
                  Zip Code
                </label>
                <div className="sm:w-[285px] md:w-full lg:w-full w-full h-[40px] py-0 px-4 border border-[#CBCBCB] flex items-center rounded-md">
                  <input
                    type="text"
                    placeholder="Zip Code"
                    name="zipCode"
                    className="outline-none border-none w-full"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className="w-full h-[468px] px-6 py-10 border border-[#6C7275] rounded">
            <p className="text-xl font-medium">Payment method</p>
            <ul className="w-full flex flex-col gap-6 mt-6">
              <li className="py-[13px] px-4 w-full h-[52px] flex justify-between items-center text-base font-normal border border-[#6C7275] rounded cursor-pointer">
                <div className="flex justify-between items-center">
                  <input
                    type="radio"
                    name="card"
                    className="text-base font-normal mr-3 w-[18px] h-[18px] cursor-pointer"
                  />
                  <p>Pay by Card Credit</p>
                </div>
                <BsCreditCard2Front size={20} />
              </li>
              <li className="py-[13px] px-4 w-full h-[52px] flex items-center text-base font-normal border border-[#6C7275] rounded cursor-pointer">
                <input
                  type="radio"
                  name="card"
                  className="text-base font-normal mr-3 w-[18px] h-[18px] cursor-pointer"
                />
                Paypal
              </li>
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <label
                htmlFor="Card Number"
                className="uppercase text-xs font-bold text-[#6C7275]"
              >
                Card Number
              </label>
              <div className="px-4 w-full h-[52px] flex items-center border border-[#6C7275] rounded">
                <input
                  type="text"
                  maxLength={12}
                  placeholder="1234 1234 1234"
                  name="state"
                  className="outline-none border-none text-base font-normal text-[#6C7275] w-full"
                />
              </div>
            </div>
            <ul className="w-full grid grid-cols-2 mt-6 gap-5">
              <li className="flex flex-col gap-3">
                <label
                  htmlFor="Expiration date"
                  className="uppercase text-xs font-bold text-[#6C7275]"
                >
                  Expiration date
                </label>
                <div className="sm:w-[285px] md:w-full lg:w-full w-full h-[40px] py-0 px-4 border border-[#6C7275] flex items-center rounded-md">
                  <input
                    type="date"
                    name="ExpirationDate"
                    className="outline-none border-none w-full cursor-pointer text-[#6C7275]"
                  />
                </div>
              </li>
              <li className="flex flex-col gap-3">
                <label
                  htmlFor="CVC"
                  className="uppercase text-xs font-bold text-[#6C7275]"
                >
                  CVC
                </label>
                <div className="sm:w-[285px] md:w-full lg:w-full w-full h-[40px] py-0 px-4 border border-[#6C7275] flex items-center rounded-md">
                  <input
                    type="text"
                    placeholder="CVC code"
                    name="CVC"
                    className="outline-none border-none w-full"
                  />
                </div>
              </li>
            </ul>
          </div>
        </form>
        <div className="sm:w-[413px] w-full h-[875px] m-auto sm:m-0 py-4 px-6 border-[#6C7275] rounded-md border">
          <p className="text-xl font-medium">Order summary</p>
          <div className="sm:w-[365px] w-full h-[556px] mt-6 m-auto flex flex-col gap-6">
            {addToCart?.map((item) => (
              <div className="sm:w-[365px] w-full sm:h-[144px] md:h-auto h-auto sm:py-6 py-3 flex justify-center flex-col lg:flex-row lg:items-center items-end border-b-2 border-[#E8ECEF]">
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
                <div>${item?.subtotal}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        className="sm:w-[413px] cursor-pointer md:w-[413px] lg:w-[413px] m-auto w-full rounded-lg bg-[#141718] text-white py-3 px-10 flex justify-center items-center text-base font-medium mb-6 mt-6 sm:-mt-16"
        onClick={handleNavLinks}
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckDeatail;
