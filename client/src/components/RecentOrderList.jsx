import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import userContext from "../contexts/UserContext";
import { CircularProgress } from "@mui/material";

const RecentOrderList = () => {
  // const orederlist = [
  //   {
  //     checked: false,
  //     productname: "Lorem Ipsum",
  //     orderId: "#25426",
  //     date: "3/29/2024",
  //     customer: {
  //       name: "Kevin",
  //       profile: "",
  //     },
  //     status: {
  //       color: "",
  //       text: "Delivered",
  //     },
  //     amount: "₹200.00",
  //   },
  //   {
  //     checked: false,
  //     productname: "Lorem Ipsum",
  //     orderId: "#25426",
  //     date: "3/29/2024",
  //     customer: {
  //       name: "Kevin",
  //       profile: "",
  //     },
  //     status: {
  //       color: "",
  //       text: "Delivered",
  //     },
  //     amount: "₹200.00",
  //   },
  //   {
  //     checked: false,
  //     productname: "Lorem Ipsum",
  //     orderId: "#25426",
  //     date: "3/29/2024",
  //     customer: {
  //       name: "Kevin",
  //       profile: "",
  //     },
  //     status: {
  //       color: "",
  //       text: "Delivered",
  //     },
  //     amount: "₹200.00",
  //   },
  //   {
  //     checked: false,
  //     productname: "Lorem Ipsum",
  //     orderId: "#25426",
  //     date: "3/29/2024",
  //     customer: {
  //       name: "Kevin",
  //       profile: "",
  //     },
  //     status: {
  //       color: "",
  //       text: "Delivered",
  //     },
  //     amount: "₹200.00",
  //   },
  //   {
  //     checked: false,
  //     productname: "Lorem Ipsum",
  //     orderId: "#25426",
  //     date: "3/29/2024",
  //     customer: {
  //       name: "Kevin",
  //       profile: "",
  //     },
  //     status: {
  //       color: "",
  //       text: "Delivered",
  //     },
  //     amount: "₹200.00",
  //   },
  //   {
  //     checked: false,
  //     productname: "Lorem Ipsum",
  //     orderId: "#25426",
  //     date: "3/29/2024",
  //     customer: {
  //       name: "Kevin",
  //       profile: "",
  //     },
  //     status: {
  //       color: "",
  //       text: "Delivered",
  //     },
  //     amount: "₹200.00",
  //   },
  //   {
  //     checked: false,
  //     productname: "Lorem Ipsum",
  //     orderId: "#25426",
  //     date: "3/29/2024",
  //     customer: {
  //       name: "Kevin",
  //       profile: "",
  //     },
  //     status: {
  //       color: "",
  //       text: "Delivered",
  //     },
  //     amount: "₹200.00",
  //   },
  //   {
  //     checked: false,
  //     productname: "Lorem Ipsum",
  //     orderId: "#25426",
  //     date: "3/29/2024",
  //     customer: {
  //       name: "Kevin",
  //       profile: "",
  //     },
  //     status: {
  //       color: "",
  //       text: "Delivered",
  //     },
  //     amount: "₹200.00",
  //   },
  // ];

  const { orderList, setOrderDetail } = useContext(userContext);
  const navigate = useNavigate();

  const handleOrderDetails = async (id) => {
    const findUser = await orderList?.orderlist?.find((i) => i._id === id);
    setOrderDetail(findUser);
    navigate("/admin/orderlist/orderdetails");
  };

  return (
    <div className="w-full h-screen bg-[#FAFAFA] rounded-2xl mt-6 px-1">
      <div className="w-full h-16 flex justify-between items-center border-b-2">
        <p className="text-2xl font-semibold text-black ml-4">Recent Orders</p>
        <BsThreeDotsVertical size={20} className="cursor-pointer" />
      </div>
      <table className="w-full h-auto">
        <tr className="w-auto h-auto py-1 grid grid-flow-row grid-cols-7 items-center border-b-2">
          <th>
            <input type="checkbox" />
          </th>
          <th className="text-lg font-semibold">Product</th>
          <th className="text-lg font-semibold">Order ID</th>
          <th className="text-lg font-semibold">Date</th>
          <th className="text-lg font-semibold">Customer Name</th>
          <th className="text-lg font-semibold">Status</th>
          <th className="text-lg font-semibold">Amount</th>
        </tr>
        {!orderList?.orderlist ? <div className="w-full h-full flex justify-center items-center"><CircularProgress/></div> : orderList?.orderlist?.map((item, index) => (
          <tr
            key={index}
            onClick={() => handleOrderDetails(item?._id)}
            className="w-auto grid grid-flow-row grid-cols-7 h-auto py-3 items-center text-center border-b-2 cursor-pointer hover:bg-gray-200"
          >
            <td>
              <input type="checkbox" />
            </td>
            <td>{item?.addToCart.map((i) => i.title[0])}</td>
            <td>#{item?.orderId || ""}</td>
            <td>{item?.createdAt?.split("T")[0]}</td>
            <td className="flex justify-center items-center">
              <img
                src={item?.image ? item?.image : ""}
                alt="profile pic"
                className="w-[24px] h-[24px] rounded-full border border-black outline-none mr-2"
              />
              {item?.firstName + " "} {item?.lastName}
            </td>
            <td className="flex justify-center items-center">
              <div
                className={`w-3 h-3 rounded-full ${
                  item?.status
                    ? item?.status === "Pennding"
                      ? "bg-[#FFA52F]"
                      : "" || item?.status === "Delivered"
                      ? "bg-green-500"
                      : "" || item?.status === "Canceled"
                      ? "bg-red-500"
                      : ""
                    : "bg-gray-200"
                } mr-1`}
              ></div>
              {item?.status || "Null"}
            </td>
            <td>₹{item?.mainSubTotal}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default RecentOrderList;
