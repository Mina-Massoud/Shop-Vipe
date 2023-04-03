import { useParams } from "react-router-dom";
import BeautyStars from "beauty-stars";
import React from "react";
import { urlFor } from "../../SanityData/client";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiMinus } from "react-icons/bi";
import { Link } from "react-router-dom";
import clicksound from "../audio/clicksound.wav";
import Product from "./Product";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  sendObjectIDToDatabase,
  getReviews,
  getMyProduct,
} from "../../APIS/Fetching";
import "animate.css";
import Cart from "./Cart.jsx";
function productDetails(props) {
  let params = useParams();
  let [index, setIndex] = useState(0);
  const [textareaValue, setTextareaValue] = useState("");
  const [rating, setRating] = useState(0);
  const [myProduct, setMyProduct] = useState({});
  const [reviewFlag, setReviewFlag] = useState(false);
  let [reviews, SetReviews] = useState([]);
  let reviewsCheckTemp = { data: [] };
  const MySwal = withReactContent(Swal);
  async function getProduct(params) {
    setReviewFlag(true);
    try {
      let { id } = params;
      let product = await getMyProduct(id);
      product = product[0][0];
      setMyProduct(product);
      reviewsHandle(product);
    } catch (e) {
      console.log(e);
    }
  }
  // delcare audio
  console.log("Product detail Here");
  const audio = new Audio(clicksound);
  audio.volume = 0.3;
  // declare my products data

  const myProductDataArr = props.productsData;
  
  //functions
  // set Quantinty
  useEffect(() => {
    setIndex(0);
    props.setQuantity(0);
    getProduct(params);
    window.scrollTo({
      top: 0,
       // add smooth scrolling effect
    });
  }, [params.id]);


  async function reviewsHandle(product) {
    try {
      const reviewsCheck = await getReviews(product._id);
      if (reviewsCheck.data.length === 0 && reviewFlag) { 
        reviewsHandle(product);
      }
      SetReviews(reviewsCheck.data);
    } catch (e) {
      console.log(e);
    }
  }

  function add() {
    audio.play();
    props.setQuantity((prev) => prev + 1);
  }

  function handleTextareaChange(event) {
    setTextareaValue(event.target.value);
  }

  function minus() {
    audio.play();
    if (props.myQuantity > 0) props.setQuantity((prev) => prev - 1);
  }
  async function handleReviewSubmit() {
    let review = await sendObjectIDToDatabase(myProduct._id, textareaValue, rating);
    let myComments = [review.data,...reviews]
    SetReviews(myComments)
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your Review has been sent successfully",
      showConfirmButton: false,
      timer: 2500,
      text: "if your comment doesn't appear try reload the page",
    });
  }

  console.log(reviews);
  return (
    <>
      {Object.keys(myProduct).length > 0 ? (
        <div className="productDetailsPage overflow-x-hidden p-[3em] resHeight">
          <div className="productDetails flex flex-col items-center lg:items-start lg:flex-row px-[10em] py-[5em] flex animate__animated animate__zoomIn">
            <div className="imgContainer md: w-[70%] lg:w-[20%] min-w-[300px]">
              <img
                className="object-contain md:w-full lg:w-[80%] aspect-ratio bg-[#ff000021] rounded-lg p-[1em] hover:bg-red-600 transition"
                src={`${
                  myProduct.image[index]
                    ? urlFor(myProduct.image[index])
                    : urlFor(myProduct.image[0])
                }`}
                alt=""
              />
              <div className="moreImage w-[80%] flex items-center">
                {myProduct.image.map((img, i) => {
                  return (
                    <img
                      key={i}
                      className={`mx-[2.5%] my-4 w-[20%] aspect-ratio object-contain ${
                        i == index ? "bg-red-600" : "bg-[#ff000021]"
                      } rounded-lg p-[1em]  transition`}
                      src={urlFor(img)}
                      alt=""
                      onMouseEnter={() => setIndex(i)}
                    />
                  );
                })}
              </div>
            </div>
            <div className="rightSideProductDetails">
              <h1 className="font-bold text-blue-900 text-3xl lg:text-4xl lg:w-[80%] py-[0.1em] Captilize">
                {myProduct.name}
              </h1>
              <div className="containerStars py-[1em]">
                <BeautyStars
                  size={15}
                  value={myProduct.rating}
                  inactiveColor="white"
                  activeColor="red"
                />
              </div>
              <div className="details">
                <h3 className="text-3xl py-[0.5em] font-black">Details:</h3>
                <div className="details-cont flex flex-col w-full lg:w-[50%] py-[2em] ">
                  <p className="text-2xl w-full lg:w-[80%] flex justify-between w-[100%]">
                    <span className="font-semibold">Brand</span>{" "}
                    {myProduct.brand ? myProduct.brand : "N/A"}
                  </p>
                  <p className="text-2xl w-full lg:w-[80%] flex justify-between w-[100%]">
                    <span className="font-semibold">Colour</span>{" "}
                    {myProduct.colour ? myProduct.colour : "N/A"}
                  </p>
                  <p className="text-2xl w-full lg:w-[80%] flex justify-between w-[100%]">
                    <span className="font-semibold">Form Factor</span>{" "}
                    {myProduct.form_factor ? myProduct.form_factor : "N/A"}
                  </p>
                  <p className="text-2xl w-full lg:w-[80%] flex justify-between w-[100%]">
                    <span className="font-semibold">
                      Connectivity Technology
                    </span>{" "}
                    {myProduct.connectivity_technology
                      ? myProduct.connectivity_technology
                      : "N/A"}
                  </p>
                  <p className="text-2xl w-full lg:w-[80%] flex justify-between w-[100%]">
                    <span className="font-semibold">Age Range</span>{" "}
                    {myProduct.age_range ? myProduct.age_range : "N/A"}
                  </p>
                  <p className="text-2xl w-full lg:w-[80%] flex justify-between w-[100%]">
                    <span className="font-semibold">Control Type</span>{" "}
                    {myProduct.control_type ? myProduct.control_type : "N/A"}
                  </p>
                </div>

                <h1 className="font-black text-red-500 py-[0.2em]">
                  {myProduct.price ? `${myProduct.price} LE ` : "Free"}
                </h1>
                <div className="quantity py-[1em] flex justify-between items-center w-fit">
                  <h3 className="text-3xl py-[1em] mr-10 ">Quantity</h3>
                  <div className="qunatitySet flex items-center border w-fit py-2">
                    <button onClick={() => minus()} className="p-0">
                      <BiMinus
                        className={`mx-5 ${
                          props.myQuantity
                            ? "text-red-500"
                            : "text-[#383838] cursor-not-allowed"
                        } `}
                        size={30}
                      />
                    </button>
                    <span className="px-[1em] text-2xl border-r-[1px] border-l-[1px]">
                      {props.myQuantity}
                    </span>
                    <button onClick={() => add()} className="p-0">
                      <AiOutlinePlus
                        className="mx-5 text-green-500"
                        size={30}
                      />
                    </button>
                  </div>
                </div>
                <div className="AddtoCart flex justify-between w-fit">
                  <button
                    className="text-xl my-4 border-1 border-red-500 text-red-600 rounded:none lg:px-[2em] w-[150px] lg:px-[4em]"
                    onClick={() => {
                      props.addCart(myProduct, props.myQuantity);
                      props.setQuantity(0);
                    }}
                  >
                    Add to cart
                  </button>
                  <Link to="/checkout">
                    <button className="text-xl mx-4 bg-red-600 text-white rounded:none lg:px-[4em] w-[150px] my-4">
                      Buy now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="realted flex track w-[100%] p-5 border-t-[1px] border-[#00000024] justify-between items-center text-center">
            <Product
              index={index}
              setIndex={setIndex}
              addCart={props.addCart}
              products={myProductDataArr}
            />
          </div>
          <div className="review-section mx-0 lg:mx-[8em] py-[4em] px-[3em] flex flex-col justify-between border border-[#ff000021] rounded-lg">
            <h1 className="font-bold text-5xl text-[#da3400] py-[1em]">
              Write a review :
            </h1>
            <div className="reviews flex lg:flex-row flex-col  items-start justify-between">
              <div className="review-cont flex flex-col w-full lg:w-[30%] ">
                <BeautyStars
                  value={rating}
                  size={20}
                  inactiveColor={"#ff000021"}
                  activeColor={"red"}
                  onChange={(rating) => setRating(rating)}
                />
                <textarea
                  name=""
                  className="text-3xl text-black my-[1em] p-[1em] bg-white border rounded"
                  id=""
                  cols="50"
                  rows="5"
                  value={textareaValue}
                  placeholder="we kindly ask that all reviews and comments are made in a respectful and polite manner."
                  onChange={handleTextareaChange}
                ></textarea>
                <div className="buttons flex">
                  <button
                    className="text-3xl border border-red-600 hover:bg-red-600 hover:text-white transition bg-white text-red-600  rounded"
                    onClick={() => { handleReviewSubmit() ; setTextareaValue("")} }
                  >
                    Send
                  </button>
                </div>
              </div>
              <div className="reviews-details my-[2em] w-full lg:w-[60%]">
                {reviews.length > 0 ? (
                  reviews.map((review) => {
                    return (
                      <div
                        key={review._id}
                        className="review-client border border-[#ff000021] my-[1em] p-[2em]"
                      >
                        <p className="text-xl max-w-[250px] ">
                          identifier : {review._id}
                        </p>
                        <br></br>
                        <BeautyStars
                          size={15}
                          value={review.rating}
                          inactiveColor="#ff000021"
                          activeColor="red"
                        />
                        <br></br>
                        <h3 className="text-3xl text-[#4d4d4d] font-bold border-[0.1px] border-[#ff000021] p-[1em]">
                          {review.comment
                            ? review.comment
                            : "no comment provided"}
                        </h3>
                      </div>
                    );
                  })
                ) : (
                  <h1 className="border border-[#ff000021] my-[1em] p-[2em] text-3xl">
                    No Comments Yet &#129301;{" "}
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading....</h1>
      )}
    </>
  );
}
export default React.memo(productDetails);
