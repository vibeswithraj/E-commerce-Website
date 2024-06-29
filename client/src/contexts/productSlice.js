import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addToCart: [],
  wishlist: [],
  mainSubTotal: 0,
  count: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
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
      const newcart = state.addToCart.filter((i) => i.id !== action.payload);
      return { ...state, addToCart: newcart, count: state.count - 1 };
    },

    mainsubTotal: (state, action) => {
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
