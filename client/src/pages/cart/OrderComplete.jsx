import { Link } from "react-router-dom";
import { useContext } from "react";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import CartNav from "../../components/CartNav";
import userContext from "../../contexts/UserContext";

const OrderComplete = () => {
  const { checkOutDetail } = useContext(userContext);
  // const findIndex = orders?.length;
  // const orderDetail = orders[findIndex - 1];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-auto">
        <Nav />
      </div>
      <div className="mt-10 w-full flex flex-col justify-center items-center sm:px-40 md:px-20 px-8 m-auto h-full overflow-x-hidden">
        <p className="text-[54px] font-medium text-center">Cart</p>
        <CartNav sc={true} cd={true} />
        <div className="w-[800px] h-auto border-t shadow-xl flex flex-col gap-16 items-center my-10 py-10">
          <div className="flex flex-col text-center gap-8 w-fit h-fit">
            <p className="text-xl sm:text-3xl font-medium text-gray-600">
              Thank you! 🎉
            </p>
            <p className="text-[#141718] text-center text-2xl sm:text-4xl font-medium">
              Your order has been received
            </p>
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center gap-5">
            <div className="w-fit h-auto flex flex-wrap gap-20 justify-between items-center">
              {checkOutDetail?.addToCart?.map((item, index) => (
                <div className="w-auto h-auto relative" key={index}>
                  <img
                    src={item?.image}
                    width={96}
                    height={100}
                    className="w-[96px] h-[100px]"
                    alt="img"
                  />
                  <span className="w-[28px] h-[28px] bg-black text-sm text-white flex items-center justify-center absolute -top-4 -right-4 rounded-full">
                    {item?.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-fit h-auto flex gap-10">
            <ul className="flex flex-col gap-2">
              <li className="text-gray-600 text-lg font-medium">Order code:</li>
              <li className="text-gray-600 text-lg font-medium">Date:</li>
              <li className="text-gray-600 text-lg font-medium">Total:</li>
              <li className="text-gray-600 text-lg font-medium">
                Payment method:
              </li>
            </ul>
            <ul className="flex flex-col gap-2">
              <li className="text-gray-900 text-lg font-medium">
                #{checkOutDetail?.orderId}2
              </li>
              <li className="text-gray-900 text-lg font-medium">
                {/* {checkOutDetail?.updatedAt?.split("T")[0]} */}
                {checkOutDetail?.createdAt?.split("T")[0]}
              </li>
              <li className="text-gray-900 text-lg font-medium">
                ₹
                {checkOutDetail?.shipping === "Free shipping" &&
                  checkOutDetail?.mainSubTotal}
                {checkOutDetail?.shipping === "Express shipping" &&
                  checkOutDetail.mainSubTotal + 15}
                {checkOutDetail?.shipping === "Pick Up shipping" &&
                  checkOutDetail?.mainSubTotal + 21}
              </li>
              <li className="text-gray-900 text-lg font-medium">
                {checkOutDetail?.payment}
              </li>
            </ul>
          </div>
          <Link
            className="bg-[#141718] cursor-pointer mt-8 w-fit h-fit rounded-lg py-2 px-6 border border-black text-white transition-all ease-linear text-center text-base"
            to={"/shop"}
          >
            Countinue shopping
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderComplete;
