import React, { useContext, useState } from "react";
import Profile from "../../components/Profile";
import axios from "axios";
import { toast } from "react-toastify";
import userContext from "../../contexts/UserContext.jsx";
// import Loader from "../../components/Loader.jsx";
import Nav from "../../components/Nav.jsx";
import Footer from "../../components/Footer.jsx";
import { Link } from "react-router-dom";

const MyAcoount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPass, setOldPassword] = useState("");
  const [newPass, setNewPassword] = useState("");
  const [repeatPass, setRepeatPassword] = useState("");
  const { user, show, loading } = useContext(userContext);

  const handleSaveChange = async (e) => {
    e.preventDefault();
    if (user.email === "demo1@gmail.com") {
      return toast.error("demo user can't change password!");
    }
    try {
      const { data } = await axios.post(
        `http://localhost:5050/updatePass`,
        { email: user.email, oldPass, newPass, repeatPass },
        {
          withCredentials: true,
        }
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
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
      <div
        className={
          show || loading
            ? "pt-10 w-full h-auto relative sm:px-40 md:px-20 px-8 m-auto myAccount"
            : "mt-10 w-full h-auto sm:px-40 md:px-20 px-8 m-auto"
        }
      >
        <p className="text-[54px] font-medium text-center my-20">My Account</p>
        <div className="flex w-full flex-col justify-evenly sm:flex-row gap-10 mb-20">
          <div>
            <Profile />
          </div>
          <div className="flex sm:w-[707px] w-full flex-col gap-10">
            <div
              className={
                show || loading
                  ? "absolute flex justify-center items-center visible top-0 left-0 w-full h-screen bg-otp"
                  : "hidden"
              }
            ></div>
            <form
              className="w-full justify-center h-fit"
              action=""
              method="post"
            >
              <p className="text-xl font-semibold">Account Details</p>
              <ul className="mt-6 flex flex-col gap-6">
                <li>
                  <label
                    htmlFor="first name"
                    className="text-xs font-bold text-[#6C7275] uppercase"
                  >
                    First name *
                  </label>
                  <div className="border-[#CBCBCB] border sm:w-[707px] w-full h-10 rounded-md flex items-center">
                    <input
                      type="text"
                      placeholder="FIRST NAME"
                      name="firstName"
                      value={firstName || user?.firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="px-4 w-full bg-transparent text-base font-normal text-[#6C7275] outline-none border-none"
                    />
                  </div>
                </li>
                <li>
                  <label
                    htmlFor="last name"
                    className="text-xs font-bold text-[#6C7275] uppercase"
                  >
                    last name *
                  </label>
                  <div className="border-[#CBCBCB] border sm:w-[707px] w-full h-10 rounded-md flex items-center">
                    <input
                      type="text"
                      placeholder="LAST NAME"
                      name="lastName"
                      value={lastName || user?.lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="px-4 w-full bg-transparent text-base font-normal text-[#6C7275] outline-none border-none"
                    />
                  </div>
                </li>
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
                      value={email || user?.email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-4 w-full bg-transparent text-base font-normal text-[#6C7275] outline-none border-none"
                    />
                  </div>
                </li>
                <li>
                  <div className="flex gap-3 text-lg mt-2">
                    <p>register with another account</p>
                    <Link
                      className="text-blue-500 underline text-lg"
                      to={"/signup"}
                    >
                      sign up
                    </Link>
                  </div>
                </li>
              </ul>
            </form>
            {user?.firstName && (
              <form
                className="sm:w-[707px] w-full h-auto"
                method="post"
                onSubmit={handleSaveChange}
              >
                <p className="text-xl font-semibold mt-10">Password</p>
                <ul className="mt-6 flex flex-col gap-6">
                  <li>
                    <label
                      htmlFor="first name"
                      className="text-xs font-bold text-[#6C7275] uppercase"
                    >
                      Old password
                    </label>
                    <div className="border-[#CBCBCB] border sm:w-[707px] w-full h-10 rounded-md flex items-center">
                      <input
                        type="text"
                        placeholder="Old password"
                        value={oldPass}
                        onChange={(e) => setOldPassword(e.target.value)}
                        name="oldPassword"
                        className="px-4 w-full bg-transparent text-base font-normal text-[#6C7275] outline-none border-none"
                      />
                    </div>
                  </li>
                  <li>
                    <label
                      htmlFor="first name"
                      className="text-xs font-bold text-[#6C7275] uppercase"
                    >
                      new password
                    </label>
                    <div className="border-[#CBCBCB] border sm:w-[707px] w-full h-10 rounded-md flex items-center">
                      <input
                        type="text"
                        placeholder="New password"
                        value={newPass}
                        onChange={(e) => setNewPassword(e.target.value)}
                        name="newPassword"
                        className="px-4 w-full bg-transparent text-base font-normal text-[#6C7275] outline-none border-none"
                      />
                    </div>
                  </li>
                  <li>
                    <label
                      htmlFor="first name"
                      className="text-xs font-bold text-[#6C7275] uppercase"
                    >
                      REPEAT NEW PASSWORD
                    </label>
                    <div className="border-[#CBCBCB] border sm:w-[707px] w-full h-10 rounded-md flex items-center">
                      <input
                        type="text"
                        placeholder="Repeat new password"
                        value={repeatPass}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        name="reNewPass"
                        className="px-4 w-full bg-transparent text-base font-normal text-[#6C7275] outline-none border-none"
                      />
                    </div>
                  </li>
                </ul>
                <button className="w-[183px] h-[52px] mt-6 px-10 py-3 bg-[#141718] rounded-lg text-white">
                  Save changes
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyAcoount;
