import { NavLink } from "react-router-dom";
import Aside from "../components/Aside";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useContext, useState } from "react";
import productsContext from "../contexts/ProductContext";
// import { BarChart } from "../components/Charts.tsx";
import AdminNav from "../components/AdminNav";
import RecentOrderList from "../components/RecentOrderList";
import AdminFooter from "../components/AdminFooter.jsx";
import deatilsContext from "../contexts/DetailsContext.jsx";
import userContext from "../contexts/UserContext.jsx";
// import { IoArrowUpOutline } from "react-icons/io5";
import { BarChart } from "@mui/x-charts/BarChart";

const Dashboard = () => {
  const { date, setDate, open, setOpen } = useContext(productsContext);
  const { totalOrder } = useContext(deatilsContext);
  const { orderList } = useContext(userContext);
  const [weekly, setWeekly] = useState(true);
  const [monthly, setMonthly] = useState(false);
  const [yearly, setYearly] = useState(false);

  const allLinks = [
    {
      id: 1,
      name: "weekly",
      //path: "/admin/dashboard",
    },
    {
      id: 2,
      name: "monthly",
      //path: "/admin/dashboard",
    },
    {
      id: 3,
      name: "yearly",
      //path: "/admin/dashboard",
    },
  ];

  const handleBtn = (name) => {
    if (name === "weekly") {
      setWeekly(true);
      setMonthly(false);
      setYearly(false);
    }
    if (name === "monthly") {
      setMonthly(true);
      setWeekly(false);
      setYearly(false);
    }
    if (name === "yearly") {
      setYearly(true);
      setWeekly(false);
      setMonthly(false);
    }
  };

  const weeklyData_1 = [300, 144, 433, 655, 237, 755, 190];
  const weeklyData_2 = [200, 444, 343, 556, 778, 455, 990];
  const monthlyData_1 = [
    300, 144, 433, 655, 237, 755, 190, 300, 144, 433, 655, 237,
  ];
  const monthlyData_2 = [
    200, 444, 343, 556, 778, 455, 990, 200, 444, 343, 556, 778,
  ];
  const yearlyData_1 = [300, 144, 433, 655];
  const yearlyData_2 = [200, 444, 343, 556];

  const weeks = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Augest",
    "September",
    "Octomber",
    "November",
    "December",
  ];
  const years = ["2020-2021", "2021-2022", "2022-2023", "2023-2024"];

  return (
    <>
      <div className="w-full h-auto flex relative">
        <Aside />
        <div className={"w-full h-auto relative"}>
          <AdminNav />
          <div className="w-full bg-[#e7e7e3] h-auto px-4 py-5">
            <div className="w-full h-[54px] flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold text-black">Dashboard</p>
                <p className="text-base font-normal text-black font-sans">
                  Home {">"} dashboard
                </p>
              </div>
              <div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-transparent cursor-pointer outline-none border-none"
                />
              </div>
            </div>
            <div
              className={`w-full h-[149px] flex justify-between gap-8 overflow-x-scroll mt-6`}
            >
              <div className="w-[266px] h-full flex flex-col justify-between py-2 px-3 rounded-2xl bg-[#FAFAFA]">
                <p className="w-fit h-auto text-base font-semibold text-black">
                  Total Orders
                </p>
                <div className="w-full h-auto flex justify-between px-2 items-center">
                  <div>
                    <p className="text-lg font-bold text-black">
                      ₹{totalOrder?.toFixed() || 0}
                    </p>
                  </div>
                  <div
                    className="circle relative flex justify-center items-center w-[90px] h-[90px] outline-none opacity-85 bg-gray-200 rounded-full"
                    style={{
                      background: `conic-gradient(${
                        orderList?.orderlist?.length
                          ? orderList?.orderlist?.length < 33.33
                            ? "#FF000D" // Red
                            : "" || orderList?.orderlist?.length > 33.33
                            ? "#ffa52f" // Orange
                            : "" ||
                              (orderList?.orderlist?.length > 33.33 &&
                                orderList?.orderlist?.length > 66.66)
                            ? "#3CD41A" // Green
                            : ""
                          : ""
                      } ${
                        (orderList?.orderlist?.length / 100) * 360
                      }deg,rgb(237, 234, 238) 0)`,
                    }}
                  >
                    <p className="w-fit h-auto text-base font-bold text-black opacity-85 z-10">
                      {(orderList?.orderlist?.length *
                        orderList?.orderlist?.length) /
                        100 || 0}
                      %
                    </p>
                  </div>
                </div>
                <p className="opacity-80 text-sm">{date}</p>
              </div>
              <div className="w-[266px] h-full flex flex-col justify-between py-2 px-3 rounded-2xl bg-[#FAFAFA]">
                <p className="w-fit h-auto text-base font-semibold text-black">
                  Active Orders
                </p>
                <div className="w-full h-auto flex justify-between px-2 items-center">
                  <div>
                    <p className="text-lg font-bold text-black">₹{100000}</p>
                  </div>
                  <div
                    className="circle relative flex justify-center items-center w-[90px] h-[90px] outline-none opacity-85 bg-gray-200 rounded-full"
                    style={{
                      background: `conic-gradient(${
                        orderList?.orderlist?.length
                          ? 70 < 33.33
                            ? "#FF000D"
                            : "" || (70 < 66.66 && 70 > 33.33)
                            ? "#ffa52f"
                            : "" || 70 > 66.66
                            ? "#3CD41A"
                            : ""
                          : ""
                      } ${(70 / 100) * 360}deg,rgb(237, 234, 238) 0)`,
                    }}
                  >
                    <p className="w-fit h-auto text-base font-bold text-black opacity-85 z-10">
                      {70}%
                    </p>
                  </div>
                </div>
                <p className="opacity-80 text-sm">{date}</p>
              </div>
              <div className="w-[266px] h-full flex flex-col justify-between py-2 px-3 rounded-2xl bg-[#FAFAFA]">
                <p className="w-fit h-auto text-base font-semibold text-black">
                  Completed Orders
                </p>
                <div className="w-full h-auto flex justify-between px-2 items-center">
                  <div>
                    <p className="text-lg font-bold text-black">
                      ₹{totalOrder?.toFixed() || 0}
                    </p>
                  </div>
                  <div
                    className="circle relative flex justify-center items-center w-[90px] h-[90px] outline-none opacity-85 bg-gray-200 rounded-full"
                    style={{
                      background: `conic-gradient(${
                        orderList?.orderlist?.length
                          ? orderList?.orderlist?.length < 33.33
                            ? "#FF000D"
                            : "" || orderList?.orderlist?.length > 33.33
                            ? "#ffa52f"
                            : "" ||
                              (orderList?.orderlist?.length > 33.33 &&
                                orderList?.orderlist?.length > 66.66)
                            ? "#3CD41A"
                            : ""
                          : ""
                      } ${
                        (orderList?.orderlist?.length / 100) * 360
                      }deg,rgb(237, 234, 238) 0)`,
                    }}
                  >
                    <p className="w-fit h-auto text-base font-bold text-black opacity-85 z-10">
                      {orderList?.orderlist?.length || 0}%
                    </p>
                  </div>
                </div>
                <p className="opacity-80 text-sm">{date}</p>
              </div>
              <div className="w-[266px] h-full flex flex-col justify-between py-2 px-3 rounded-2xl bg-[#FAFAFA]">
                <p className="w-fit h-auto text-base font-semibold text-black">
                  Return Orders
                </p>
                <div className="w-full h-auto flex justify-between px-2 items-center">
                  <div>
                    <p className="text-lg font-bold text-black">₹{60000}</p>
                  </div>
                  <div
                    className="circle relative flex justify-center items-center w-[90px] h-[90px] outline-none opacity-85 bg-gray-200 rounded-full"
                    style={{
                      background: `conic-gradient(${
                        orderList?.orderlist?.length
                          ? 60 < 33.33
                            ? "#FF000D"
                            : "" || (60 > 33.33 && 60 < 66.66)
                            ? "#ffa52f"
                            : "" || 60 > 66.66
                            ? "#3CD41A"
                            : ""
                          : ""
                      } ${(60 / 100) * 360}deg,rgb(237, 234, 238) 0)`,
                    }}
                  >
                    <p className="w-fit h-auto text-base font-bold text-black opacity-85 z-10">
                      {60}%
                    </p>
                  </div>
                </div>
                <p className="opacity-80 text-sm">{date}</p>
              </div>
            </div>
            <div className="w-full h-auto mt-6 grid grid-cols-3 gap-4">
              <div className="w-full h-[460px] bg-[#FAFAFA] rounded-2xl py-1 col-span-2">
                <div className="w-full h-[60px] border-b-2 flex px-4 justify-between items-center">
                  <div>
                    <p className="text-xl font-semibold text-black">
                      Sale Graph
                    </p>
                  </div>
                  <div className="flex gap-3">
                    {allLinks?.map((item) => (
                      <NavLink
                        key={item?.name}
                        className={
                          (weekly && item?.id === 1) ||
                          (monthly && item?.id === 2) ||
                          (yearly && !weekly && item?.id === 3)
                            ? "bg-black text-white w-[90px] h-[32px] rounded-lg text-center text-sm font-normal border border-black uppercase cursor-pointer hover:bg-black hover:text-white flex justify-center items-center transition-all duration-200 ease-linear outline-none"
                            : "w-[90px] h-[32px] rounded-lg text-center text-sm font-normal border border-black uppercase cursor-pointer hover:bg-black hover:text-white flex justify-center items-center transition-all duration-200 ease-linear outline-none"
                        }
                        onClick={() => handleBtn(item.name)}
                      >
                        {item?.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
                <div className="w-full h-[420px]">
                  <BarChart
                    // width={}
                    // height={420}
                    series={[
                      {
                        data:
                          weekly && !monthly && !yearly
                            ? weeklyData_1
                            : "error" || (yearly && !weekly)
                            ? yearlyData_1
                            : monthlyData_1,
                        label: "Revenue",
                        id: "pvId",
                      },
                      {
                        data:
                          weekly && !monthly && !yearly
                            ? weeklyData_2
                            : "error" || (yearly && !weekly)
                            ? yearlyData_2
                            : monthlyData_2,
                        label: "Transaction",
                        id: "uvId",
                      },
                    ]}
                    xAxis={[
                      {
                        data:
                          weekly && !monthly && !yearly
                            ? weeks
                            : "error" || (yearly && !weekly)
                            ? years
                            : months,
                        scaleType: "band",
                      },
                    ]}
                    // yAxis={[{data,scaleType:"band"}]}
                  />
                </div>
              </div>
              <div className="w-full h-[460px] bg-[#FAFAFA] rounded-2xl px-4 py-1">
                <div className="w-full h-[60px] flex justify-between items-center border-b-2">
                  <p className="text-xl font-semibold text-black">
                    Best Sellers
                  </p>
                  <BsThreeDotsVertical size={20} className="cursor-pointer" />
                </div>
                <p className="w-full h-full flex justify-center items-center">
                  empty
                </p>
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

export default Dashboard;
