import React, { useContext, useState } from "react";
import signUpImg from "../images/SignUpImg.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Checkbox } from "@mui/material";
import userContext from "../contexts/UserContext";
import hotToast from "react-hot-toast";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SignUp = () => {
  const navigate = useNavigate();
  const { setLoading, setUser } = useContext(userContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!firstName) {
        return toast.error("Enter your name");
      }
      if (!lastName) {
        return toast.error("Enter your last name");
      }
      if (!email) {
        return toast.error("Enter your email");
      }
      if (!password) {
        return toast.error("Enter your password");
      }
      if (!checked) {
        return toast.error("Please check checkbox!");
      }
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        { firstName, lastName, email, password },
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
        if (data.message) {
          hotToast.success(data.message);
          navigate("/signin");
        }
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDemoAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        { email: "test@gmail.com", password: "test" },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data.error) return toast.error(data.error);

      if (data.message) {
        hotToast.success(data.message);
        setUser(data.oneUser);
        navigate("/home");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdminDemoAccount = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/login`,
        {
          email: "admin1@gmail.com",
          password: "admin1",
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.error) return toast.error(data.error);
      if (data.message) {
        hotToast.success(data.message);
        console.log(data.oneAdmin);
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
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
          width={"100%"}
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
        className="w-auto h-auto flex justify-center items-center flex-grow px-[9%] py-5"
      >
        <form method="POST" className="w-full h-fit flex flex-col">
          <span className="w-fit h-fit text-black text-4xl font-mono font-bold mb-4">
            Sign Up
          </span>
          <span className="w-fit h-fit text-gray-600 text-lg mb-2">
            Already have an account?{" "}
            <Link
              to={"/signin"}
              className="w-fit h-fit text-lg font-bold text-green-400 cursor-pointer"
            >
              Sign in
            </Link>
          </span>
          <span className="w-fit h-fit text-gray-600 text-lg mb-7">
            For Admin only?{" "}
            <Link
              to={"/admin/register"}
              className="w-fit h-fit text-lg font-bold text-green-400 cursor-pointer"
            >
              Sign Up
            </Link>
          </span>
          <input
            name="firstName"
            type="text"
            required
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full h-auto outline-none focus-within:shadow rounded focus-within:bg-gray-100/40 -ml-2 p-2 shadow-sm mb-5 text-lg"
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full h-auto outline-none focus-within:shadow rounded focus-within:bg-gray-100/40 -ml-2 p-2 shadow-sm mb-5 text-lg"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-auto outline-none focus-within:shadow rounded focus-within:bg-gray-100/40 -ml-2 p-2 shadow-sm mb-5 text-lg"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-auto outline-none focus-within:shadow rounded focus-within:bg-gray-100/40 -ml-2 p-2 shadow-sm mb-5 text-lg"
          />
          <div className="w-fit h-fit mb-8 flex items-center gap-4">
            <Checkbox
              id="checkbox"
              name="checkbox"
              type="checkbox"
              required
              value={checked}
              onChange={() => setChecked((prev) => !prev)}
              className="w-5 h-5 shadow-sm text-lg"
            />
            <label htmlFor="checkbox" className="text-base text-gray-500/80">
              I agree with{" "}
              <span className="text-black text-base font-semibold">
                Privacy Policy
              </span>{" "}
              and{" "}
              <span className="text-black text-base font-semibold">
                Terms of Use
              </span>
            </label>
          </div>
          <button
            className="w-full h-[48px] text-white text-lg bg-black rounded-lg"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <button
            className="w-full h-[48px] text-black text-lg hover:bg-gray-200/70 border-[1.50px] border-black hover:z-10 rounded-lg mt-5 relative overflow-hidden transition-all ease-linear duration-500"
            onClick={handleDemoAccount}
          >
            Login with demo account
          </button>
          <button
            className="w-full h-[48px] text-black text-lg hover:bg-gray-200/70 border-[1.50px] border-black hover:z-10 rounded-lg mt-5 relative overflow-hidden transition-all ease-linear duration-500"
            onClick={handleAdminDemoAccount}
          >
            Admin Login with demo account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
