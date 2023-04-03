import { useEffect, useState } from "react";
import { VscClose } from "react-icons/vsc";
import { urlFor } from "../../SanityData/client";
import React from "react";
import "animate.css";

function CartPopOut(props) {
  let [close, setClose] = useState(false);
  useEffect(() => {
    setClose((prev) => false);
    const timeoutId = setTimeout(() => {
      setClose(true);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [props.cartPopOut]);
  function closePopOutHandle() {
    setClose((prev) => true);
  }
  console.log(props.cartPopOut.quantity);
  return (
    <>
      {Object.keys(props.cartPopOut).length > 0 ? (
        <div
          className={`popOut fixed w-[280px] border border-red-600 z-50 flex flex-col justify-center bg-white text-black p-2 rounded animate__animated  ${
            close ? "animate__zoomOut" : "animate__zoomIn"
          } transition right-[10px] top-[68px]`}
        >
          <div className="top-side flex border-b-[2px]  p-2 justify-between items-center">
            <p className="mx-4 text-xl">Product added to Cart</p>
            <VscClose
              onClick={() => closePopOutHandle()}
              size={18}
              className="text-red-800 hover:bg-[#75000040] transition p-1 rounded-full"
            />
          </div>
          <div className="down-side flex flex-col py-5 justify-center">
            <div className="infoCont flex py-2">
              <img
                className="aspect-ratio object-contain w-[50px] mr-4"
                src={urlFor(props.cartPopOut.product.image[0])}
                alt=""
              />
              <p className="text-xl text-[#555] max-w-[200px]">
                {props.cartPopOut.product.name}
              </p>
            </div>
            <p className="text-left px-5 pt-5 border-t-[2px] text-xl ">
              total of this product : {props.cartPopOut.quantity}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export default React.memo(CartPopOut);
