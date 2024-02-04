import React, { useState } from "react";
import { createContext } from "react";

const userContext = createContext();

const UserProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [user, setUser] = useState([]);
  const [image, setImage] = useState(null);

  return (
    <userContext.Provider
      value={{
        image,
        setImage,
        user,
        setUser,
        search,
        setCount,
        count,
        setSearch,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default userContext;
export { UserProvider };
