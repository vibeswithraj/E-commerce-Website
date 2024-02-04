// import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
// import axios from "axios";

// const initialState = {
//   addToCart: [],
//   wishlist: [],
//   mainSubTotal: 0,
//   count: 0,
// };

// export const productSlice = createSlice({
//   name: "product",
//   initialState,
//   reducers: {
//     addtocart: async (state, action) => {
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
//     },
//     addtowishlist: async (state, action) => {
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
//     },
//     incrise: (state, action) => {
//       let updateCart = state.addToCart.map((curElem) => {
//         if (curElem.id === action.payload.pid) {
//           curElem = { ...curElem, quantity: curElem.quantity + 1 };
//           return { ...curElem, subtotal: curElem.price * curElem.quantity };
//         }
//         return curElem;
//       });
//       return { ...state, addToCart: updateCart };
//     },
//     dicrise: (state, action) => {
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
//     },
//     remove: (state, action) => {
//       const newcart = state.addToCart.filter(
//         (i) => i.id !== action.payload.pid
//       );
//       state.count = { ...state, count: state.count - 1 };
//       return { ...state, addToCart: newcart };
//     },
//     mainsubTotal: (state) => {
//       const mainSub = state.addToCart.reduce((total, item) => {
//         return total + item.price * item.quantity;
//       }, 0);
//       return { ...state, mainSubTotal: mainSub };
//     },
//     removeWlist: (state,action) => {
//       const newcart = state.wishlist.filter(
//         (i) => i.id !== action.payload.id
//       );
//       return { ...state, wishlist: newcart };
//     }
//   },
// });

// export const {addtocart,addtowishlist,incrise,dicrise,remove,mainsubTotal,removeWlist} = productSlice.actions;
// export default productSlice.reducer