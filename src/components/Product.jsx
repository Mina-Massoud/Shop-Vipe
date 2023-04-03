import { Link } from "react-router-dom";
import { urlFor } from "../../SanityData/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSearchParams } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { Pagination, Navigation } from "swiper";
import CurrencyFormat from "react-currency-format";
import { useState } from "react";
export default function Product(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  let typeFilter = searchParams.get("type");
  const maxPriceFilter = searchParams.has("maxPrice")
    ? searchParams.get("maxPrice") === "0"
      ? Infinity
      : searchParams.get("maxPrice")
    : Infinity;

  const minPriceFilter = searchParams.has("minPrice")
    ? searchParams.get("minPrice") 
    : 0;
  console.log(maxPriceFilter);
  const [swiperRef, setSwiperRef] = useState(null);
  const myProductDataArr = props.products;
  const slidesPerView = {
    320: 2, // when the screen size is less than 320px, show one slide per view
    640: 2, // when the screen size is less than 640px, show two slides per view
    768: 5, // when the screen size is less than 768px, show three slides per view
    1024: 6, // when the screen size is less than 1024px, show four slides per view
  };

  const breakpoints = {
    // when window width >= 320px
    320: {
      slidesPerView: slidesPerView[320],
      spaceBetween: 20,
    },
    // when window width >= 640px
    640: {
      slidesPerView: slidesPerView[640],
      spaceBetween: 30,
    },
    // when window width >= 768px
    768: {
      slidesPerView: slidesPerView[768],
      spaceBetween: 40,
    },
    // when window width >= 1024px
    1024: {
      slidesPerView: slidesPerView[1024],
      spaceBetween: 50,
    },
  };
  let myProdcutDataHandlied = myProductDataArr.filter((product) => {
    return product.price >= minPriceFilter && product.price <= maxPriceFilter;
  });
  let myElements = typeFilter
    ? myProdcutDataHandlied.filter((product) => {
        return product.category === typeFilter;
      })
    : myProdcutDataHandlied;
      console.log("product");
  let myProducts = myElements.map((product) => {
    return (
      <SwiperSlide key={product._id}>
        <div
          className="m-[2em] hover:scale-[1.1] transition max-w-[200px] mx-auto"
          key={product._id}
        >
          <Link
            className="relative block productCard"
            to={`/product/${product.slug.current}`}
          >
            <img
              className="aspect-ratio object-contain rounded-lg p-[1em] bg-[#8f8f8f21] transition"
              src={urlFor(product.image[0])}
              alt=""
            />
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault(event);
                props.addCart(product);
              }}
              className="absolute bottom-0 hover-cart left-0 text-2xl bg-red-600 text-white rounded p-2 w-full"
            >
              Add Cart
            </button>
          </Link>
          <h3 className="my-[1em] text-[#555] text-xl font-semibold long-text ">
            {product.name}
          </h3>
          <p className="text-xl text-[#555] font-bold">
            {!product.price ? (
              "Free"
            ) : (
              <CurrencyFormat
                displayType="text"
                thousandSeparator={true}
                value={product.price}
                renderText={(value) => value}
              />
            )}{" "}
            LE
          </p>
        </div>
      </SwiperSlide>
    );
  });
  return (
    <>
      {myProducts.length ? (
        <div className="cont-product my-[3em] relative w-[100%]">
          <Swiper
            allowTouchMove={false}
            onSwiper={setSwiperRef}
            breakpoints={breakpoints}
            centeredSlides={false}
            spaceBetween={20}
            navigation={{
              nextEl: ".right",
              prevEl: ".left",
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper w-[80%] products-cont animate__animated animate__zoomIn"
          >
            {myProducts}
          </Swiper>
          <button className="right">
            <BsArrowRightSquareFill size={25} />
          </button>
          <button className="left">
            <BsArrowLeftSquareFill size={25} />
          </button>
        </div>
      ) : minPriceFilter ? (
        <h1 className="py-[1em] my-[1em] border animate__animated animate__zoomIn">
          Sorry no products found with your specification
        </h1>
      ) : (
        <h1 className="font-black py-[2em]  animate__animated animate__zoomIn">loading...</h1>
      )}
    </>
  );
}
