import React, { useEffect, useState } from 'react';
import Profile from '../../components/Profile';
import { BiEditAlt } from 'react-icons/bi';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import axios from 'axios';

const Address = () => {
  const [details, setDetails] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/address`,
          { withCredentials: true }
        );

        // if (data.error) return toast.error(data.error);

        setDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
          <div className="sm:w-[60%] w-full flex flex-wrap justify-start gap-1 items-start h-auto">
            <div className="sm:w-[350px] w-full h-auto p-3 rounded-lg border-[1.5px] shadow-md">
              <div className="w-full flex justify-between">
                <p className="text-lg font-semibold">Billing Address</p>
                <button className="flex items-center">
                  <BiEditAlt className="mr-1" />
                  Edit
                </button>
              </div>
              <p className="w-full text-lg mt-3">
                {details?.address &&
                  details?.firstName + ' ' + details?.lastName}
              </p>
              <p className="w-full text-lg mt-1">
                +91 {details?.address && details?.number}
              </p>
              <p className="w-full text-lg mt-1">
                Address: {details?.address && details?.address}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Address;
