import React, { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import axios from "axios";
import userContext from "./UserContext";
import deatilsContext from "./DetailsContext";

const productContext = createContext();

const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [addToCart, setAddToCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [allProducts, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [num, setNum] = useState(1);
  const [productDetail, setProductDetail] = useState();
  const { setUser, search } = useContext(userContext);
  let { checkbox } = useContext(userContext);
  const { setMainSubTotal } = useContext(deatilsContext);

  useEffect(() => {
    const getMainSubTotal = () => {
      const totalPrice = addToCart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      setMainSubTotal(totalPrice);
      setSubTotal(totalPrice);
    };
    getMainSubTotal();
  }, [addToCart, setMainSubTotal]);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/products?search=${search}&price=${checkbox?.price}`,
          {
            withCredentials: true,
            cancelToken: cancelToken.token,
          }
        );
        if (data) {
          setProducts(data);
          setLoading(false);
        }

        // const addtocart = localStorage.getItem("addtocart");
        // const wlist = localStorage.getItem("wishlist");
        // const user = localStorage.getItem("user");
        // setAddToCart(JSON.parse(addtocart));
        // setWishlist(JSON.parse(wlist));
        // setUser(JSON.parse(user));
        
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
  }, [search, checkbox, setProduct]);

  useEffect(() => {
    const fetchAuth = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/me`, { withCredentials: true })
        .then((res) => setUser(res.data.user))
        .catch((err) => console.log(err));
    };
    fetchAuth();
  }, [setUser]);

  // useEffect(() => {
  //   localStorage.setItem("addtocart", JSON.stringify(addToCart));
  //   localStorage.setItem("wishlist", JSON.stringify(wishlist));
  // }, [addToCart, wishlist]);

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
