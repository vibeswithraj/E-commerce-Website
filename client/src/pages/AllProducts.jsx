import Aside from "../components/Aside";
import { FiPlusCircle } from "react-icons/fi";
import { IoArrowUpOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
// import { products } from "../assets/ProductsData";
import { useContext } from "react";
import AdminNav from "../components/AdminNav";
import { CircularProgress } from "@mui/material";
import adminContext from "../contexts/AdminProvider"; 

const AllProducts = () => {
  const { allProductData,isLoading, open, setOpen } = useContext(adminContext);

  // #FF000D
  return (
    <div className="w-full h-full flex">
      <Aside />
      <div className="w-full h-auto relative">
        <AdminNav />
        <div className="bg-[#e7e7e3] w-full h-auto mx-auto px-4 py-5">
          <div className="w-full h-[54px] flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-black">All Products</p>
              <p className="text-base font-normal text-black font-sans">
                Home {">"} all products
              </p>
            </div>
            <div>
              <Link
                to={"/admin/allproducts/addnewproduct"}
                className="w-[212px] h-[48px] bg-black text-white text-sm font-semibold uppercase rounded-md flex justify-center items-center"
              >
                <FiPlusCircle size={16} className="mr-2" />
                ADD NEW PRODUCT
              </Link>
            </div>
          </div>
          <div className="w-full h-auto flex flex-wrap justify-center mx-auto gap-6 mt-6">
            {isLoading ? (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress />
              </div>
            ) : (
              allProductData?.map((items, index) => (
                <div
                  key={index}
                  className="w-[360px] min-h-[300px] max-h-full rounded-2xl cursor-pointer flex flex-col justify-between bg-[#FAFAFA] p-3 hover:scale-105 hover:shadow-lg transition-all ease-out duration-300"
                >
                  <div className="w-full h-full border flex gap-6">
                    <img
                      src={items?.image}
                      className="w-[80px] h-[80px] rounded-md shrink-0"
                      alt="img"
                    />
                    <div className="w-full h-full">
                      <p className="text-base font-semibold text-black text-wrap">
                        {items?.title}
                      </p>
                      <div>
                        <p className="text-sm font-semibold opacity-50">
                          {items?.category}
                        </p>
                        <p className="text-sm font-bold text-black">
                          ₹{items?.price}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-black">
                      Summary
                    </p>
                    <p className="h-[70px] overflow-y-scroll text-sm font-semibold text-black opacity-50">
                      {items?.description}
                    </p>
                  </div>
                  <div className="w-full h-[86px] mt-1 shrink-0 border border-slate-400 flex flex-col justify-around rounded-xl outline-none px-3">
                    <div className="w-full h-full flex justify-between items-center">
                      <p className="text-base font-semibold text-[#232321]">
                        Sales
                      </p>
                      <div className="flex justify-center items-center gap-2">
                        <IoArrowUpOutline size={20} color="#ffa52f" />
                        <p>{items?.sales}</p>
                      </div>
                    </div>
                    <hr className="h-[0.80px] bg-slate-400 border-none outline-none" />
                    <div className="w-full h-full flex justify-between items-center">
                      <p className="text-base font-semibold text-[#232321]">
                        Remaining Products
                      </p>
                      <div className="flex justify-center items-center gap-2">
                        <div
                          className={`w-[64px] h-[4px] border-none bg-gray-300 rounded-full flex items-center`}
                        >
                          <div
                            style={{ width: (items?.stock / 50) * 20 }}
                            className={`h-[4px] border-none bg-[#ffa52f] rounded-full outline-none`}
                          />
                        </div>
                        <p>{items?.stock}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="w-auto h-8 flex justify-between mt-6">
            <button
              className={`w-auto px-3 shrink-0 h-8 flex justify-center items-center text-sm rounded-md border-black border-[1px] bg-black text-white uppercase`}
            >
              prevese
            </button>
            <button
              className={`w-auto px-3 shrink-0 h-8 flex justify-center items-center text-sm rounded-md border-black border-[1px] bg-black text-white uppercase`}
            >
              next
            </button>
          </div>
        </div>
        <div
          className={
            !open
              ? `absolute w-full visible h-full bg-[rgb(0,0,0,0.3)] border-none outline-none top-[80px] left-0 z-10 transition ease-in duration-300`
              : "absolute w-full invisible h-full bg-[rgb(0,0,0,0.3)] border-none outline-none top-[80px] left-0 z-10 transition ease-in duration-300"
          }
          onClick={() => setOpen((prev) => !prev)}
        ></div>
      </div>
    </div>
  );
};

export default AllProducts;
