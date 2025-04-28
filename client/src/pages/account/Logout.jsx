import React, { useContext } from "react";
import Profile from "../../components/Profile";
import axios from "axios";
import hotToast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import userContext from "../../contexts/UserContext";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

const Logout = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/logout`,
        {
          withCredentials: true,
        }
      );
      if (data.error) hotToast.error(data.error);
      else {
        //toast.success(data.message);
        hotToast.success(data.message);
        localStorage.clear();
        setUser(null);
        navigate("/signup");
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
      <div className="mt-10 w-full md:px-20 px-4 m-auto">
        <p className="text-[54px] font-medium text-center my-20">My Account</p>
        <div className="flex w-full flex-col justify-evenly sm:flex-row gap-10 mb-20">
          <div>
            <Profile />
          </div>
          <div className="flex sm:w-[60%] justify-center items-center w-full">
            <button
              id="btn"
              className={
                user?.firstName
                  ? "w-[183px] h-[52px] m-auto mt-6 px-10 py-3 bg-[#141718] rounded-lg text-white"
                  : "w-[183px] h-[52px] m-auto mt-6 px-10 py-3 bg-[#141718] cursor-not-allowed opacity-70 rounded-lg text-white"
              }
              onClick={handleLogout}
              disabled={user?.firstName ? false : true}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Logout;
