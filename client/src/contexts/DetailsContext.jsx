import React, { useState } from "react";
import { createContext } from "react";

const deatilsContext = createContext();

const DetailsProvider = ({ children }) => {
  const [shipping, setShipping] = useState("Free shipping");
  const [subTotal, setSubTotal] = useState();
  const [mainSubTotal, setMainSubTotal] = useState(0);
  const [payByCard, setPayByCard] = useState("Card");
  const [paypal, setPaypal] = useState("Paypal");
  const [totalOrder, setTotalOrder] = useState();
  const [status, setStatus] = useState("");
  const [asideOpen, setAsideOpen] = useState(false);

  return (
    <deatilsContext.Provider
      value={{
        asideOpen,
        setAsideOpen,
        status,
        setStatus,
        totalOrder,
        setTotalOrder,
        shipping,
        setShipping,
        payByCard,
        setPayByCard,
        paypal,
        setPaypal,
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
