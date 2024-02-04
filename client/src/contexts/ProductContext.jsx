import React, { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import axios from "axios";
import userContext from "./UserContext";
//import { useReducer } from "react";
// import {useDispatch} from "react-redux"
// import { addtocart } from "./productSlice";

const productContext = createContext();

const ProductProvider = ({ children }) => {
  const [addToCart, setAddToCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [mainSubTotal, setMainSubTotal] = useState();
  const [allProducts, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [num, setNum] = useState(1);

  const { setUser, setLoading } = useContext(userContext);
  //const dispatch = useDispatch();

  // const initialState = {
  //   addToCart: [],
  //   wishlist: [],
  //   mainSubTotal: 0,
  //   count: 0,
  // };
  // const reducer = async (state, action) => {
  //   switch (action.type) {
  //     case "ADDTOCART":
  //       try {
  //         const { data } = await axios.get(
  //           `http://localhost:5050/addtocart/${action.payload.pid}`,
  //           { withCredentials: true }
  //         );
  //         if (data.error) {
  //           console.log(data.error);
  //         }
  //         const alreadyAdded = await state.addToCart.find(
  //           (i) => i.id === action.payload.pid
  //         );
  //         if (!alreadyAdded) {
  //           // setAddToCart([...state.addToCart, data]);
  //           state.addToCart.push([...state.addToCart, data]);
  //           state.count = { ...state, count: state.count + 1 };
  //         } else {
  //           toast.error("Already added!");
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //       return { ...state, addToCart: state.addToCart };

  //     case "ADDTOWISHLIST":
  //       try {
  //         const { data } = await axios.get(
  //           `http://localhost:5050/wishlist/${action.payload.pid}`
  //         );
  //         const alreadyAdded = await state.wishlist.find(
  //           (i) => i.id === action.payload.pid
  //         );
  //         if (!alreadyAdded) {
  //           // setWishlist([...state.wishlist, data]);
  //           state.wishlist.push([...state.wishlist, data]);
  //         } else {
  //           toast.error("Already added!");
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //       return { ...state, wishlist: state.wishlist };

  //     case "MAINSUBTOTAL":
  //     const mainSub = state.addToCart.reduce((total, item) => {
  //       return total + item.price * item.quantity;
  //     }, 0);
  //     return { ...state, mainSubTotal: mainSub };

  //     case "INCRISE":
  //       let updateCart = state.addToCart.map((curElem) => {
  //         if (curElem.id === action.payload.pid) {
  //           curElem = { ...curElem, quantity: curElem.quantity + 1 };
  //           return { ...curElem, subtotal: curElem.price * curElem.quantity };
  //         }
  //         return curElem;
  //       });
  //       return { ...state, addToCart: updateCart };

  //     case "DICRISE":
  //       let updateCartTwo = state.addToCart
  //         .map((curElem) => {
  //           if (curElem.id === action.payload.pid) {
  //             curElem = {
  //               ...curElem,
  //               subtotal: curElem.quantity * curElem.price - curElem.price,
  //             };
  //             return { ...curElem, quantity: curElem.quantity - 1 };
  //           }
  //           return curElem;
  //         })
  //         .filter((curElem) => {
  //           if (curElem.quantity === 0) {
  //             state.count = state.addToCart.length - 1;
  //           }
  //           return curElem.quantity !== 0;
  //         });
  //       return { ...state, wishlist: updateCartTwo };

  //     case "DELETE":
  //       const newcart = state.addToCart.filter(
  //         (i) => i.id !== action.payload.pid
  //       );
  //       state.count = { ...state, count: state.count - 1 };
  //       return { ...state, addToCart: newcart };
  //     default:
  //       return state;
  //   }
  // };
  // const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getMainSubTotal = () => {
      const totalPrice = addToCart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      setMainSubTotal(totalPrice);
    };
    getMainSubTotal();
  }, [addToCart]);

  useEffect(() => {
    try {
      setLoading(true);
      const fetchProductsAndUser = () => {
        axios
          .get("http://localhost:5050/data", { withCredentials: true })
          .then((res) => {
            setProducts(res.data.products);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      };
      fetchProductsAndUser();
      const addtocart = localStorage.getItem("addtocart");
      const wlist = localStorage.getItem("wishlist");
      const user = localStorage.getItem("user");
      setAddToCart(JSON.parse(addtocart));
      setWishlist(JSON.parse(wlist));
      setUser(JSON.parse(user));
    } catch (error) {
      console.log(error);
    }
  }, [setUser,setLoading]);

  // useEffect(() => {
  //   const fetchAuth = () => {
  //     axios
  //       .get("http://localhost:5050/me",{withCredentials: true})
  //       .then((res) => console.log(res.data))
  //       .catch((err) => console.log(err));
  //   };
  //   fetchAuth();
  // }, []);

  useEffect(() => {
    localStorage.setItem("addtocart", JSON.stringify(addToCart));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [addToCart, wishlist]);

  return (
    <productContext.Provider
      value={{
        //...state,
        addToCart,
        setAddToCart,
        wishlist,
        setWishlist,
        allProducts,
        //dispatch,
        mainSubTotal,
        setMainSubTotal,
        num,
        setNum,
        product,
        setProduct,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default productContext;
export { ProductProvider };
