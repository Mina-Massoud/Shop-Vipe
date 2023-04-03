import { useState } from "react";
import ReactDOM from "react-dom/client";
import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  createHashRouter,
} from "react-router-dom";
import Home from "./components/Home";
import Error from "./components/Error";
import Layout from "./components/Layout";
import Text from "./components/Test";
import ProductDetails from "./components/productDetails";
import ProductPageRendering from "./components/Product-page-Rendering";
import { fetchingHomePanner, getUser } from "../APIS/Fetching";
import { useEffect } from "react";
import Cart from "./components/Cart.jsx";
import popsound from "./audio/popsound.mp3";
import About from "./components/About";
import ErrorHandlerHome from "./components/ErrorsHandler/ErrorHandlerHome";
import ErrorHandlerProductDetails from "./components/ErrorsHandler/ErrorHandlerProductDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import { action as actionLogin } from "./components/Login";
import { action as actionRegister } from "./components/Register";
import CheckOut from "./components/CheckOut";
import { auth } from "../APIS/auth";
import { useNavigate } from 'react-router-dom';
function App() {
  //Glopal State

  const [products, setProducts] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const [cart, setCart] = useState([]);
  let [myQuantity, setQuantity] = useState(0);
  const [cartPopOut, setCartPopOut] = useState({});
 
  function updateGlobalState(newCart) {
    // update the global state with the new cart
    setCart(newCart);
  }
  //Functions
  async function fetchProducts() {
    try {
      const [fetchedProducts, fetchedBannerData] = await fetchingHomePanner();
      setProducts(fetchedProducts);
      setBannerData(fetchedBannerData);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function addCart(product, quantity = 0) {
    const audio = new Audio(popsound);
    if (quantity === 0) {
      quantity++;
    }
    audio.volume = 1;
    audio.play();
    let check = false;
    let myCheckedArray = cart.map((oldArray) => {
      if (product.slug.current == oldArray.product.slug.current) {
        oldArray.quantity += quantity;
        quantity = oldArray.quantity;
        check = true;
      }
      return oldArray;
    });
    if (check) {
      setCart((prev) => (prev = myCheckedArray));
    } else {
      setCart((prev) => [...prev, { product, quantity }]);
    }
    setCartPopOut({ product, quantity });
  }


  const router = createHashRouter(
    
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <Layout cart={cart}  productsData={products} cartPopOut={cartPopOut} />
        }
      >
        <Route
          index
          element={
            <Home
              bannerData={bannerData}
              productsData={products}
              addCart={addCart}
            />
          }
          errorElement={<ErrorHandlerHome />}
        />
        <Route
          path="product/:id"
          element={
            <ProductDetails
              myQuantity={myQuantity}
              setQuantity={setQuantity}
              addCart={addCart}
              productsData={products}
              Setcart={setCart}
              cart={cart}
            />
          }
          errorElement={<ErrorHandlerProductDetails />}
        />
        <Route
          path="cart"
          element={<Cart cart={cart} updateGlobalState={updateGlobalState} />}
        />
        <Route path="checkout" element={<CheckOut />} loader={auth} />
        <Route
          path="/categories/:categoryName"
          element={
            <ProductPageRendering
              productsData={products}
              addCart={addCart}
              products={products}
            />
          }
          errorElement={<ErrorHandlerProductDetails />}
        />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} action={actionLogin} />
        <Route path="register" element={<Register />} action={actionRegister} />
        <Route path="*" element={<Error />} />
      </Route>
    )
  );
  return (
    <>
      {/* <Test /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default React.memo(App);
