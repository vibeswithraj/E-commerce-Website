import "./App.css";
import React from "react";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DetailsProvider } from "./contexts/DetailsContext";
import { UserProvider } from "./contexts/UserContext";
import { ProductProvider } from "./contexts/ProductContext";
import { Toaster } from "react-hot-toast";
function App() {

  return (
    <>
      <DetailsProvider>
        <UserProvider>
          <ProductProvider>
            <Home />
          </ProductProvider>
        </UserProvider>
      </DetailsProvider>
      <ToastContainer />
      <Toaster/>
    </>
  );
}

export default App;
