import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const AdminRegister = lazy(() => import("../pages/AdminRegister.jsx"));
const AdminLogin = lazy(() => import("../pages/AdminLogin.jsx"));
const MainPage = lazy(() => import("../pages/MainPage.jsx"));
const AllProducts = lazy(() => import("../pages/AllProducts.jsx"));
const Blog = lazy(() => import("../pages/Blog.jsx"));
const ContactUs = lazy(() => import("../pages/ContactUs.jsx"));
const Dashboard = lazy(() => import("../pages/Dashboard.jsx"));
const OrderList = lazy(() => import("../pages/OrderList.jsx"));
const Shop = lazy(() => import("../pages/Shop.jsx"));
const SignIn = lazy(() => import("../pages/SignIn.jsx"));
const SignUp = lazy(() => import("../pages/SignUp.jsx"));
const MyAcoount = lazy(() => import("./account/MyAcoount.jsx"));
const Address = lazy(() => import("./account/Address.jsx"));
const Login = lazy(() => import("./account/Login.jsx"));
const Logout = lazy(() => import("./account/Logout.jsx"));
const Order = lazy(() => import("./account/Order.jsx"));
const Wishlist = lazy(() => import("./account/Wishlist.jsx"));
const AddToCart = lazy(() => import("./cart/AddToCart.jsx"));
const CheckDeatail = lazy(() => import("./cart/CheckDeatail.jsx"));
const OrderComplete = lazy(() => import("./cart/OrderComplete.jsx"));
const AddNewProduct = lazy(() => import("../components/AddNewProduct.jsx"));
const OrderDetails = lazy(() => import("../components/OrderDetails.jsx"));
const Product = lazy(() => import("../components/Product.jsx"));

const Home = () => {
  return (
    <Suspense
      fallback={
        <Backdrop sx={{ color: "#fff" }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    >
      <Routes>
        <Route path={"/"} element={<SignUp />} />
        
        {/* Pages */}
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/signin"} element={<SignIn />} />
        <Route path={"/home"} element={<MainPage />} />
        <Route path={"/shop"} element={<Shop />} />
        <Route path={"/blog"} element={<Blog />} />
        <Route path={"/contactus"} element={<ContactUs />} />

        {/* Product Details */}
        <Route path={"/product/:id"} element={<Product />} />

        {/* Admin */}
        <Route path={"/admin/register"} element={<AdminRegister />} />
        <Route path={"/admin/login"} element={<AdminLogin />} />
        <Route path={"/admin/dashboard"} element={<Dashboard />} />
        <Route path={"/admin/allproducts"} element={<AllProducts />} />
        <Route path={"/admin/orderlist"} element={<OrderList />} />
        <Route path={"/admin/orderlist/orderdetails"} element={<OrderDetails />} />
        <Route path={"/admin/allproducts/addnewproduct"} element={<AddNewProduct />} />

        {/* Account */}
        <Route path={"/accountdetail/orderhistory"} element={<Order />} />
        <Route path={"/accountdetail/account"} element={<MyAcoount />} />
        <Route path={"/accountdetail/login"} element={<Login />} />
        <Route path={"/accountdetail/logout"} element={<Logout />} />
        <Route path={"/accountdetail/address"} element={<Address />} />
        <Route path={"/accountdetail/yourwishlist"} element={<Wishlist />} />

        {/* Cart */}
        <Route path={"/cart/checkoutdetails"} element={<CheckDeatail />} />
        <Route path={"/cart/ordercomplete"} element={<OrderComplete />} />
        <Route path={"/cart/addtocart"} element={<AddToCart />} />
      </Routes>
    </Suspense>
  );
};

export default Home;
