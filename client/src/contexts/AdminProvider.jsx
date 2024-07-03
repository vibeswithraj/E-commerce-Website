import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const adminContext = createContext();

const AdminProvider = ({ children }) => {
  const [allProductData, setAllProductData] = useState();
  const [catName, setCatName] = useState("All");
  const [date, setDate] = useState();
  const [open, setOpen] = useState(true);
  const [asideOpen, setAsideOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const cancelToken = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/allproducts?search=${catName}`,
          { withCredentials: true, cancelToken: cancelToken.token }
        );
        if (data) {
          setLoading(false);
          setAllProductData(data);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("request is cancelled");
        }
        console.log(error);
      }
    };
    fetchData();
    return () => {
      cancelToken.cancel();
    };
  }, [catName]);

  return (
    <adminContext.Provider
      value={{
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
      }}
    >
      {children}
    </adminContext.Provider>
  );
};

export default adminContext;
export { AdminProvider };
