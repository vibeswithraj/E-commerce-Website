import { useRef, useState } from "react";
import Aside from "./Aside";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaRegImage } from "react-icons/fa6";
import AdminNav from "./AdminNav";
import axios from "axios";
import { toast } from "react-toastify";

const AddNewProduct = () => {
  const [image, setImage] = useState(null);
  const [proName, setProName] = useState("");
  const [descri, setDescri] = useState("");
  const [category, setCategory] = useState("");
  const [brandName, setBrandName] = useState("");
  const [discount, setDiscount] = useState("");
  const [stockQuantity, setSQuantity] = useState(0);
  const [regularPrice, setRPrice] = useState(0);
  const [salePrice, setSPrice] = useState(0);
  const [tag, setTag] = useState();

  const imageRef = useRef(null);

  const allImage = [
    {
      id: 1,
      path: "",
      width: "100%",
      success: true,
    },
    {
      id: 2,
      path: "",
      width: "100%",
      success: true,
    },
    {
      id: 3,
      path: "",
      width: "100%",
      success: true,
    },
    {
      id: 4,
      path: "",
      width: "100%",
      success: true,
    },
  ];

  const handleImage = () => {
    imageRef.current.click();
  };

  const handleOnChange = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (err) => {
      console.log("error img ", err);
    };
    //localStorage.setItem("image", URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:6060/addnewproduct",
        {
          title: proName,
          quantity: 1,
          category: category,
          description: descri,
          image: image,
          price: parseInt(salePrice),
          like: false,
          subtotal: parseInt(salePrice),
          sales: 0,
          stock: parseInt(stockQuantity),
          rating: {
            count: 0,
            rate: 0,
          },
        },
        { withCredentials: true }
      );

      console.log(data);
      if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    //console.log(e);
    e.preventDefault();
    setImage(null);
    setProName("");
    setDescri("");
    setCategory("");
    setBrandName("");
    setDiscount("");
    setSQuantity("");
    setRPrice("");
    setSPrice("");
    setTag("");
  };

  return (
    <div className="flex w-full h-auto">
      <Aside />
      <div className={"w-full h-auto relative"}>
        <AdminNav />
        <div className="bg-[#e7e7e3] w-full h-auto px-8 py-5">
          <div className="w-full h-[54px] flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-black">All Products</p>
              <p className="text-base font-normal text-black font-sans">
                Home {">"} all products {">"} add new product
              </p>
            </div>
          </div>
          <form className="w-full h-auto flex flex-wrap lg:flex-nowrap gap-[47px] mt-6 bg-[#FAFAFA] rounded-xl p-5">
            <div className="w-full h-auto">
              <p>Product Name</p>
              <input
                type="text"
                name="productName"
                placeholder="Type name here"
                value={proName}
                onChange={(e) => setProName(e.target.value)}
                className="w-full h-[48px] mt-3 text-lg border-black border-[1px] pl-3 rounded-lg bg-[#FAFAFA]"
              />
              <p className="mt-4">Description</p>
              <input
                type="text"
                name="productDescription"
                placeholder="Type description here"
                value={descri}
                onChange={(e) => setDescri(e.target.value)}
                className="w-full h-[180px] mt-3 text-base border-black border-[1px] pl-3 rounded-lg bg-[#FAFAFA]"
              />
              <p className="mt-4">Category</p>
              <input
                type="text"
                name="productCategory"
                placeholder="Type category here"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-[48px] mt-3 text-base border-black border-[1px] pl-3 rounded-lg bg-[#FAFAFA]"
              />
              <p className="mt-4">Brand Name</p>
              <input
                type="text"
                name="productBrandName"
                placeholder="Type Brand Name here"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full h-[48px] mt-3 text-base border-black border-[1px] pl-3 rounded-lg bg-[#FAFAFA]"
              />
              <div className="w-full h-auto grid grid-flow-row grid-cols-2 gap-5">
                <div>
                  <p className="mt-4">Discount Percentage</p>
                  <input
                    type="number"
                    name="sku"
                    placeholder="50%"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-full h-[48px] mt-3 text-base border-black border-[1px] pl-3 rounded-lg bg-[#FAFAFA]"
                  />
                </div>
                <div>
                  <p className="mt-4">Stock Quantity</p>
                  <input
                    type="number"
                    name="stockQuantity"
                    placeholder="1258"
                    value={stockQuantity}
                    onChange={(e) => setSQuantity(e.target.value)}
                    className="w-full h-[48px] mt-3 text-base border-black border-[1px] pl-3 rounded-lg bg-[#FAFAFA]"
                  />
                </div>
                <div>
                  <p className="mt-0">Regular Price</p>
                  <input
                    type="number"
                    name="regularPrice"
                    placeholder="₹1000"
                    value={regularPrice}
                    onChange={(e) => setRPrice(e.target.value)}
                    className="w-full h-[48px] mt-3 text-base border-black border-[1px] pl-3 rounded-lg bg-[#FAFAFA]"
                  />
                </div>
                <div>
                  <p className="mt-0">Sale Price</p>
                  <input
                    type="number"
                    name="salePrice"
                    placeholder="₹450"
                    value={salePrice}
                    onChange={(e) => setSPrice(e.target.value)}
                    className="w-full h-[48px] mt-3 text-base border-black border-[1px] pl-3 rounded-lg bg-[#FAFAFA]"
                  />
                </div>
              </div>
              <p className="mt-4">Tag</p>
              <input
                type="text"
                name="tag"
                placeholder="#Lorem #Lorem #Lorem"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full h-[99px] mt-3 text-base border-black border-[1px] pl-3 rounded-lg bg-[#FAFAFA]"
              />
            </div>
            <div className="w-full h-auto">
              <img
                src={image === "" || image === null ? "" : image}
                className="w-full h-[428px] bg-slate-300 rounded-lg object-cover"
                width={"100%"}
                height={428}
                alt=""
              />
              <p className="mt-4">Product Gallery</p>
              <div
                className="w-full h-[164px] text-center mt-3 border-black border-[2px] opacity-70 border-dashed flex flex-col justify-center items-center bg-[#FAFAFA]"
                onClick={handleImage}
              >
                <FaRegImage size={40} />
                <p>
                  {/* Drop your imager here, or browse <br /> Jpeg, png are allowed */}
                  Click here to upload images <br /> Jpeg, png are allowed
                </p>
                <input
                  type="file"
                  name="productGallery"
                  ref={imageRef}
                  onChange={handleOnChange}
                  accept="image/*"
                  className="w-full h-[164px] text-base rounded-lg bg-transparent hidden"
                />
              </div>
              <div className="w-full h-auto flex flex-col px-5 mt-6 gap-4">
                {allImage?.map((item) => (
                  <div
                    key={item?.id}
                    className="w-full h-16 flex items-center justify-center gap-5"
                  >
                    <div className="w-16 h-16">
                      <img
                        src={image === "" || image === null ? "" : image}
                        className="rounded-md bg-slate-300 w-16 h-16 transition duration-700 ease-in object-cover"
                        width={64}
                        height={64}
                        alt=""
                      />
                    </div>
                    <div className="w-full h-full flex flex-col justify-around">
                      <p className="text-base font-semibold text-black">
                        {image?.name ? image?.name : "Product thumbnail.png"}
                      </p>
                      <div className="w-full h-[4px] border-none bg-gray-300 rounded-full flex items-center transition duration-700 ease-in">
                        <div
                          style={{ width: image ? "100%" : "0%" }}
                          className={`h-[4px] border-none bg-black rounded-full outline-none transition duration-700 ease-in`}
                        ></div>
                      </div>
                    </div>
                    <IoIosCheckmarkCircle
                      size={30}
                      className={
                        !item.success || image ? "opacity-100" : "opacity-20"
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="w-full h-auto flex justify-between mt-10 px-5">
                <button
                  className="w-[220px] h-[48px] rounded-xl text-center text-base font-semibold text-black uppercase border-[1px] border-black hover:bg-black hover:text-white"
                  onClick={handleSubmit}
                >
                  submit
                </button>
                <button
                  className="w-[220px] h-[48px] rounded-xl text-center text-base font-semibold text-black uppercase border-[1px] border-black hover:bg-black hover:text-white"
                  onClick={handleCancel}
                >
                  cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
