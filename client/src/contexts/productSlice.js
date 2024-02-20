import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  addToCart: [
    //   {
    //     title: "DANVOUY Womens T Shirt Casual Cotton Short",
    //     quantity: 1,
    //     category: "women's clothing",
    //     description: "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
    //     id: 20,
    //     image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    //     price: 12.99,
    //     like: false,
    //     subtotal: 12.99,
    //     rating: {
    //       count: 145,
    //       rate: 3.6
    //     },
    // }
  ],
  wishlist: [],
  mainSubTotal: 0,
  count: 0,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addtocart: async (state, action) => {
      try {
        const { data } = await axios.get(
          `http://localhost:5050/addtocart/${action.payload}`,
          { withCredentials: true }
        );
        if (data.error) {
          console.log(data.error);
        }
        const alreadyAdded = await state.addToCart.find(
          (i) => i.id === action.payload
        );
        if (!alreadyAdded) {
          // const cart = state.addToCart.push([...state.addToCart,data]);
          //state.addToCart.push([...state.addToCart,data]);
          return { ...state, addToCart: state.addToCart.push([...state.addToCart,data]), count: state.count + 1 };
        } else {
          toast.error("Already added!");
        }
      } catch (err) {
        console.log(err);
      }
    },

    addtowishlist: async (state, action) => {
      try {
        const { data } = await axios.get(
          `http://localhost:5050/wishlist/${action.payload}`
        );
        const alreadyAdded = await state.wishlist.find(
          (i) => i.id === action.payload
        );
        if (!alreadyAdded) {
          state.wishlist.push([...state.wishlist, data]);
        } else {
          toast.error("Already added!");
        }
      } catch (err) {
        console.log(err);
      }
    },

    incrise: (state, action) => {
      const updateCart = state.addToCart.map((curElem) => {
        if (curElem.id === action.payload) {
          curElem = { ...curElem, quantity: curElem.quantity + 1 };
          return { ...curElem, subtotal: curElem.price * curElem.quantity };
        }
        return curElem;
      });
      return { ...state, addToCart: updateCart };
    },

    dicrise: (state, action) => {
      const updateCartTwo = state.addToCart
        .map((curElem) => {
          if (curElem.id === action.payload) {
            curElem = {
              ...curElem,
              subtotal: curElem.quantity * curElem.price - curElem.price,
            };
            return { ...curElem, quantity: curElem.quantity - 1 };
          }
          return curElem;
        })
        .filter((curElem) => {
          if (curElem.quantity === 0) {
            return { ...state, count: state.count - 1 };
          }
          return curElem.quantity !== 0;
        });
      return { ...state, wishlist: updateCartTwo };
    },

    remove: (state, action) => {
      const newcart = state.addToCart.filter(
        (i) => i.id !== action.payload
      );
      return { ...state, addToCart: newcart, count: state.count - 1 };
    },

    mainsubTotal: (state,action) => {
      const mainSub = state.addToCart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      return { ...state, mainSubTotal: mainSub };
    },

    removeWlist: (state, action) => {
      const newcart = state.wishlist.filter((i) => i.id !== action.payload);
      return { ...state, wishlist: newcart };
    },
  },
});

export const {
  addtocart,
  addtowishlist,
  incrise,
  dicrise,
  remove,
  mainsubTotal,
  removeWlist,
} = productSlice.actions;
export default productSlice.reducer;
