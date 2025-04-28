import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/register`,
        {
          firstName: formData?.firstName,
          lastName: formData?.lastName,
          email: formData?.email,
          password: formData?.password,
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
        toast.success(data.message);
        navigate("/admin/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {/* <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up to your account
        </h2>
      </div> */}

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form method="POST" onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First name *
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData?.firstName}
                onChange={handleOnChange}
                placeholder="Enter first name"
                className="block w-full px-3 outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last name *
            </label>
            <div className="mt-2">
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData?.lastName}
                onChange={handleOnChange}
                placeholder="Enter last name"
                className="block w-full px-3 outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address *
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData?.email}
                onChange={handleOnChange}
                placeholder="Enter email"
                className="block w-full px-3 outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password *
              </label>
              <div className="text-sm">
                <Link
                  to="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="my-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData?.password}
                onChange={handleOnChange}
                placeholder="Enter password"
                className="block w-full px-3 outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <span className="w-fit h-fit text-gray-600 text-lg mb-2">
            Already have an account?{" "}
            <Link
              to={"/admin/login"}
              className="w-fit h-fit text-lg font-bold text-green-400 cursor-pointer"
            >
              Sign in
            </Link>
          </span>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-2 text-base font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
