import React, { useContext, useEffect } from "react";
import Profile from "../../components/Profile";
import { BsThreeDotsVertical } from "react-icons/bs";
import userContext from "../../contexts/UserContext";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import axios from "axios";
import toast from "react-hot-toast";

const Order = () => {
  const { orders, setOrders } = useContext(userContext);
  const col_span_3 = "col-span-3";
  const color = "lightgray";

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/orders`,
        {
          withCredentials: true,
        }
      );
      if (data.error) toast.error(data.error);

      if (data.orderList) setOrders(data.orderList);
    };
    fetchOrders();
  }, [setOrders]);

  return (
    <div className="w-full h-auto">
      <div className="w-full h-auto">
        <Nav />
      </div>
      <div className="mt-10 w-full h-full md:px-20 px-4 m-auto">
        <p className="text-[54px] font-medium text-center my-20">My Account</p>
        <div className="flex w-full flex-col justify-evenly sm:flex-row gap-10 mb-20">
          <div>
            <Profile />
          </div>
          <div className="sm:w-[60%] w-full h-auto bg-transparent rounded-xl px-3">
            <div className="w-full h-16 flex justify-between items-center border-b-2">
              <p className="text-2xl font-semibold text-black">Order history</p>
              <BsThreeDotsVertical size={20} className="cursor-pointer" />
            </div>
            {orders?.length === 0 && (
              <div className="w-full h-full flex justify-center items-center">
                list is empty
              </div>
            )}
            <div className="w-full h-auto">
              <div className="flex w-full h-12 justify-between items-center border-b-2">
                <span className="w-fit h-fit text-lg font-semibold">
                  Order ID
                </span>
                <span className="w-fit h-fit text-lg font-semibold">Date</span>
                <span className="w-fit h-fit text-lg font-semibold">
                  Status
                </span>
                <span className="w-fit h-fit text-lg font-semibold">
                  Amount
                </span>
              </div>
              <div className="w-full h-[394px] overflow-y-scroll scroll-smooth">
                {!orders ? (
                  <Loader col_span_3={col_span_3} color={color} />
                ) : (
                  orders?.map((item, index) => (
                    <div
                      key={index}
                      className="flex w-full h-14 justify-between text-center items-center border-b-2 cursor-pointer hover:bg-gray-200/60"
                    >
                      <span className="w-auto h-fit">#{item?.orderId}</span>
                      <span className="w-auto h-fit flex flex-col">
                        <span>{item?.createdAt.split("T")[0]}</span>
                        {/* <p>{item?.createdAt.split("T")[1].slice(0,12)}</p> */}
                      </span>
                      <div className="w-auto h-fit flex justify-center items-center">
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
                      </div>
                      <span className="w-auto h-fit">
                        ₹{item?.mainSubTotal}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Order;
