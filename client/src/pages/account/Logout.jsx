import React, { useContext } from "react";
import Profile from "../../components/Profile";
import axios from "axios";
//import { toast } from "react-toastify";
import hotToast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import userContext from "../../contexts/UserContext";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(userContext);

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("http://localhost:5050/logout", {
        withCredentials: true,
      });
      if (data.error) {
        hotToast.error(data.error);
      } else {
        //toast.success(data.message);
        hotToast.success(data.message);
        localStorage.clear();
        setUser(null);
        navigate("/shop");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Nav />
      <div className="mt-10 w-full sm:px-40 md:px-20 px-8 m-auto">
        <p className="text-[54px] font-medium text-center my-20">My Account</p>
        <div className="flex w-full flex-col justify-evenly sm:flex-row gap-10 mb-20">
          <div>
            <Profile />
          </div>
          <div className="flex sm:w-[707px] justify-center items-center w-full">
            <button
              className="w-[183px] h-[52px] m-auto mt-6 px-10 py-3 bg-[#141718] rounded-lg text-white"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Logout;
