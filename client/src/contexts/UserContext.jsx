import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import deatilsContext from "./DetailsContext";
import axios from "axios";

const userContext = createContext();

const UserProvider = ({ children }) => {
  const [search, setSearch] = useState("All");
  let [checkbox, setCheckbox] = useState({ id: 0, price: "All price" });
  const [count, setCount] = useState(0);
  const [user, setUser] = useState([]);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [orderDetail, setOrderDetail] = useState({});

  const { setTotalOrder } = useContext(deatilsContext);

  useEffect(() => {
    const getOrederListTotal = () => {
      const totalPrice = orderList?.orderlist?.reduce((total, item) => {
        return total + item.mainSubTotal;
      }, 0);
      setTotalOrder(totalPrice);
    };
    getOrederListTotal();
  }, [orderList, setTotalOrder]);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/orderDetails`);
        setOrderList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, []);

  return (
    <userContext.Provider
      value={{
        checkbox,
        setCheckbox,
        //change,
        orderDetail,
        setOrderDetail,
        orderList,
        setOrderList,
        otp,
        setOtp,
        show,
        setShow,
        image,
        setImage,
        user,
        setUser,
        search,
        setCount,
        count,
        setSearch,
        loading,
        setLoading,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default userContext;
export { UserProvider };
