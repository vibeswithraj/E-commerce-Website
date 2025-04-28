import React, { useContext, useState } from "react";
import signUpImg from "../images/SignUpImg.png";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import hotToast from "react-hot-toast";
import userContext from "../contexts/UserContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SignIn = () => {
  const { setUser } = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  useGSAP(() => {
    gsap.to("#name", {
      y: 0,
      opacity: 1,
      duration: 1.5,
      delay: 1,
      ease: "expo",
    });
    gsap.from("#left", {
      x: "-100%",
      duration: 1,
      delay: 0.2,
      ease: "power1.inOut",
    });
    gsap.from("#right", {
      x: "100%",
      duration: 1,
      delay: 0.2,
      ease: "power1.inOut",
    });
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        return toast.error("Enter your email and password!");
      }
      if (!checked) {
        return toast.error("Please check checkbox!");
      }
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        //toast.success(data.message);
        hotToast.success(data.message);
        setUser(data.oneUser);
        //localStorage.setItem("user", JSON.stringify(data.oneUser));
        navigate("/shop");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen flex flex-wrap">
      <div
        id="left"
        className="w-auto h-full bg-gray-100 relative flex flex-grow items-start justify-center"
      >
        <img
          src={signUpImg || ""}
          width={"50%"}
          height={"100%"}
          className="w-full h-full object-contain"
          alt="img"
        />
        <div className="w-fit h-full absolute top-5">
          <p
            id="name"
            className="w-fit translate-y-[-100%] opacity-0 h-full text-4xl tracking-widest text-black font-meduim"
          >
            3legant
          </p>
        </div>
      </div>
      <div
        id="right"
        className="w-auto h-auto flex flex-grow justify-center items-center px-[9%] py-5"
      >
        <form action="" method="post" className="w-full h-fit flex flex-col">
          <span className="w-fit text-black text-4xl font-mono font-bold mb-4">
            Sign In
          </span>
          <span className="h-fit text-gray-600 text-lg mb-7">
            Don’t have an accout yet?{" "}
            <Link
              to={"/signup"}
              className="text-lg font-bold text-green-400 cursor-pointer"
            >
              Sign Up
            </Link>
          </span>
          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-auto outline-none focus-within:shadow rounded focus-within:bg-gray-100/40 -ml-2 p-2 shadow-sm mb-5 text-lg"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-auto outline-none focus-within:shadow rounded focus-within:bg-gray-100/40 -ml-2 p-2 shadow-sm mb-5 text-lg"
          />
          <div className="w-full h-fit mb-8 flex items-center justify-between">
            <div className="w-fit h-fit flex items-center gap-4">
              <Checkbox
                id="checkbox"
                name="checkbox"
                type="checkbox"
                value={checked}
                onChange={() => setChecked((prev) => !prev)}
                className="w-5 h-5 shadow-sm text-lg"
              />
              <label
                htmlFor="checkbox"
                className="w-fit h-fit text-base text-gray-500/80"
              >
                Remember me
              </label>
            </div>
            <span className="w-fit h-fit text-black text-base font-semibold cursor-pointer">
              Forgot password?
            </span>
          </div>
          <button
            className="w-full h-[48px] text-white text-lg bg-black rounded-lg"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
