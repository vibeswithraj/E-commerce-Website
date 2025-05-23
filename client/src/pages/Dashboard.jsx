import Aside from "../components/Aside";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import RecentOrderList from "../components/RecentOrderList";
import AdminFooter from "../components/AdminFooter.jsx";
import { BarChart } from "@mui/x-charts/BarChart";
import adminContext from "../contexts/AdminProvider.jsx";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const {
    date,
    setDate,
    open,
    setOpen,
    loading,
    totalOrder,
    setTotalOrder,
    orderList,
    setOrderList,
    canOrders,
    setCanOrders,
    actOrders,
    setActOrders,
    comOrders,
    setComOrders,
    setOrderDetail,
    bestSeller,
    setBestSeller,
  } = useContext(adminContext);
  const [options, setoptions] = useState({
    weekly: true,
    monthly: false,
    yearly: false,
  });

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

  const canOrderList = orderList?.filter((item) => item.status === "Canceled");
  const actOrderList = orderList?.filter((item) => item.status === "Pennding");
  const comOrderList = orderList?.filter((item) => item.status === "Delivered");

  const handleBtn = (name) => {
    if (name === "weekly") {
      setoptions({ weekly: true, monthly: false, yearly: false });
    }
    if (name === "monthly") {
      setoptions({ weekly: false, monthly: true, yearly: false });
    }
    if (name === "yearly") {
      setoptions({ weekly: false, monthly: false, yearly: true });
    }
  };

  useEffect(() => {
    const getTotalOrederList = async () => {
      const totalPrice = await orderList?.reduce((total, item) => {
        return total + item.mainSubTotal;
      }, 0);
      setTotalOrder(totalPrice);
    };
    getTotalOrederList();
  }, [orderList, setTotalOrder]);

  useEffect(() => {
    const getCanOrderList = async () => {
      const totalPrice = await canOrderList?.reduce((total, item) => {
        return total + item.mainSubTotal;
      }, 0);
      setCanOrders(totalPrice);
    };
    getCanOrderList();
  }, [canOrderList, setCanOrders]);

  useEffect(() => {
    const getActOrderList = async () => {
      const totalPrice = await actOrderList?.reduce((total, item) => {
        return total + item.mainSubTotal;
      }, 0);
      setActOrders(totalPrice);
    };
    getActOrderList();
  }, [actOrderList, setActOrders]);

  useEffect(() => {
    const getComOrderList = async () => {
      const totalPrice = await comOrderList?.reduce((total, item) => {
        return total + item.mainSubTotal;
      }, 0);
      setComOrders(totalPrice);
    };
    getComOrderList();
  }, [comOrderList, setComOrders]);

  useEffect(() => {
    const fetchBestSeller = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/bestsellers`,
          { withCredentials: true }
        );
        setBestSeller(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBestSeller();
  }, [setBestSeller]);

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
          <div className="w-full bg-[#e7e7e3] h-auto px-4 pt-5 pb-7">
            <div className="w-full h-[54px] flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold text-black">Dashboard</p>
                <p className="text-base font-normal text-black font-sans">
                  <Link to={"/admin/dashboard"}>Home</Link> {">"} dashboard
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
              className={`w-full h-[165px] flex justify-between items-start gap-4 overflow-x-scroll mt-6`}
            >
              <div className="w-full h-[149px] shadow-md flex flex-col justify-between py-2 px-3 rounded-2xl bg-[#FAFAFA]">
                <p className="w-fit h-auto text-base font-semibold text-black">
                  Total Orders
                </p>
                <div className="w-full h-auto flex justify-between px-2 items-center">
                  <p className="text-lg font-bold text-black">
                    ₹{totalOrder?.toFixed() || "0"}
                  </p>
                  <div
                    className="circle relative flex justify-center items-center w-[90px] h-[90px] outline-none opacity-85 bg-gray-200 rounded-full"
                    style={{
                      background: `conic-gradient(${
                        orderList?.length && orderList?.length < 33.33
                          ? "#FF000D" // Red
                          : "" || orderList?.length > 33.33
                          ? "#ffa52f" // Orange
                          : "" ||
                            (orderList?.length > 33.33 &&
                              orderList?.length > 66.66)
                          ? "#3CD41A" // Green
                          : ""
                      } ${
                        (orderList?.length / 100) * 360
                      }deg,rgb(237, 234, 238) 0)`,
                    }}
                  >
                    <p className="w-fit h-auto text-base font-bold text-black opacity-85 z-10">
                      {(orderList?.length * orderList?.length) / 100 || "0"}%
                    </p>
                  </div>
                </div>
                <p className="opacity-80 text-sm">{date}</p>
              </div>
              <div className="w-full h-[149px] shadow-md flex flex-col justify-between py-2 px-3 rounded-2xl bg-[#FAFAFA]">
                <p className="w-fit h-auto text-base font-semibold text-black">
                  Active Orders
                </p>
                <div className="w-full h-auto flex justify-between px-2 items-center">
                  <p className="text-lg font-bold text-black">
                    ₹{actOrders?.toFixed()}
                  </p>
                  <div
                    className="circle relative flex justify-center items-center w-[90px] h-[90px] outline-none opacity-85 bg-gray-200 rounded-full"
                    style={{
                      background: `conic-gradient(${
                        orderList?.length && actOrderList?.length < 33.33
                          ? "#FF000D"
                          : "" ||
                            (actOrderList?.length < 66.66 &&
                              actOrderList?.length > 33.33)
                          ? "#ffa52f"
                          : "" || actOrderList?.length > 66.66
                          ? "#3CD41A"
                          : ""
                      } ${
                        (actOrderList?.length / 100) * 360
                      }deg,rgb(237, 234, 238) 0)`,
                    }}
                  >
                    <p className="w-fit h-auto text-base font-bold text-black opacity-85 z-10">
                      {(actOrderList?.length * actOrderList?.length) / 100 ||
                        "0"}
                      %
                    </p>
                  </div>
                </div>
                <p className="opacity-80 text-sm">{date}</p>
              </div>
              <div className="w-full h-[149px] shadow-md flex flex-col justify-between py-2 px-3 rounded-2xl bg-[#FAFAFA]">
                <p className="w-fit h-auto text-base font-semibold text-black">
                  Completed Orders
                </p>
                <div className="w-full h-auto flex justify-between px-2 items-center">
                  <p className="text-lg font-bold text-black">
                    ₹{comOrders?.toFixed() || "0"}
                  </p>
                  <div
                    className="circle relative flex justify-center items-center w-[90px] h-[90px] outline-none opacity-85 bg-gray-200 rounded-full"
                    style={{
                      background: `conic-gradient(${
                        orderList?.length && comOrderList?.length < 33.33
                          ? "#FF000D"
                          : "" || comOrderList?.length > 33.33
                          ? "#ffa52f"
                          : "" ||
                            (comOrderList?.length > 33.33 &&
                              comOrderList?.length > 66.66)
                          ? "#3CD41A"
                          : ""
                      } ${
                        (comOrderList?.length / 100) * 360
                      }deg,rgb(237, 234, 238) 0)`,
                    }}
                  >
                    <p className="w-fit h-auto text-base font-bold text-black opacity-85 z-10">
                      {(comOrderList?.length * comOrderList?.length) / 100 ||
                        "0"}
                      %
                    </p>
                  </div>
                </div>
                <p className="opacity-80 text-sm">{date}</p>
              </div>
              <div className="w-full h-[149px] shadow-md flex flex-col justify-between py-2 px-3 rounded-2xl bg-[#FAFAFA]">
                <p className="w-fit h-auto text-base font-semibold text-black">
                  Canceled Orders
                </p>
                <div className="w-full h-auto flex justify-between px-2 items-center">
                  <p className="h-auto text-lg font-bold text-black">
                    ₹{canOrders?.toFixed() || "0"}
                  </p>
                  <div
                    className="circle relative flex justify-center items-center w-[90px] h-[90px] outline-none opacity-85 bg-gray-200 rounded-full"
                    style={{
                      background: `conic-gradient(${
                        orderList?.length && canOrderList?.length < 33.33
                          ? "#FF000D"
                          : "" ||
                            (canOrderList?.length > 33.33 &&
                              canOrderList?.length < 66.66)
                          ? "#ffa52f"
                          : "" || canOrderList?.length > 66.66
                          ? "#3CD41A"
                          : ""
                      } ${
                        (canOrderList?.length / 100) * 360
                      }deg,rgb(237, 234, 238) 0)`,
                    }}
                  >
                    <p className="w-fit h-auto text-base font-bold text-black opacity-85 z-10">
                      {(canOrderList?.length * canOrderList?.length) / 100 ||
                        "0"}
                      %
                    </p>
                  </div>
                </div>
                <p className="opacity-80 text-sm">{date}</p>
              </div>
            </div>
            <div className="w-full h-auto mt-3 grid grid-cols-3 gap-4">
              <div className="w-full h-[460px] bg-[#FAFAFA] shadow-md rounded-2xl py-1 col-span-2">
                <div className="w-full h-[60px] border-b-2 flex px-4 justify-between items-center">
                  <div>
                    <p className="text-xl font-semibold text-black">
                      Sale Graph
                    </p>
                  </div>
                  <div className="flex gap-3">
                    {allLinks?.map((item) => (
                      <div
                        key={item?.name}
                        className={
                          (options.weekly && item?.name === "weekly") ||
                          (options.monthly && item?.name === "monthly") ||
                          (options.yearly && item?.name === "yearly")
                            ? "bg-black text-white w-[90px] h-[32px] rounded-lg text-center text-xs font-normal border border-black uppercase cursor-pointer hover:bg-black hover:text-white flex justify-center items-center transition-all duration-200 ease-linear outline-none"
                            : "w-[90px] h-[32px] rounded-lg text-center text-xs font-normal border border-black uppercase cursor-pointer hover:bg-black hover:text-white flex justify-center items-center transition-all duration-200 ease-linear outline-none"
                        }
                        onClick={() => handleBtn(item?.name)}
                      >
                        {item?.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full h-[420px]">
                  <BarChart
                    // width={}
                    // height={420}
                    series={[
                      {
                        data: options.weekly
                          ? weeklyData_1
                          : "" || options.monthly
                          ? monthlyData_1
                          : "" || (!options.weekly && !options.monthly)
                          ? yearlyData_1
                          : "",
                        label: "Revenue",
                        id: "pvId",
                      },
                      {
                        data: options.weekly
                          ? weeklyData_2
                          : "" || options.monthly
                          ? monthlyData_2
                          : "" || (!options.weekly && !options.monthly)
                          ? yearlyData_2
                          : "",
                        label: "Transaction",
                        id: "uvId",
                      },
                    ]}
                    xAxis={[
                      {
                        data: options.weekly
                          ? weeks
                          : "" || options.monthly
                          ? months
                          : "" || (!options.weekly && !options.monthly)
                          ? years
                          : "",
                        scaleType: "band",
                      },
                    ]}
                    // yAxis={[{data,scaleType:"band"}]}
                  />
                </div>
              </div>
              <div className="w-full h-[460px] bg-[#FAFAFA] shadow-md rounded-2xl px-4 py-1">
                <div className="w-full h-[60px] flex justify-between items-center border-b-2">
                  <p className="text-xl font-semibold text-black">
                    Best Sellers
                  </p>
                  <BsThreeDotsVertical size={20} className="cursor-pointer" />
                </div>
                <div className="w-full h-[390px] flex flex-col overflow-y-scroll scroll-smooth">
                  {loading ? (
                    <div className="w-full h-full flex justify-center items-center">
                      <CircularProgress />
                    </div>
                  ) : (
                    bestSeller?.map((item, index) => (
                      <div
                        className="w-full h-auto flex items-center justify-between gap-3 border-b border-gray-400/50 py-4 cursor-pointer"
                        key={index}
                      >
                        <div className="w-full h-auto flex items-center gap-4 justify-start">
                          <div className="w-[64px] h-[64px] shrink-0 rounded-lg flex items-center">
                            <img
                              src={item?.image || ""}
                              width={64}
                              height={64}
                              className="w-[64px] h-[64px] shrink-0 rounded-lg"
                              alt="img"
                            />
                          </div>
                          <div className="w-auto h-auto flex flex-col gap-1">
                            <span className="text-sm text-black font-medium">
                              {item?.title || ""}
                            </span>
                            <span className="text-sm text-black">
                              ₹{item?.price || ""}
                            </span>
                          </div>
                        </div>
                        <div className="w-fit whitespace-nowrap h-auto flex flex-col gap-1 items-end">
                          <span className="text-base text-black font-semibold">
                            ₹{item?.price || ""}
                          </span>
                          <span className="text-base text-gray-600">
                            {item?.sales + " Sales"}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
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

export default Dashboard;
