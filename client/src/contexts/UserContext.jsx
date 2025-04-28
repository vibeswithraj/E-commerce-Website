import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";

const userContext = createContext();

const UserProvider = ({ children }) => {
  const [search, setSearch] = useState("All");
  let [checkbox, setCheckbox] = useState({ id: 0, price: "All price" });
  const [count, setCount] = useState(0);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState([]);
  const [checkOutDetail, setCheckOutDetail] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchAuth = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/me`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(data);
      if (data.error) {
        return toast.error(data.error);
      }
      if (data.user) {
        setUser(data.user);
        console.log(data.user);
      }
    };
    fetchAuth();
  }, [setUser]);

  return (
    <userContext.Provider
      value={{
        checkbox,
        setCheckbox,
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
        orders,
        setOrders,
        checkOutDetail,
        setCheckOutDetail,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default userContext;
export { UserProvider };
