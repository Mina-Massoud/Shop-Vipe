import { urlFor } from "../../SanityData/client";
import { AiOutlinePlus } from "react-icons/ai";
import { BiMinus } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import shoppingCart from "../images/shoppingcart.png";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import CountUp from "react-countup";
import clicksound from "../audio/clicksound.wav";
import "animate.css";
function Cart(props) {
  let [modifyingCart, setModifyingCart] = useState([]);
  const audio = new Audio(clicksound);
  audio.volume = 0.3;
  let [isDeleted, isDeletedSet] = useState(false);
  let totalPriceOfCart = 0;
  useEffect(() => {
    setModifyingCart(props.cart);
  }, [props.cart]);
  function HandleDelete(index) {
    isDeleted = true;
    setTimeout(() => {
      if (isDeleted) {
        const newCart = modifyingCart.filter((_, i) => i !== index);
        props.updateGlobalState(newCart);
      }
      isDeleted = false;
    }, 0);
  }

  function add(index) {
    audio.play();
    const newCart = [...modifyingCart]; // create a shallow copy of the state array
    newCart[index].quantity++; // modify the copy
    setModifyingCart(newCart); // set the state to the new copy
    props.updateGlobalState(newCart); // update the global state
  }

  function minus(index) {
    audio.play();
    if (props.cart[index].quantity > 1) {
      const newCart = [...modifyingCart]; // create a shallow copy of the state array
      newCart[index].quantity--; // modify the copy
      setModifyingCart(newCart); // set the state to the new copy
      props.updateGlobalState(newCart); // update the global state
    }
  }
  let renderCart = modifyingCart.map((productdetail, i) => {
    return (
      <div
        className={`flex lg:flex-row flex-col items-start py-[1em] lg:py-[3em] w-full xl:w-[49%]  lg:max-h-[160px] px-[2em] my-[2em] bg-[#c700000d] rounded lg:items-center justify-between tranisition ${
          isDeleted ? "opacity-0" : "opacity-1"
        }`}
        key={productdetail.product._id}
      >
        <div className="info-cont flex pt-[2em] items-start lg:items-unset">
          <Link className="w-fit" to={`/product/${productdetail.product.slug.current}`}>
          <img
            className="max-w-[100px] hover:bg-white hover:rounded-lg hover:border hover:border-red-600 transition mr-5"
            src={urlFor(productdetail.product.image[0])}
            alt=""
          />
          </Link>
          <div className="info-product flex flex-col justify-center">
            <h3 className="font-bold text-xl long-text">{productdetail.product.name}</h3>
            <p className="text-xl">
              total price :{" "}
              {productdetail.product.price * productdetail.quantity}
            </p>
          </div>
        </div>
        <div className="left-side-cart flex items-center py-[1em]">
          <AiFillDelete
            size={30}
            onClick={() => {
              HandleDelete(i);
            }}
            className={`cursor-pointer hover:scale-125 transition mx-[3em] text-red-700 bg-[#ff000026] p-[0.5em] rounded-full`}
          />
          <div className="qunatitySet flex items-center border w-fit py-2">
            <button onClick={() => minus(i)} className={`p-0 ${productdetail.quantity < 2 ? "cursor-not-allowed" : "" }`} disabled={productdetail.quantity > 1 ? false : true}>
              <BiMinus
                className={`mx-5 ${
                  productdetail.quantity
                    ? "text-red-500"
                    : "text-[#383838] cursor-not-allowed"
                } `}
                size={10}
              />
            </button>
            <span className="px-[1em] text-2xl border-r-[1px] border-l-[1px]">
              {productdetail.quantity}
            </span>
            <button
              onClick={() => {
                add(i);
              }}
              className="p-0"
            >
              <AiOutlinePlus className="mx-5 text-green-500" size={10} />
            </button>
          </div>
        </div>
      </div>
    );
  });
  let table = modifyingCart.map((productdetail, i) => {
    let totalOfproduct = productdetail.product.price * productdetail.quantity;
    totalPriceOfCart += totalOfproduct;
    return (
      <tr key={productdetail.product._id}>
        <td
          className={`border ${i % 2 ? "bg-white" : "bg-gray-100"} px-4 py-2`}
        >
          {productdetail.product.name}
        </td>
        <td
          className={`border ${i % 2 ? "bg-white" : "bg-gray-100"} px-4 py-2`}
        >
          {totalOfproduct}
        </td>
        <td
          className={`border ${i % 2 ? "bg-white" : "bg-gray-100"} px-4 py-2`}
        >
          {productdetail.quantity}
        </td>
      </tr>
    );
  });
  return (
    <>
      {props.cart.length ? (
        <div className="Cart p-[1em] lg:p-[2em] resHeight bg-[#ff000017] animate__animated animate__zoomIn">
          <div className="m-[2em] p-[2em] lg:p-[5em] bg-[white] rounded h-[95%]">
            <h1 className="font-bold text-[2.5rem] py-[1em] text-[#303038]">
              My Orders
            </h1>
            <div className="items-cont flex flex-wrap justify-between">
              {renderCart}
              <div className="table-cont py-[3em] w-full xl:w-[49%] px-[2em] my-[2em] border rounded">
                <table className="table-auto w-full py-[3em]">
                  <thead>
                    <tr>
                      <th className="px-4 bg-white py-2 text-left">Product</th>
                      <th className="px-4 bg-white py-2 text-left">Price</th>
                      <th className="px-4 bg-white py-2 text-left">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>{table}</tbody>
                </table>
              </div>
              <div className="button-cont w-full xl:w-[49%] my-[2em]">
                <Link to="/checkout">
                  <button className="border border-red-600 text-red-600 hover:text-white hover:bg-red-600 transition w-[50%] text-xl h-[50px]">
                    Check out
                  </button>
                </Link>
                <p className="w-[70%] py-[1em] text-lg">
                  note: the checkout functionality on our platform has been
                  developed using Stripe, a popular payment processing library
                  that provides secure and reliable payment solutions for
                  businesses.
                </p>
                <h2 className="text-2xl">
                  Total Price :{" "}
                  <span className="text-red-600 font-black">
                    <CountUp end={totalPriceOfCart} duration={1} /> LE
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="resHeight text-center animate__animated animate__zoomIn">
          <img src={shoppingCart} className="max-w-[300px] mx-auto" alt="" />
          <h1 className="text-5xl py-5 w-fit mx-auto font-black text-[#00272e]">
            Your Shopping Bag is Empty!
          </h1>
          <Link to="/">
            <button className="block rounded text-2xl my-[3em] text-white hover:transfo mx-auto w-fit bg-red-600">
              CONTINUE SHOPPING
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
export default React.memo(Cart);
