import Home from "./Home";
import Footer from "./Footer";
import Header from "./Header";
import CartPopOut from "./CartPopOut";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getUser } from "../../APIS/Fetching";
export default function Layout(props) {
  const [user,setUser] = useState({});
  let path = useLocation() ; 

  async function fetchUser() {
    const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
    let user = await getUser(userInfo?.googleId);
    console.log(user);
    setUser(user)
  }
  useEffect(()=> {
    fetchUser();
  },[path.pathname])

  return (
    <>
      <Header user={user} cart={props.cart} />
      <CartPopOut cartPopOut={props.cartPopOut} />
      <Outlet context={{ user: props.user }} />
      <Footer />
    </>
  );
}
