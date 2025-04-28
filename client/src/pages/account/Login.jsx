import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Profile from "../../components/Profile";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../../contexts/UserContext.jsx";
import { useContext } from "react";
import hotToast from "react-hot-toast";
import Nav from "../../components/Nav.jsx";
import Footer from "../../components/Footer.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(userContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        return toast.error("Enter your email and password!");
      }
      const { data } = await axios.post(
        "http://localhost:5050/login",
        { email, password },
        { withCredentials: true }
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        //toast.success(data.message);
        hotToast.success(data.message);
        setUser(data.oneUser);
        localStorage.setItem("user", JSON.stringify(data.oneUser));
        navigate("/shop");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-auto">
      <div className="w-full h-auto">
        <Nav />
      </div>
      <div className="pt-10 w-full h-auto sm:px-40 md:px-20 px-8 m-auto login">
        <p className="text-[54px] font-medium text-center my-20">My Account</p>
        <div className="flex w-full flex-col justify-evenly sm:flex-row gap-10 mb-20">
          <div>
            <Profile />
          </div>
          <div className="flex sm:w-[60%] w-full flex-col gap-10">
            <form
              className="w-full justify-center h-[325px]"
              action=""
              method="post"
              onSubmit={handleLogin}
            >
              <p className="text-xl font-semibold">Account Details</p>
              <ul className="mt-6 flex flex-col gap-6">
                <li>
                  <label
                    htmlFor="email"
                    className="text-xs font-bold text-[#6C7275] uppercase"
                  >
                    Email *
                  </label>
                  <div className="border-[#CBCBCB] border sm:w-[707px] w-full h-10 rounded-md flex items-center">
                    <input
                      type="email"
                      placeholder="EMAIL"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-4 w-full bg-transparent text-base font-normal text-[#6C7275] outline-none border-none"
                    />
                  </div>
                </li>
                <li>
                  <label
                    htmlFor="password"
                    className="text-xs font-bold text-[#6C7275] uppercase"
                  >
                    Password *
                  </label>
                  <div className="border-[#CBCBCB] border sm:w-[707px] w-full h-10 rounded-md flex items-center">
                    <input
                      type="password"
                      placeholder="PASSWORD"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="px-4 w-full bg-transparent text-base font-normal text-[#6C7275] outline-none border-none"
                    />
                  </div>
                </li>
              </ul>
              <button className="w-[183px] h-[52px] mt-6 px-10 py-3 bg-[#141718] rounded-lg text-white text-lg">
                Login
              </button>
              <div className="flex gap-3 text-lg mt-2">
                <p>register with another account</p>
                <Link
                  className="text-blue-500 underline text-lg"
                  to={"/accountdetail/account"}
                >
                  sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
