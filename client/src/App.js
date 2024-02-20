import "./App.css";
import React from "react";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DetailsProvider } from "./contexts/DetailsContext";
import { UserProvider } from "./contexts/UserContext";
import { ProductProvider } from "./contexts/ProductContext";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./contexts/store";
function App() {

  return (
    <>
    <Provider store={store}>
      <DetailsProvider>
        <UserProvider>
          <ProductProvider>
            <Home />
          </ProductProvider>
        </UserProvider>
      </DetailsProvider>
      <ToastContainer />
    </Provider>
      <Toaster/>
    </>
  );
}

export default App;
