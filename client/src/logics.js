import axios from 'axios';
import { toast } from 'react-toastify';
import hotToast from 'react-hot-toast';

export const incrise = (addToCart, setAddToCart, pid, num) => {
  let updateCart = addToCart.map((curElem) => {
    if (curElem.id === pid) {
      curElem = { ...curElem, quantity: curElem.quantity + 1 };
      return { ...curElem, subtotal: curElem.price * curElem.quantity };
    }
    return curElem;
  });
  return setAddToCart(updateCart);
};

export const dicrise = (addToCart, setAddToCart, count, setCount, pid, num) => {
  let updateCart = addToCart.map((curElem) => {
    if (curElem.id === pid) {
      if (curElem.quantity > 1) {
        curElem = {
          ...curElem,
          subtotal: curElem.quantity * curElem.price - curElem.price,
        };
        return { ...curElem, quantity: curElem.quantity - 1 };
      }
    }
    return curElem;
  });
  // .filter((curElem) => {
  //   if (curElem.quantity === 0) {
  //     setCount(count - 1);
  //   }
  //   return curElem.quantity !== 0;
  // });
  return setAddToCart(updateCart);
};

export const delAtcp = async (addToCart, setAddToCart, setCount, pid) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/removeatcpro/${pid}`,
      { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
    );
    if (data.error) toast.error(data.error);
    if (data.message) hotToast.success(data.message);
    setAddToCart(data.userOne.addtocart);
  } catch (error) {
    console.log(error);
  }
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
  hotToast.success('Removed');
};

export const addCart = async (addToCart, setAddToCart, setCount, pid) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/addtocart/${pid}`,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (data.error) {
      if (data.error === 'Already added!') hotToast.error(data.error);
      else toast.error(data.error);
    }
    setCount(addToCart.length);
    if (data.message) hotToast.success(data.message);
    setAddToCart(data.userOne.addtocart);

    // if (pid) {
    //   const alreadyAdded = await addToCart.find((i) => i.id === pid);
    //   if (!alreadyAdded) {
    //     setAddToCart(data.user.addtocart);
    //     setCount(addToCart.length + 1);
    //   } else {
    //     hotToast.error("Already added!");
    //   }
    // }
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
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/wishlist/${pid}`,
      { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
    );
    if (data.error) toast.error(data.error);
    if (data.message) hotToast.success(data.message);
    setWishlist(data.userOne.wishlist);

    const newFindPro = await allProducts?.map((i) => {
      if (i.id === pid) {
        return { ...i, like: (i.like = !i.like) };
      } else {
        return i;
      }
    });
    setProducts(newFindPro);
    // else {
    // const alreadyAdded = await wishlist.find((i) => i.id === pid);
    // if (!alreadyAdded) {
    //   setWishlist(data.wishlist);
    //   const newFindPro = await allProducts.map((i) => {
    //     if (i.id === pid) {
    //       return { ...i, like: (i.like = !i.like) };
    //     } else {
    //       return i;
    //     }
    //   });
    //   setProducts(newFindPro);
    //   hotToast.success("Added");
    // } else {
    //   const newWltPro = await wishlist.map((i) => {
    //     if (i.id === pid) {
    //       return { ...i, like: (i.like = !i.like) };
    //     } else {
    //       return i;
    //     }
    //   });
    //   setWishlist([newWltPro]);
    //   const delPro = await wishlist.filter((item) => item.id !== pid);
    //   setWishlist(delPro);
    //   const newAllPro = await allProducts.map((i) => {
    //     if (i.id === pid) {
    //       return { ...i, like: (i.like = !i.like) };
    //     } else {
    //       return i;
    //     }
    //   });
    //   setProducts(newAllPro);
    //   return hotToast.success("Removed!");
    // }
    // }
  } catch (err) {
    console.log(err);
  }
};

export const productDetails = async (setProductDetail, id) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/productdetails/${id}`,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (data.error) {
      return hotToast.error(data.error);
    }
    setProductDetail(data);
  } catch (error) {
    console.log(error);
  }
};
