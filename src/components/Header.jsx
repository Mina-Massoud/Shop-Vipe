import { AiFillShopping } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../../APIS/Fetching";
import profileImg from "../images/profile.png"
export default function Header(props) {
  let total = 0;
  props.cart.map((product) => {
    total += product.quantity;
  });
  const[hover,setHover] = useState(false) ; 

  console.log(props.user);
  return (
    <div className="header sticky top-[0px] z-50 bg-black h-[81px] p-[2em] border-b-[1px] flex justify-between items-center">
      <Link to=".">
        <h2 className="text-3xl text-red-600 font-bold">ShopVibe</h2>
      </Link>
      {/* <form className="w-[40%]">
        <label
          htmlFor="default-search"
          className="mb-2  font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative w-full">
          <input
            type="search"
            id="default-search"
            className="w-full p-4 pl-10 text-gray-900 border border-gray-300 border bg-white text-red-600 rounded-lg focus:border-red-500 text-[1.7rem]"
            placeholder="Search Products..."
            required
          />
          <button
            type="submit"
            className="text-white absolute h-full w-[100px] text-[1.6rem] bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded transition  px-4 py-2 search-btn"
          >
            Search
          </button>
        </div>
      </form> */}
      <div className={`left-side-header relative flex items-center ${hover ? "" : "overflow-hidden"}`}>
        {props.user[0] && props.user[0].length > 0 ? (
          <>
          <div onMouseOut={()=>{setHover(false);console.log(hover);}} onMouseOver={()=>{setHover(true);console.log(hover)}} className="user-profile mx-[1em] flex lg:border rounded-full items-center lg:max-w-[130px] flex-reverse">
            <img src={props.user[0][0].image ? props.user[0][0].image : profileImg} className="m-0 lg:ml-[1em] w-[50%] lg:w-[25%] rounded-full" alt="" />
            <h3 className="font-bold text-red-600 text-sm px-[20px] w-fit hidden lg:block">{props.user[0][0].userName}</h3>
            <div className={`absolute pop-login  bottom-[-94px] border w-[150px] bg-white ${hover ? "pt-[1em]" : "p-0 m-0" } rounded`}>
            <ul>
              <Link onClick={()=>{localStorage.clear();window.location.reload();}} className="my-[4px] mx-auto w-fit text-black text-xl block p-[0.5em] hover:text-white transition rounded hover:bg-red-600 px-[2em]"><li>Log out</li></Link>
              <Link to="/cart" className="text-xl w-fit py-[0.4em] p-[0.5em] hover:text-white transition rounded hover:bg-red-600 px-[2em] block mx-auto text-black"><li>My Cart</li></Link>
            </ul>
          </div>
          </div>
         
          </>
        ) : (
          <Link to="./login">
            <button className="border border-red-600 mx-[5px] text-xl text-red-600 transition hover:bg-red-600 hover:text-white">
              Login
            </button>
          </Link>
        )}

        <Link to="./about">
          <button className="border border-red-600  md:text-xl mx-[5px] text-red-600 transition hover:bg-red-600 hover:text-white">
            About Shopify
          </button>
        </Link>

        <Link to="cart" className="text-white min-w-[40px] relative">
          <AiFillShopping
            className="bg-[#ffffff2b] hover:bg-[#ffffff7b] transition text-black p-[0.5em] rounded-full"
            size={30}
          />
          <span className="bg-red-600 py-[1px] px-[5px] h-fit rounded-full top-[-1px] right-[0px] text-white absolute font-black">
            {total}
          </span>
        </Link>
      </div>
    </div>
  );
}
