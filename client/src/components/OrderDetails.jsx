import { IoIosArrowDown } from "react-icons/io";
import Aside from "./Aside";
import { IoPrintOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { IoBagHandleOutline } from "react-icons/io5";
import card from "../images/card.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useContext, useState } from "react";
import userContext from "../contexts/UserContext";
import axios from "axios";
import AdminNav from "./AdminNav";

const OrderDetails = () => {
  const { orderDetail, setOrderList } = useContext(userContext);
  const [open, setOpen] = useState(false);

  const change = async (orderId, status) => {
    const { data } = await axios.post(
      `http://localhost:5050/changeStatus`,
      {
        orderId,
        status,
      },
      { withCredentials: true }
    );
    setOrderList(data);
  };

  const handlePennding = (s) => {
    // setOrderDetail({ ...orderDetail, status: "Pennding" });
    setOpen((prev) => !prev);
    change(orderDetail?.orderId, s);
  };
  const handleDelivered = (s) => {
    // setOrderDetail({ ...orderDetail, status: "Delivered" });
    setOpen((prev) => !prev);
    change(orderDetail?.orderId, s);
  };
  const handleCanceled = (s) => {
    // setOrderDetail({ ...orderDetail, status: "Canceled" });
    setOpen((prev) => !prev);
    change(orderDetail?.orderId, s);
  };

  return (
    <div className="w-full h-full flex">
      <Aside />
      <div className="w-full h-auto relative">
        <AdminNav />
        <div className="bg-[#e7e7e3] w-full h-fit px-4 py-5">
          <div className="w-full h-[54px] flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-black">Order list</p>
              <p className="text-base font-normal text-black font-sans">
                Home {">"} order list {">"} order details
              </p>
            </div>
          </div>
          <div className="w-full h-[536px] rounded-xl bg-[#FAFAFA] mt-6 flex flex-col gap-6 p-4">
            <div className="w-full h-[92px]">
              <div className="w-fit h-fit flex items-center gap-3">
                <p className="text-lg font-bold text-black">
                  Orders ID: #{orderDetail?.orderId || ""}
                </p>
                <p
                  className={`w-[71px] h-[32px] text-xs rounded-md ${
                    orderDetail?.status
                      ? orderDetail?.status === "Pennding"
                        ? "bg-[#FFA52F]"
                        : "" || orderDetail?.status === "Delivered"
                        ? "bg-green-500"
                        : "" || orderDetail?.status === "Canceled"
                        ? "bg-red-500"
                        : ""
                      : "bg-gray-200"
                  } flex justify-center items-center`}
                >
                  {orderDetail?.status || ""}
                </p>
              </div>
              <div className="w-full h-fit flex justify-between items-center mt-2">
                <p className="text-sm font-semibold text-black">
                  Date: {orderDetail?.createdAt?.split("T")[0] || ""}
                </p>
                <div className="flex gap-4 relative">
                  <button
                    className="w-[219px] h-[52px] text-base font-semibold text-black rounded-md bg-gray-200 flex justify-around items-center"
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    Change Status{" "}
                    <IoIosArrowDown className={!open ? "rotate-180" : ""} />
                  </button>
                  <ul
                    className={
                      !open
                        ? "w-[219px] h-[150px] bg-gray-200 absolute rounded-b-md visible left-0 top-[55px] z-10 flex flex-col justify-around p-2"
                        : "w-[219px] h-[150px] bg-gray-200 absolute rounded-b-md invisible top-0 left-0"
                    }
                  >
                    <li
                      className={
                        orderDetail?.status === "Pennding"
                          ? "w-full h-[35px] shrink-0 hover:bg-[#FFA52F] text-black rounded-md  flex items-center cursor-pointer pl-2 bg-[#FFA52F]"
                          : "w-full h-[35px] shrink-0 hover:bg-[#FFA52F] text-black rounded-md  flex items-center cursor-pointer pl-2"
                      }
                      onClick={() => handlePennding("Pennding")}
                    >
                      Pennding
                    </li>
                    <li
                      className={
                        orderDetail?.status === "Delivered"
                          ? "w-full h-[35px] shrink-0 hover:bg-green-500 text-black rounded-md  flex items-center cursor-pointer pl-2 bg-green-500"
                          : "w-full h-[35px] shrink-0 hover:bg-green-500 text-black rounded-md  flex items-center cursor-pointer pl-2"
                      }
                      onClick={() => handleDelivered("Delivered")}
                    >
                      Delivered
                    </li>
                    <li
                      className={
                        orderDetail?.status === "Canceled"
                          ? "w-full h-[35px] shrink-0 hover:bg-red-500 text-black rounded-md  flex items-center cursor-pointer pl-2 bg-red-500"
                          : "w-full h-[35px] shrink-0 hover:bg-red-500 text-black rounded-md  flex items-center cursor-pointer pl-2"
                      }
                      onClick={() => handleCanceled("Canceled")}
                    >
                      Canceled
                    </li>
                  </ul>
                  <button className="w-[85px] h-[52px] rounded-md bg-gray-200 flex justify-center items-center">
                    <IoPrintOutline size={20} />
                  </button>
                  <button className="w-[85px] h-[52px] text-base font-semibold text-black rounded-md bg-gray-200 flex justify-center items-center text-center">
                    Save
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full h-fit flex justify-between">
              <div className="w-[348px] h-[194px] flex flex-col justify-around rounded-xl bg-[#FAFAFA] border-[1.5px] border-gray-400 outline-none px-4">
                <div className="w-full h-fit flex gap-4">
                  <div className="w-[56px] h-[56px] shrink-0 bg-black flex justify-center items-center rounded-md">
                    <HiOutlineUser color="#fff" size={28} />
                  </div>
                  <div className="w-full h-fit">
                    <p className="text-xl font-semibold text-black">Customer</p>
                    <p className="opacity-75 text-base mt-1">
                      Full Name: {orderDetail?.firstName + " " || ""}
                      {orderDetail?.lastName || ""}
                    </p>
                    <p className="opacity-75 text-base mt-1">
                      Email: {orderDetail?.email || ""}
                    </p>
                    <p className="opacity-75 text-base mt-1">
                      Phone: +91
                      {" " +
                        orderDetail?.phoneNumber?.toString().split("91")[1] ||
                        "error"}
                    </p>
                  </div>
                </div>
                <button className="w-full h-[32px] text-sm rounded-md bg-black text-white tracking-wider">
                  View Profile
                </button>
              </div>
              <div className="w-[348px] h-[194px] flex flex-col justify-around rounded-xl bg-[#FAFAFA] border-[1.5px] border-gray-400 outline-none px-4">
                <div className="w-full h-fit flex gap-4">
                  <div className="w-[56px] h-[56px] shrink-0 bg-black flex justify-center items-center rounded-md">
                    <IoBagHandleOutline color="#fff" size={28} />
                  </div>
                  <div className="w-full h-fit">
                    <p className="text-xl font-semibold text-black">
                      Order Info
                    </p>
                    <p className="opacity-75 text-base mt-1">
                      Shipping: Next express
                    </p>
                    <p className="opacity-75 text-base mt-1">
                      Payment Method: {orderDetail?.payment || ""}
                    </p>
                    <p className="opacity-75 text-base mt-1">
                      Status:{" "}
                      {orderDetail?.status ? orderDetail?.status : "Pennding"}
                    </p>
                  </div>
                </div>
                <button className="w-full h-[32px] text-sm rounded-md bg-black text-white tracking-wider">
                  View Profile
                </button>
              </div>
              <div className="w-[348px] h-[194px] flex flex-col justify-between py-3 rounded-xl bg-[#FAFAFA] border-[1.5px] border-gray-400 outline-none px-4">
                <div className="w-full h-fit flex gap-4">
                  <div className="w-[56px] h-[56px] shrink-0 bg-black flex justify-center items-center rounded-md">
                    <IoBagHandleOutline color="#fff" size={28} />
                  </div>
                  <div className="w-full h-fit">
                    <p className="text-xl font-semibold text-black">
                      Deliver to
                    </p>
                    <p className="opacity-75 text-base mt-1">
                      Address:{" "}
                      {orderDetail?.address
                        ? orderDetail?.address
                        : "Dharam Colony, Palam Vihar, Gurgaon, Haryana"}
                    </p>
                  </div>
                </div>
                <button className="w-full h-[32px] text-sm rounded-md bg-black text-white tracking-wider">
                  View Profile
                </button>
              </div>
            </div>
            <div className="w-full h-auto flex gap-5">
              <div className="w-[348px] h-[154px] shrink-0 rounded-lg border-[1.5px] border-gray-400 outline-none py-3 px-4">
                <p className="text-xl font-semibold text-black">Payment Info</p>
                <div className="w-full h-fit mt-4 flex items-center">
                  <img src={card ? card : ""} alt="profile pic" />
                  <p className="opacity-75 text-base">
                    Master Card{" "}
                    {orderDetail?.cardNumber
                      ? "**** **** *" +
                        orderDetail?.cardNumber?.toString().split(1, 8)[1]
                      : "**** **** ****"}
                  </p>
                </div>
                <p className="opacity-75 text-base mt-1">
                  Business name: {orderDetail?.firstName + " " || ""}
                  {orderDetail?.lastName || ""}
                </p>
                <p className="opacity-75 text-base mt-1">
                  Phone: +91
                  {" " + orderDetail?.phoneNumber?.toString().split("91")[1] ||
                    "error"}
                </p>
              </div>
              <div className="w-full h-[120px]">
                <p className="text-xl font-semibold text-black">Note</p>
                <input
                  type="text"
                  name="note"
                  placeholder="Type some notes"
                  className="w-full h-full mt-2 pl-3 text-lg font-normal outline-none border-[1.5px] border-gray-400 rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="w-full h-auto bg-[#FAFAFA] rounded-lg px-4 mt-6 py-3">
            <div className="w-full h-[50px] flex justify-between items-center border-b-[1px]">
              <p className="text-xl font-bold text-black">Products</p>
              <BsThreeDotsVertical size={20} className="cursor-pointer" />
            </div>
            <table className="w-full h-auto mt-3">
              <tr className="grid grid-flow-row grid-cols-6 h-12 items-center border-b-2">
                <th className="text-lg font-semibold col-span-2">
                  Product Name
                </th>
                <th className="text-lg font-semibold">Order ID</th>
                <th className="text-lg font-semibold">Price</th>
                <th className="text-lg font-semibold">Quantity</th>
                <th className="text-lg font-semibold">Toatal</th>
              </tr>
              {orderDetail?.addToCart?.map((item, index) => (
                <tr
                  key={index}
                  className="w-full grid grid-flow-row grid-cols-6 h-full py-2 shrink-0 items-center text-center border-b-2"
                >
                  <td className="flex justify-start text-left pl-4 items-center col-span-2 gap-6">
                    <input type="checkbox" />
                    <img
                      src={item?.image}
                      alt="product img"
                      className="w-[40px] h-[40px] shrink-0 rounded-lg border-none bg-gray-300 outline-none mr-2"
                    />
                    <p className="w-auto h-auto text-base text-black">
                      {item?.title}
                    </p>
                  </td>
                  <td className="text-base text-black">
                    #{orderDetail?.orderId || ""}
                  </td>
                  <td className="text-base text-black">₹{item?.price}</td>
                  <td className="text-base text-black">{item?.quantity}</td>
                  <td className="text-base text-black">₹{item?.subtotal}</td>
                </tr>
              ))}
              <div className="w-fit h-auto mt-5 mr-2 flex justify-between gap-10 items-center float-right">
                <div className="flex flex-col gap-3 text-left">
                  <p className="text-lg font-normal">Subtotal</p>
                  <p className="text-lg font-normal">Tax (20%)</p>
                  <p className="text-lg font-normal">Discount</p>
                  <p className="text-lg font-normal">Sipping Rate</p>
                  <p className="text-xl font-semibold mt-2">Total</p>
                </div>
                <div className="flex flex-col gap-3 text-right">
                  <p className="text-lg font-normal">
                    ₹{orderDetail?.mainSubTotal || ""}
                  </p>
                  <p className="text-lg font-normal">
                    ₹{(orderDetail?.mainSubTotal * 20) / 100 || "0"}
                  </p>
                  <p className="text-lg font-normal">₹0</p>
                  <p className="text-lg font-normal">
                    ₹
                    {orderDetail?.shipping
                      ? orderDetail?.shipping === "Express shipping"
                        ? "15"
                        : 0 || orderDetail?.shipping === "Free shipping"
                        ? "0"
                        : 0 || orderDetail?.shipping === "Pick Up shipping"
                        ? "21"
                        : 0
                      : 0}
                  </p>
                  <p className="text-xl font-semibold mt-2">
                    ₹
                    {orderDetail?.shipping === "Fress shipping"
                      ? orderDetail?.mainSubTotal
                      : ""}
                    {orderDetail?.shipping === "Express shipping"
                      ? 15 +
                        (orderDetail?.mainSubTotal * 20) / 100 +
                        orderDetail?.mainSubTotal
                      : ""}
                    {orderDetail?.shipping === "Pick Up shipping"
                      ? 21 +
                        (orderDetail?.mainSubTotal * 20) / 100 +
                        orderDetail?.mainSubTotal
                      : ""}
                  </p>
                </div>
              </div>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
