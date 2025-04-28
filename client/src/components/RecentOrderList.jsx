import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CircularProgress } from "@mui/material";

const RecentOrderList = ({ orderList, setOrderDetail }) => {
  const navigate = useNavigate();

  const handleOrderDetails = async (id) => {
    const findUser = await orderList?.find((i) => i._id === id);
    setOrderDetail(findUser);
    navigate("/admin/orderlist/orderdetails");
  };

  return (
    <div className="w-full h-screen overflow-y-scroll scroll-smooth bg-[#FAFAFA] shadow-md rounded-xl mt-6 px-1">
      <div className="w-full h-16 flex justify-between items-center border-b-2">
        <p className="text-2xl font-semibold text-black ml-4">Recent Orders</p>
        <BsThreeDotsVertical size={20} className="cursor-pointer mr-2" />
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
        {!orderList ? (
          <div className="w-full h-[500px] flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : orderList?.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center">
            <span>list is empty.</span>
          </div>
        ) : (
          orderList?.map((item, index) => (
            <tr
              key={index}
              onClick={() => handleOrderDetails(item?._id)}
              className="w-auto grid grid-flow-row grid-cols-7 h-auto py-3 items-center text-center border-b-2 cursor-pointer hover:bg-gray-200/60"
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
                    item?.status && item?.status === "Pennding"
                      ? "bg-[#FFA52F]"
                      : "" || item?.status === "Delivered"
                      ? "bg-green-500"
                      : "" || item?.status === "Canceled"
                      ? "bg-red-500"
                      : ""
                  } mr-1`}
                ></div>
                {item?.status || "Null"}
              </td>
              <td>₹{item?.mainSubTotal}</td>
            </tr>
          ))
        )}
      </table>
    </div>
  );
};

export default RecentOrderList;
