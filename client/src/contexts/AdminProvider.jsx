import React, { createContext, useState } from "react";

const adminContext = createContext();

const AdminProvider = ({ children }) => {
  const [allProductData, setAllProductData] = useState();
  const [catName, setCatName] = useState("All");
  const [date, setDate] = useState();
  const [open, setOpen] = useState(true);
  const [asideOpen, setAsideOpen] = useState(false);

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
      }}
    >
      {children}
    </adminContext.Provider>
  );
};

export default adminContext;
export { AdminProvider };
