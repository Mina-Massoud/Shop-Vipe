import { urlFor } from "../../SanityData/client";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { BsArrowLeftSquareFill } from "react-icons/bs";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import ReactLoading from "react-loading";
export default function HeroBanner(props) {
  let myBannerData = props.bannerData;
  console.log(myBannerData);
  myBannerData = myBannerData.filter((banner)=> { 
    return banner.category === "Headset"
  })
  let renderBanner = myBannerData.map((banner) => {
    return (
      <SwiperSlide key={banner._id}>
        <div className="overflow-hidden  relative rounded mx-auto bg-[#ff000038] min-h-[250px] px-[3em] w-full lg:w-[85%] py-[3em] my-[3em]">
          <p className=" text-lg lg:text-2xl mx-[0.2em] font-bold">{banner.smallText}</p>
          <h2 className="text-4xl my-[0.2em] font-bold z-50 relative">{banner.midText}</h2>
          <img
            className="absolute bottom-[42px] lg:bottom-[0] w-[170px] md:w-[250px] lg:w-[400px] right-[12%] md:right-[30%]"
            src={urlFor(banner.image)}
            alt=""
          />
          <h1 className="text-5xl lg:text-[15rem] font-bold z-50 relative">{banner.largeText1}</h1>
          <Link to="/categories/Headset">
            <button className="z-2 text-sm lg:text-[1.2em] relative lg:p-[2em] mt-[8em] lg:my-[5em] lg:my-[2em] bg-red-700 text-white py-[1em]">
              Shop wireless headphone
            </button>
          </Link>
          <div className="desc absolute right-[3em] bottom-[3em] max-w-[200px]">
            <p className="text-red-600 text-[1rem] lg:text-[1.2rem] font-bold">Description</p>
            <p className="text-[1rem] lg:text-[1.2rem]">{banner.desc}</p>
          </div>
        </div>
      </SwiperSlide>
    );
  });
  return props.bannerData.length ? (
    <div className="slider-banner relative ">
      <Swiper
        allowTouchMove={false}
        navigation={{
          nextEl: ".right-slider-banner",
          prevEl: ".left-slider-banner",
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {renderBanner}
      </Swiper>
      <button className="right-slider-banner">
        <BsArrowRightSquareFill size={35} />
      </button>
      <button className="left-slider-banner">
        <BsArrowLeftSquareFill size={35} />
      </button>
    </div>
  ) : (
    ""
  );
}
