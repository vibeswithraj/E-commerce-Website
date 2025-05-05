import Profile from '../../components/Profile';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import {
  addCart,
  addToWishlist,
  delWlistp,
  productDetails,
} from '../../logics';
import { useContext, useEffect } from 'react';
import productContext from '../../contexts/ProductContext';
import userContext from '../../contexts/UserContext';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Loader from '../../components/Loader';
import axios from 'axios';

const Wishlist = () => {
  const {
    wishlist,
    setWishlist,
    addToCart,
    setAddToCart,
    allProducts,
    setProducts,
    setProductDetail,
  } = useContext(productContext);
  const { setCount } = useContext(userContext);

  const delProduct = async (id) => {
    delWlistp(wishlist, setWishlist, id, allProducts, setProducts);
    // addToWishlist(wishlist, setWishlist, allProducts, setProducts, pid);
  };

  const handleProduct = (id) => {
    productDetails(setProductDetail, id);
  };

  const addcart = async (pid) => {
    addCart(addToCart, setAddToCart, setCount, pid);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/wltpro`, { withCredentials: true })
      .then((res) => setWishlist(res.data.wishlist))
      .catch((err) => console.log(err));
  }, [setWishlist]);

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
          <div className="sm:w-[60%] w-full h-[582px]">
            <p className="text-xl text-center sm:text-start font-semibold">
              Your Wishlist
            </p>
            <div className="mt-10 w-full pqps h-[30px] flex justify-between text-center items-center pl-8 pb-2 border-[#E8ECEF] border-b-2">
              <p className="text-sm font-normal w-[160px] text-[#6C7275]">
                Product
              </p>
              <p className="text-sm font-normal w-[120px] text-[#6C7275]">
                Price
              </p>
              <p className="text-sm font-normal w-[137px] text-[#6C7275]">
                Action
              </p>
            </div>
            <div
              className={
                wishlist && wishlist?.length !== 0
                  ? 'w-full h-[400px] overflow-y-scroll mt-6 sm:m-0'
                  : 'w-full h-[400px] overflow-y-scroll mt-6 sm:m-0 flex flex-col justify-center items-center'
              }
            >
              {!wishlist ? (
                <Loader />
              ) : wishlist && wishlist?.length === 0 ? (
                <div className="flex justify-center items-center">
                  Wishlist is empty
                </div>
              ) : (
                wishlist?.map((item, index) => (
                  <div
                    className="w-full sm:h-[120px] h-auto py-6 grid grid-cols-4 gap-4 justify-between items-center"
                    key={index}
                  >
                    <div className="w-auto flex gap-[10px] sm:col-span-2 col-span-3 items-center">
                      <div>
                        <RxCross2
                          size={24}
                          className="text-[#6C7275] cursor-pointer hover:text-red-500"
                          onClick={() => delProduct(item?.id)}
                        />
                      </div>
                      <div className="flex gap-4 cursor-pointer">
                        <Link
                          to={`/product/${item?.id}`}
                          onClick={() => handleProduct(item?.id)}
                        >
                          <img
                            src={item?.image}
                            className="w-[60px] h-[72px] bg-cover bg-center"
                            width={60}
                            height={72}
                            alt=""
                          />
                        </Link>
                        <div className="w-[155px] flex flex-col justify-center gap-2">
                          <p className="text-sm font-semibold">{item?.title}</p>
                          <p className="text-xs font-normal text-[#6C7275]">
                            {item?.category}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[120px] text-sm text-[#141718] font-normal">
                      ${item?.price}
                    </div>
                    <Link onClick={() => addcart(item?.id)}>
                      <button className="rounded-lg bg-[#141718] text-base font-medium w-[130px] h-[40px] text-white">
                        Add to cart
                      </button>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
