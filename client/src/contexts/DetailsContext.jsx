import React, { useState } from "react";
import { createContext } from "react";

const deatilsContext = createContext();

const DetailsProvider = ({ children }) => {
  const [free, setFree] = useState();
  const [express, setExpress] = useState();
  const [pickup, setPickUp] = useState();
  const [subTotal, setSubTotal] = useState();

  return (
    <deatilsContext.Provider
      value={{
        free,
        setExpress,
        setFree,
        setPickUp,
        pickup,
        express,
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
