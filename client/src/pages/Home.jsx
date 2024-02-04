import Nav from "../components/Nav";
import AddToCart from "./cart/AddToCart";
import Blog from "./Blog";
import ContactUs from "./ContactUs";
import { Route, Routes } from "react-router-dom";
import MyAcoount from "./account/MyAcoount";
import Logout from "./account/Logout";
import Wishlist from "./account/Wishlist";
import Order from "./account/Order";
import Address from "./account/Address";
import Shop from "./Shop";
import CheckDeatail from "./cart/CheckDeatail";
import Footer from "../components/Footer";
import Login from "./account/Login";
import OrderComplete from "./cart/OrderComplete";
import Product from "../components/Product";

const Home = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product" element={<Product />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact us" element={<ContactUs />} />
        <Route path="/addtocart" element={<AddToCart />} />
        <Route path="/checkoutdetails" element={<CheckDeatail />} />
        <Route path="/ordercomplete" element={<OrderComplete />} />
        <Route path="/accountdetail/account" element={<MyAcoount />} />
        <Route path="/accountdetail/logout" element={<Logout />} />
        <Route path="/accountdetail/yourwishlist" element={<Wishlist />} />
        <Route path="/accountdetail/orderhistory" element={<Order />} />
        <Route path="/accountdetail/address" element={<Address />} />
        <Route path="/accountdetail/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Home;
