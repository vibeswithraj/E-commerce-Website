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
  hotToast.success("Removed");
  return setAddToCart(newcart);
};

export const delWlistp = async (
  wishlist,
  setWishlist,
  id,
  allProducts,
  setProducts
) => {
  const newWltPro = await wishlist.map((i) => {
    if (i.id === id) {
      return { ...i, like: (i.like = !i.like) };
    } else {
      return i;
    }
  });
  setWishlist([newWltPro]);
  const newAllProducts = await allProducts.map((i) => {
    if (i.id === id) {
      return { ...i, like: (i.like = !i.like) };
    } else {
      return i;
    }
  });
  setProducts(newAllProducts);
  const newcart = await wishlist.filter((i) => i.id !== id);
  setWishlist(newcart);
  hotToast.success("Removed");
};

export const addCart = async (addToCart, setAddToCart, setCount, pid) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/addtocart/${pid}`, {
      withCredentials: true,
    });
    if (data.error) {
      return toast.error(data.error);
    } else {
      const alreadyAdded = await addToCart.find((i) => i.id === pid);
      if (!alreadyAdded) {
        setAddToCart([...addToCart, data]);
        setCount(addToCart.length + 1);
        hotToast.success("Added");
      } else {
        hotToast.error("Already added!");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const addToWishlist = async (
  wishlist,
  setWishlist,
  allProducts,
  setProducts,
  pid
) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/wishlist/${pid}`);
    if (data.error) {
      return toast.error(data.error);
    } else {
      const alreadyAdded = await wishlist.find((i) => i.id === pid);
      if (!alreadyAdded) {
        setWishlist([...wishlist, data]);
        const newFindPro = await allProducts.map((i) => {
          if (i.id === pid) {
            return { ...i, like: (i.like = !i.like) };
          } else {
            return i;
          }
        });
        setProducts(newFindPro);
        hotToast.success("Added");
      } else {
        const newWltPro = await wishlist.map((i) => {
          if (i.id === pid) {
            return { ...i, like: (i.like = !i.like) };
          } else {
            return i;
          }
        });
        setWishlist([newWltPro]);
        const delPro = await wishlist.filter((item) => item.id !== pid);
        setWishlist(delPro);
        const newAllPro = await allProducts.map((i) => {
          if (i.id === pid) {
            return { ...i, like: (i.like = !i.like) };
          } else {
            return i;
          }
        });
        setProducts(newAllPro);
        return hotToast.success("Removed!");
      }
    }
  } catch (err) {
    console.log(err);
  }
};
