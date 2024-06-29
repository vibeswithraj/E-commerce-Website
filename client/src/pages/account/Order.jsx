import React, { useContext } from "react";
import Profile from "../../components/Profile";
import { BsThreeDotsVertical } from "react-icons/bs";
import userContext from "../../contexts/UserContext";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

const Order = () => {
  const { user, orderList } = useContext(userContext);

  return (
    <div className="w-full h-auto">
      <div className="w-full h-auto">
        <Nav />
      </div>
      <div className="mt-10 w-full h-full sm:px-40 md:px-20 px-8 m-auto">
        <p className="text-[54px] font-medium text-center my-20">My Account</p>
        <div className="flex w-full flex-col justify-evenly sm:flex-row gap-10 mb-20">
          <div>
            <Profile />
          </div>
          <div className="sm:w-[707px] w-full h-auto bg-transparent rounded-xl px-3">
            <div className="w-full h-16 flex justify-between items-center border-b-2">
              <p className="text-2xl font-semibold text-black">Order history</p>
              <BsThreeDotsVertical size={20} className="cursor-pointer" />
            </div>
            {!user?.firstName ? (
              <div className="w-full h-full flex justify-center items-center">
                list is empty
              </div>
            ) : (
              <table className="w-full h-auto">
                <tr className="grid grid-flow-row grid-cols-4 h-12 items-center border-b-2">
                  <th className="text-lg font-semibold">Order ID</th>
                  <th className="text-lg font-semibold">Date</th>
                  <th className="text-lg font-semibold">Status</th>
                  <th className="text-lg font-semibold">Amount</th>
                </tr>
                {orderList.orderlist?.map((item, index) => (
                  <tr
                    key={index}
                    className="grid grid-flow-row grid-cols-4 h-14 items-center text-center border-b-2 cursor-pointer hover:bg-gray-200"
                  >
                    <td>#{item?.orderId}</td>
                    <td className="w-auto flex flex-col">
                      <p>{item?.createdAt.split("T")[0]}</p>
                      {/* <p>{item?.createdAt.split("T")[1].slice(0,12)}</p> */}
                    </td>
                    <td className="flex justify-center items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          item?.status
                            ? item?.status === "Pennding"
                              ? "bg-orange-300"
                              : "" || item?.status === "Delivered"
                              ? "bg-green-300"
                              : "" || item?.status === "Canceled"
                              ? "bg-red-500"
                              : ""
                            : "bg-gray-300"
                        } mr-1`}
                      ></div>
                      {item?.status ? item?.status : "Null"}
                    </td>
                    <td>₹{item?.mainSubTotal}</td>
                  </tr>
                ))}
              </table>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Order;
