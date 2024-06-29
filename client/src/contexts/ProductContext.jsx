import React, { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import axios from "axios";
import userContext from "./UserContext";
import deatilsContext from "./DetailsContext";
//import { mainsubTotal } from "./productSlice";
//import {  useSelector } from "react-redux";

const productContext = createContext();

const ProductProvider = ({ children }) => {
  const [subTotal, setSubTotal] = useState(0);
  const [addToCart, setAddToCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [allProducts, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [num, setNum] = useState(1);
  const [productDetail, setProductDetail] = useState();
  const { setUser } = useContext(userContext);
  const { setMainSubTotal } = useContext(deatilsContext);
  // const addToCart = useSelector(state=>state.addToCart)
  // const wishlist = useSelector(state=>state.wishlist)
  //const dispatch = useDispatch();


  useEffect(() => {
    const getMainSubTotal = () => {
      const totalPrice = addToCart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      setMainSubTotal(totalPrice);
      setSubTotal(totalPrice);
    };
    getMainSubTotal();
    //dispatch(mainsubTotal())
  }, [addToCart, setMainSubTotal]);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   try {
  //     setLoading(true);
  //     //setTimeout(() => {
  //     axios
  //       .get(
  //         `http://localhost:5050/products?search=${search}&price=${checkbox?.price}`,
  //         {
  //           withCredentials: true,
  //           signal: controller.signal,
  //         }
  //       )
  //       .then((res) => {
  //         setProducts(res.data);
  //         setLoading(false);
  //       })
  //       .catch((err) => console.log(err));
  //     //}, 3000);
  //     // const addtocart = localStorage.getItem("addtocart");
  //     // const wlist = localStorage.getItem("wishlist");
  //     // const user = localStorage.getItem("user");
  //     // setAddToCart(JSON.parse(addtocart));
  //     // setWishlist(JSON.parse(wlist));
  //     // setUser(JSON.parse(user));
  //   } catch (error) {
  //     if (axios.isCancel(error)) {
  //       console.log("request is cancelled", error);
  //       return;
  //     }
  //     console.log(error);
  //   }
  //   return () => {
  //     controller.abort();
  //   };
  // }, [setUser, setLoading, search, checkbox]);

  useEffect(() => {
    const fetchAuth = () => {
      axios
        .get("http://localhost:5050/me", { withCredentials: true })
        .then((res) => setUser(res.data.user))
        .catch((err) => console.log(err));
    };
    fetchAuth();
  }, [setUser]);

  useEffect(() => {
    localStorage.setItem("addtocart", JSON.stringify(addToCart));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [addToCart, wishlist]);

  return (
    <productContext.Provider
      value={{
        productDetail,
        setProductDetail,
        subTotal,
        allProducts,
        setProducts,
        num,
        setNum,
        product,
        setProduct,
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
