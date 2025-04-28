import React, { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import deatilsContext from "./DetailsContext";

const productContext = createContext();

const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [addToCart, setAddToCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [allProducts, setProducts] = useState([]);
  const [num, setNum] = useState(1);
  const [productDetail, setProductDetail] = useState();
  const { setMainSubTotal } = useContext(deatilsContext);

  useEffect(() => {
    const getMainSubTotal = () => {
      const totalPrice = addToCart?.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      setMainSubTotal(totalPrice);
      setSubTotal(totalPrice);
    };
    getMainSubTotal();
  }, [addToCart, setMainSubTotal]);

  return (
    <productContext.Provider
      value={{
        loading,
        setLoading,
        productDetail,
        setProductDetail,
        subTotal,
        allProducts,
        setProducts,
        num,
        setNum,
        addToCart,
        setAddToCart,
        wishlist,
        setWishlist,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default productContext;
export { ProductProvider };
