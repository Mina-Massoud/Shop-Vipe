import { Link } from "react-router-dom";
import { urlFor } from "../../SanityData/client";
export default function FotterBanner(props) {
  let myBannerData = props.bannerData[0];
  return props.bannerData.length ? (
    <div className=" relative rounded mx-auto bg-red-600 text-white px-[5em] w-full lg:w-[70%] py-[7em] top-[50px] flex justify-between items-center">
      <div className="leftSide z-50 relative">
        <h2 className="text-2xl w-fit">{myBannerData.discount}</h2>
        <h1 className="w-fit text-[4rem] z-50 relative lg:text-[8rem] font-black">
          {myBannerData.largeText1}
        </h1>
        <h1 className="text-[3rem] lg:text-[8rem] font-black z-50 relative">{myBannerData.largeText2}</h1>
        <p className="w-fit">{myBannerData.saleTime}</p>
      </div>
      <img
        className="absolute bannerImage bottom-[10%] w-[250px] lg:w-[400px] right-[26%] lg:right-[30%]"
        src={urlFor(myBannerData.image)}
        alt=""
      />

      <div className="rightSide z-50 relative">
        <p className="text-lg lg:text-2xl  w-fit mx-[0.2em] font-bold">
          {myBannerData.smallText}
        </p>
        <h2 className="lg:text-6xl text-[1.2rem] w-fit my-[0.2em] font-bold">
          {myBannerData.midText}
        </h2>
        <Link to="product/apple-iphone-14-pro-max-256-gb-deep-gold">
          <button className="z-2 text-[1rem] lg:text-[1.5em] relative p-[2em] my-[2em] bg-white text-red-600 font-bold py-[0.5em]">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  ) : (
    ""
  );
}
