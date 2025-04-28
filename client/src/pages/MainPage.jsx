import React from "react";
import Nav from "../components/Nav";
import banner from "../images/Image placeholder shop.png";
import banner3 from "../images/Image Placeholder header blog.png";
import banner2 from "../images/Banner2.png";
import HomeImg1 from "../images/image2.png";
import HomeImg2 from "../images/HomeImg1.png";
import HomeImg3 from "../images/HomeImg2.png";
import img1 from "../images/image1.png";
import img2 from "../images/Image8.png";
import img3 from "../images/Image3.png";
import img4 from "../images/Image9.png";
import img5 from "../images/Image6.png";
import shippingImg from "../images/fast delivery.png";
import money from "../images/money.png";
import lock from "../images/lock 01.png";
import call from "../images/call.png";
import Saleimg from "../images/Saleimg.png";
import ArticleImg1 from "../images/ArticleImg1.png";
import ArticleImg2 from "../images/ArticleImg2.png";
import ArticleImg3 from "../images/ArticleImg3.png";
import likeImg from "../images/likeImg.png";
import { FaArrowRight } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import BannerFooter from "../components/BannerFooter";
import Footer from "../components/Footer";
import { Divider } from "@mui/material";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainPage = () => {
  // const { contextSafe } = useGSAP();
  useGSAP(() => {
    gsap.to("#livingRoom", {
      y: 0,
      duration: 1,
      delay: 0.2,
    });
  });

  const newArrivals = [
    {
      id: 0,
      title: "Loveseat Sofa",
      price: "199.00",
      image: img1,
      discountPrice: "400.00",
    },
    {
      id: 1,
      title: "Table Lamp",
      price: "24.99",
      image: img2,
      discountPrice: "",
    },
    {
      id: 2,
      title: "Beige Table Lamp",
      price: "24.99",
      image: img3,
      discountPrice: "",
    },
    {
      id: 3,
      title: "Bamboo basket",
      price: "24.99",
      image: img4,
      discountPrice: "",
    },
    {
      id: 4,
      title: "Toasted",
      price: "24.99",
      image: img5,
      discountPrice: "",
    },
  ];

  const LeftArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        style={{ ...style, display: "block", color: "black" }}
        className={className + "left-0 z-10 right-[90%] absolute lg:right-[100%] lg:mr-2 top-[49%] cursor-pointer"}
        onClick={onClick}
      >
        <GoArrowLeft size={22} />
      </div>
    );
  };

  const RightArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        style={{ ...style, display: "block", color: "black" }}
        className={className + "right-0 z-10 left-[90%] absolute lg:left-[100%] lg:ml-2 top-[49%] cursor-pointer"}
        onClick={onClick}
      >
        <GoArrowRight size={22} />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    initialSlide: 0,
    lazyLoad: true,
    pauseOnHover: true,
    // fade: true,
    // waitForAnimate: false,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
  };

  const num = [
    {
      id: 0,
      image: banner,
    },
    {
      id: 1,
      image: banner2,
    },
    {
      id: 2,
      image: banner3,
    },
  ];

  return (
    <div className="w-full h-auto">
      <div className="w-full h-auto">
        <Nav />
      </div>
      <section className="w-full h-auto mt-2 mb-0 sm:mb-16 sm:px-10 px-2">
        <div className="w-full h-auto slider-container">
          <Slider
            {...settings}
            className='w-full h-auto relative'
            //className="w-full h-auto border flex items-center justify-center"
          >
            {num?.map((item, index) => (
              <img
                id="banner"
                src={item?.image || ""}
                alt="banner"
                width={"100%"}
                key={index}
                // height={"100%"}
                className="w-full h-[40vh] lg:h-[536px] object-cover lg:object-fill"
              />
            ))}
          </Slider>
        </div>
        <div className="w-full h-fit flex flex-wrap sm:flex-nowrap items-center mt-7 sm:mt-14 justify-between">
          <span
            id="text-1"
            className="w-fit h-fit text-3xl sm:text-6xl font-semibold translate-x-0"
          >
            Simply Unique<span className="w-fit h-fit text-gray-500">/</span>
            <br />
            Simply Better<span className="w-fit h-fit text-gray-500">.</span>
          </span>
          <span
            id="text-2"
            className="w-[35%] h-fit text-gray-500 translate-x-0"
          >
            <span className="text-black font-bold">3legant</span> is a gift &
            decorations store based in HCMC, Vietnam. Est since 2019.
          </span>
        </div>
      </section>
      <section
        id="sectionScroll"
        className="w-full h-auto flex justify-center flex-wrap gap-0 sm:gap-5 px-2 sm:px-10"
      >
        <div className="w-auto h-[664px]">
          <div className="w-auto h-[664px] relative">
            <img
              src={HomeImg1 || ""}
              className="w-full h-full object-contain"
              alt="img"
            />
            <div className="w-[200px] h-[100px] absolute top-28 sm:top-11 left-5 sm:left-12 overflow-hidden">
              <div
                id="livingRoom"
                className="w-full h-full flex flex-col translate-y-[-100%]"
              >
                <span className="w-fit h-fit text-3xl font-semibold mb-4">
                  Living Room
                </span>
                <button className="w-fit h-auto text-lg flex gap-1 group items-center pb-1 transition-all ease-in-out duration-300">
                  Shop Now
                  <FaArrowRight
                    size={15}
                    className="w-fit h-fit pt-[3px] group-hover:ml-1 transition-all ease-in-out duration-300"
                  />
                </button>
                <Divider
                  orientation="horizontal"
                  className="w-[100px] bg-black"
                  flexItem
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-fit h-[664px] flex flex-col gap-0 sm:gap-5">
          <div className="w-full sm:w-fit h-[48.50%]">
            <div className="w-auto h-auto relative">
              <img src={HomeImg2 || ""} alt="img" />
              <div className="w-fit h-fit absolute bottom-5 sm:bottom-5 left-5 sm:left-12 overflow-hidden">
                <div
                  id="livingRoom"
                  className="w-full h-full flex flex-col translate-y-[-100%]"
                >
                  <span className="w-fit h-fit text-2xl sm:text-3xl font-semibold mb-2 sm:mb-4">
                    Bedroom{" "}
                  </span>
                  <button className="w-fit h-auto text-base sm:text-lg flex gap-1 group items-center pb-1 transition-all ease-in-out duration-300">
                    Shop Now
                    <FaArrowRight
                      id="arrow"
                      size={15}
                      className="w-fit h-fit pt-[3px] group-hover:ml-1 transition-all ease-in-out duration-300"
                    />
                  </button>
                  <Divider
                    orientation="horizontal"
                    className="w-[100px] bg-black"
                    flexItem
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-fit h-[48.50%]">
            <div className="w-auto h-auto relative">
              <img src={HomeImg3 || ""} alt="img" />
              <div className="w-fit h-fit absolute bottom-5 sm:bottom-10 left-5 sm:left-12 overflow-hidden">
                <div
                  id="livingRoom"
                  className="w-full h-full flex flex-col translate-y-[-100%]"
                >
                  <span className="w-fit h-fit text-2xl sm:text-3xl font-semibold mb-2 sm:mb-4">
                    Kitchen{" "}
                  </span>
                  <button className="w-fit h-auto text-base sm:text-lg flex gap-1 group items-center pb-1 transition-all ease-in-out duration-300">
                    Shop Now
                    <FaArrowRight
                      size={15}
                      className="w-fit h-fit pt-[3px] group-hover:ml-1 transition-all ease-in-out duration-300"
                    />
                  </button>
                  <Divider
                    orientation="horizontal"
                    className="w-[100px] bg-black"
                    flexItem
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-fit px-2 sm:px-10 mt-0 sm:mt-14">
        <div className="w-full h-fit flex justify-between items-center">
          <span className="w-fit h-fit text-2xl sm:text-3xl font-semibold">
            New Arrivals
          </span>
          <Link
            to={"/shop"}
            className="w-fit h-fit text-base hover:text-gray-600 text-black font-semibold border-b-2 hover:border-gray-600 border-black pb-1 flex gap-2"
          >
            More Products{" "}
            <FaArrowRight size={15} className="w-fit h-fit mt-[5px]" />
          </Link>
        </div>
        <div className="w-full h-fit flex shrink-0 overflow-x-scroll gap-6 scroll-smooth mt-14 pb-10">
          {newArrivals?.map((item, index) => (
            <Link
              key={index}
              // to={`/product`}
              // onClick={() => handleProduct(items?.id)}
              className="rounded-lg md:h-[433px] h-[400px] shrink-0 w-auto flex flex-col justify-between cursor-pointer group relative shadow-md border-b hover:shadow-lg"
            >
              <span className="w-fit h-fit px-2 pb-[1.50px] bg-white text-black text-sm rounded absolute top-3 left-3 z-20 font-semibold">
                NEW
              </span>
              <span className="w-fit h-fit px-2 pb-[1.50px] bg-[#38CB89] text-white text-sm rounded absolute top-10 left-3 z-20 font-semibold">
                {"-50%"}
              </span>
              <div className="absolute sm:top-3 right-1 top-2 w-fit h-fit cursor-pointer z-20 flex justify-center items-center">
                <img
                  src={likeImg}
                  className={"w-[50px] h-[50px]"}
                  alt="img"
                  // onClick={() => handleAddToWishlist(items?.id)}
                />
              </div>
              <div className="sm:w-[262px] w-[231px] sm:h-[349px] h-[308px] relative flex justify-center">
                <img
                  className="sm:w-[262px] w-[231px] sm:h-[349px] h-[308px] object-cover rounded-lg shrink-0"
                  src={item?.image || ""}
                  alt="img"
                />
                <button className="w-auto px-16 sm:px-20 h-auto py-2 bg-black text-white text-base rounded-md absolute bottom-0 visible lg:invisible transition-all ease-in-out duration-300g lg:group-hover:visible lg:group-hover:bottom-8">
                  Add to cart
                </button>
              </div>
              <div className="w-full h-auto flex flex-col gap-2 sm:gap-1 px-2">
                <div className="flex gap-[3px]">
                  <FaStar size={15} color="orange" />
                  <FaStar size={15} color="orange" />
                  <FaStar size={15} color="orange" />
                  <FaStar size={15} color="lightgray" />
                  <FaStar size={15} color="lightgray" />
                </div>
                <span className="w-fit h-fit font-semibold">
                  {item?.title || ""}
                </span>
                <span className="font-semibold">
                  ₹{item?.price || ""}
                  <span className="text-gray-500 ml-3 line-through opacity-60">
                    {item?.discountPrice ? "₹" + item?.discountPrice : ""}
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="w-full h-auto my-10 flex flex-wrap justify-around gap-5 items-center">
          <div className="w-[262px] h-[220px] bg-slate-100 p-7 flex flex-col items-start justify-center shrink-0 shadow-lg">
            <img src={shippingImg} alt="img" className="mb-4" />
            <span className="w-fit h-fit text-lg text-black font-semibold mb-1">
              Free Shipping
            </span>
            <span className="w-fit h-fit text-gray-600 text-base">
              Order above $200
            </span>
          </div>
          <div className="w-[262px] h-[220px] bg-slate-100 p-7 flex flex-col items-start justify-center shrink-0 shadow-lg">
            <img src={money} alt="img" className="mb-4" />
            <span className="w-fit h-fit text-lg text-black font-semibold mb-1">
              Money-back
            </span>
            <span className="w-fit h-fit text-gray-600 text-base">
              30 days guarantee
            </span>
          </div>
          <div className="w-[262px] h-[220px] bg-slate-100 p-7 flex flex-col items-start justify-center shrink-0 shadow-lg">
            <img src={lock} alt="img" className="mb-4" />
            <span className="w-fit h-fit text-lg text-black font-semibold mb-1">
              Secure Payments
            </span>
            <span className="w-fit h-fit text-gray-600 text-base">
              Secured by Stripe
            </span>
          </div>
          <div className="w-[262px] h-[220px] bg-slate-100 p-7 flex flex-col items-start justify-center shrink-0 shadow-lg">
            <img src={call} alt="img" className="mb-4" />
            <span className="w-fit h-fit text-lg text-black font-semibold mb-1">
              24/7 Support
            </span>
            <span className="w-fit h-fit text-gray-600 text-base">
              Phone and Email support
            </span>
          </div>
        </div>
      </section>
      <section className="w-full h-auto flex flex-wrap mt-[100px] px-2 sm:px-10">
        <img
          src={Saleimg}
          alt="img"
          className="w-full sm:w-[50%] flex flex-grow h-fit sm:h-auto"
        />
        <div className="w-full md:w-[50%] h-[537px] lg:h-auto px-4 sm:px-9 py-4 sm:p-0 bg-gray-100 mb-1 flex justify-center items-center">
          <div className="w-fit h-fit flex flex-col">
            <span className="w-fit h-fit text-[#377DFF] text-base lg:text-lg font-bold mb-3">
              SALE UP TO 35% OFF
            </span>
            <span className="w-fit h-fit text-3xl md:text-6xl text-black mb-8 font-semibold">
              HUNDREDS of <br />
              New lower prices!
            </span>
            <span className="max-w-[380px] w-auto h-auto text-gray-500 text-base sm:text-lg mb-8">
              It’s more affordable than ever to give every room in your home a
              stylish makeover
            </span>
            <button className="w-fit h-auto text-lg flex gap-1 group items-center pb-1 transition-all ease-in-out duration-300">
              Shop Now
              <FaArrowRight
                size={15}
                className="w-fit h-fit pt-[3px] group-hover:ml-1 transition-all ease-in-out duration-300"
              />
            </button>
            <Divider
              orientation="horizontal"
              className="w-[100px] bg-black"
              flexItem
            />
          </div>
        </div>
      </section>
      <section className="w-full h-fit px-2 sm:px-10 mt-14">
        <div className="w-full h-fit flex justify-between items-center">
          <span className="w-fit h-fit text-3xl font-semibold">Articles</span>
          <button className="w-fit h-fit text-base text-black hover:text-gray-600 font-semibold border-b-2 border-black hover:border-gray-600 pb-1 flex gap-2">
            More Articles{" "}
            <FaArrowRight size={15} className="w-fit h-fit mt-[5px]" />
          </button>
        </div>
        <div className="w-full h-auto flex flex-wrap gap-5 justify-around items-center mt-[100px]">
          <div className="w-fit h-fit">
            <img
              src={ArticleImg1}
              alt="img"
              className="w-[357px] mb-2 h-[325px]"
            />
            <span className="w-fit h-fit text-black text-lg font-normal">
              7 ways to decor your home
            </span>
            <button className="w-fit h-auto text-sm flex gap-2 mt-3 items-center font-semibold pb-1 border-b-2 border-gray-600">
              Read more
              <FaArrowRight
                size={15}
                className="w-fit h-fit pt-[1px]"
                //color="gray"
              />
            </button>
          </div>
          <div className="w-fit h-fit">
            <img
              src={ArticleImg2}
              alt="img"
              className="w-[357px] mb-2 h-[325px]"
            />
            <span className="w-fit h-fit text-black text-lg font-normal">
              Kitchen organization
            </span>
            <button className="w-fit h-auto text-sm flex gap-2 mt-3 items-center font-semibold pb-1 border-b-2 border-gray-600">
              Read more
              <FaArrowRight
                size={15}
                className="w-fit h-fit pt-[1px]"
                //color="gray"
              />
            </button>
          </div>
          <div className="w-fit h-fit">
            <img
              src={ArticleImg3}
              alt="img"
              className="w-[357px] mb-2 h-[325px]"
            />
            <span className="w-fit h-fit text-black text-lg font-normal">
              Decor your bedroom
            </span>
            <button className="w-fit h-auto text-sm flex gap-2 items-center font-semibold pb-1 mt-3 border-b-2 border-gray-600">
              Read More
              <FaArrowRight
                size={15}
                className="w-fit h-fit pt-[1px]"
                //color="gray"
              />
            </button>
          </div>
        </div>
      </section>
      <BannerFooter />
      <Footer />
    </div>
  );
};

export default MainPage;
