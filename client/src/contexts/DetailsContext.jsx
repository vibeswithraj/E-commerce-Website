import React, { useState } from "react";
import { createContext } from "react";

const deatilsContext = createContext();

const DetailsProvider = ({ children }) => {
  const [shipping, setShipping] = useState("Free shipping");
  const [subTotal, setSubTotal] = useState();
  const [mainSubTotal, setMainSubTotal] = useState(0);
  const [payBy, setPayBy] = useState({ paypal: false, card: false });
  const [totalOrder, setTotalOrder] = useState();
  const [status, setStatus] = useState("");

  return (
    <deatilsContext.Provider
      value={{
        status,
        setStatus,
        totalOrder,
        setTotalOrder,
        shipping,
        setShipping,
        payBy,
        setPayBy,
        mainSubTotal,
        setMainSubTotal,
        subTotal,
        setSubTotal,
      }}
    >
      {children}
    </deatilsContext.Provider>
  );
};

export default deatilsContext;
export { DetailsProvider };
