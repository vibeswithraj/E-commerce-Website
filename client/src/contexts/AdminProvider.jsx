import React, { createContext, useState } from "react";

const adminContext = createContext();

const AdminProvider = ({ children }) => {
  const [allProductData, setAllProductData] = useState();
  const [catName, setCatName] = useState("All");
  const [date, setDate] = useState();
  const [open, setOpen] = useState(true);
  const [asideOpen, setAsideOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [orderDetail, setOrderDetail] = useState({});
  const [totalOrder, setTotalOrder] = useState();
  const [canOrders, setCanOrders] = useState();
  const [actOrders, setActOrders] = useState();
  const [comOrders, setComOrders] = useState();

  return (
    <adminContext.Provider
      value={{
        totalOrder,
        setTotalOrder,
        orderList,
        setOrderList,
        orderDetail,
        setOrderDetail,
        allProductData,
        setAllProductData,
        catName,
        setCatName,
        date,
        setDate,
        open,
        setOpen,
        asideOpen,
        setAsideOpen,
        loading,
        setLoading,
        canOrders,
        setCanOrders,
        actOrders,
        setActOrders,
        comOrders,
        setComOrders,
        bestSeller,
        setBestSeller,
      }}
    >
      {children}
    </adminContext.Provider>
  );
};

export default adminContext;
export { AdminProvider };
