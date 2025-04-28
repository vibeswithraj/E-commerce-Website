import Aside from "../components/Aside";
import { useContext, useEffect } from "react";
import RecentOrderList from "../components/RecentOrderList";
import AdminNav from "../components/AdminNav";
import AdminFooter from "../components/AdminFooter";
import adminContext from "../contexts/AdminProvider";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderList = () => {
  const { date, open, setOpen, setOrderList, orderList, setOrderDetail } =
    useContext(adminContext);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/orderDetails`
        );
        setOrderList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, [setOrderList]);

  return (
    <>
      <div className="w-full h-full flex">
        <Aside />
        <div className="w-full h-auto relative">
          <AdminNav />
          <div className="bg-[#e7e7e3] shadow-md w-full h-fit px-4 pt-5 pb-7">
            <div className="w-full h-[54px] flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold text-black">Order list</p>
                <p className="text-base font-normal text-black font-sans">
                  <Link to={"/admin/dashboard"}>Home</Link> {">"} order list
                </p>
              </div>
              <div>
                <input
                  type="date"
                  value={date}
                  className="bg-transparent cursor-pointer"
                />
              </div>
            </div>
            <RecentOrderList
              orderList={orderList}
              setOrderDetail={setOrderDetail}
            />
          </div>
          <div
            className={
              !open
                ? `absolute w-full visible h-full bg-[rgb(0,0,0,0.3)] border-none outline-none top-[80px] left-0 z-10 transition ease-in duration-300`
                : "absolute w-full invisible h-full bg-[rgb(0,0,0,0.3)] border-none outline-none top-[80px] left-0 z-10 transition ease-in duration-300"
            }
            onClick={() => setOpen((prev) => !prev)}
          ></div>
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default OrderList;
