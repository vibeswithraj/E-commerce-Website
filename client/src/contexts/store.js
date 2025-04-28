import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice.js";
const store = configureStore({ reducer: productSlice });
export default store;
