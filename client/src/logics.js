import axios from "axios";
import { toast } from "react-toastify";
import hotToast from "react-hot-toast";

export const incrise = (addToCart, setAddToCart, pid) => {
  let updateCart = addToCart.map((curElem) => {
    if (curElem.id === pid) {
      curElem = { ...curElem, quantity: curElem.quantity + 1 };
      return { ...curElem, subtotal: curElem.price * curElem.quantity };
    }
    return curElem;
  });
  return setAddToCart(updateCart);
};

export const dicrise = (addToCart, setAddToCart, count, setCount, pid) => {
  let updateCart = addToCart
    .map((curElem) => {
      if (curElem.id === pid) {
        curElem = {
          ...curElem,
          subtotal: curElem.quantity * curElem.price - curElem.price,
        };
        return { ...curElem, quantity: curElem.quantity - 1 };
      }
      return curElem;
    })
    .filter((curElem) => {
      if (curElem.quantity === 0) {
        setCount(count - 1);
      }
      return curElem.quantity !== 0;
    });
  return setAddToCart(updateCart);
};

export const delAtcp = async (addToCart, setAddToCart, setCount, pid) => {
  const newcart = await addToCart.filter((i) => i.id !== pid);
  setCount(addToCart.length - 1);
  return setAddToCart(newcart);
};

export const delWlistp = async (wishlist, setWishlist, id) => {
  const newcart = await wishlist.filter((i) => i.id !== id);
  return setWishlist(newcart);
};

export const addCart = async (addToCart, setAddToCart, setCount, pid) => {
  try {
    const { data } = await axios.get(`http://localhost:5050/addtocart/${pid}`, {
      withCredentials: true,
    });
    if (data.error) {
      toast.error(data.error);
    } else {
      const alreadyAdded = await addToCart.find((i) => i.id === pid);
      if (!alreadyAdded) {
        setAddToCart([...addToCart, data]);
        setCount(addToCart.length + 1);
      } else {
        hotToast.error("Already added!");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const addToWishlist = async (wishlist, setWishlist, pid) => {
  try {
    const { data } = await axios.get(`http://localhost:5050/wishlist/${pid}`, {
      withCredentials: true,
    });
    if (data.error) {
      toast.error(data.error);
    } else {
      const alreadyAdded = await wishlist.find((i) => i.id === pid);
      if (!alreadyAdded) {
        setWishlist([...wishlist, data]);
      } else {
        toast.error("Already added!");
      }
    }
  } catch (err) {
    console.log(err);
  }
};
