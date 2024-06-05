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
import Login from "./account/Login";
import OrderComplete from "./cart/OrderComplete";
import Product from "../components/Product";
import Dashboard from "./Dashboard";
import AllProducts from "./AllProducts";
import OrderList from "./OrderList";
import OrderDetails from "../components/OrderDetails";
import AddNewProduct from "../components/AddNewProduct";

const Home = () => {
  const allLinks = [
    {
      element: <Dashboard />,
      path: "/admin/dashboard",
    },
    {
      element: <AllProducts />,
      path: "/admin/allproducts",
    },
    {
      element: <OrderList />,
      path: "/admin/orderlist",
    },
    {
      element: <OrderDetails />,
      path: "/admin/orderlist/orderdetails",
    },
    {
      element: <AddNewProduct />,
      path: "/admin/allproducts/addnewproduct",
    },
    {
      element: <Shop />,
      path: "/shop",
    },
    {
      element: <Product />,
      path: "/product",
    },
    {
      element: <Blog />,
      path: "/blog",
    },
    {
      element: <ContactUs />,
      path: "/contact us",
    },
    {
      element: <AddToCart />,
      path: "/addtocart",
    },
    {
      element: <CheckDeatail />,
      path: "/checkoutdetails",
    },
    {
      element: <OrderComplete />,
      path: "/ordercomplete",
    },
    {
      element: <MyAcoount />,
      path: "/accountdetail/account",
    },
    {
      element: <Logout />,
      path: "/accountdetail/logout",
    },
    {
      element: <Wishlist />,
      path: "/accountdetail/yourwishlist",
    },
    {
      element: <Order />,
      path: "/accountdetail/orderhistory",
    },
    {
      element: <Address />,
      path: "/accountdetail/address",
    },
    {
      element: <Login />,
      path: "/accountdetail/login",
    },
  ];
  return (
    <>
      {allLinks.map((item, index) => (
        <Routes key={index}>
          <Route path={item?.path} element={item?.element} />
        </Routes>
      ))}
    </>
  );
};

export default Home;
