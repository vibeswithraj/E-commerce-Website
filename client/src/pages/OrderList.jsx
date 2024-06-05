import Aside from "../components/Aside";
import { useContext } from "react";
import productsContext from "../contexts/ProductContext";
import RecentOrderList from "../components/RecentOrderList";
import AdminNav from "../components/AdminNav";
import AdminFooter from "../components/AdminFooter";

const OrderList = () => {
  const { date, open, setOpen } = useContext(productsContext);

  return (
    <>
      <div className="w-full h-full flex">
        <Aside />
        <div className="w-full h-auto relative">
          <AdminNav />
          <div className="bg-[#e7e7e3] w-full h-fit px-4 py-5">
            <div className="w-full h-[54px] flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold text-black">Order list</p>
                <p className="text-base font-normal text-black font-sans">
                  Home {">"} order list
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
            <RecentOrderList />
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
