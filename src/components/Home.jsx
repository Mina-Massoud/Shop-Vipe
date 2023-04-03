import Footer from "./Footer";
import FotterBanner from "./FotterBanner";
import HeroBanner from "./HeroBanner";
import { getCategories } from "../../APIS/Fetching";
import Product from "./Product";
// Import Swiper styles
import { memo } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Link, useSearchParams, useLoaderData } from "react-router-dom";
import "animate.css";
import { urlFor } from "../../SanityData/client";
import { useOutletContext } from "react-router-dom";
import { AiOutlineUnorderedList } from "react-icons/ai";
export default function Home(props) {
  const test = useOutletContext();
  const [activeButton, setActiveButton] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryData, setCategoryData] = useState([]);
  const handleButtonClick = (buttonId) => {
    console.log(buttonId);
    setActiveButton(buttonId);
  };
  console.log(maxPrice);
  async function getCategoriesData() {
    let myCategoryData = await getCategories();
    setCategoryData(myCategoryData);
  }
  useEffect(() => {
    getCategoriesData();
  }, []);
  console.log(categoryData);
  let [close, setClose] = useState(true);
  return (
    <>
      <div
        onClick={() => !close && setClose(true)}
        className="flex flex-col items-start home animate__animated animate__zoomIn"
      >
        <div className="left-side min-w-[300px] w-full my-[0.5em] px-[1em] flex justify-center items-center">
          <div className="left-side-home-section py-[1em] w-full flex-col flex border rounded-lg px-[2em]">
            <div className="filter-cont flex w-full justify-between items-center">
              <div className="category-filter ">
                <div className="buttons-category-filter hidden lg:flex flex-wrap items-center">
                  {categoryData[0]
                    ? categoryData[0].map((category, index) => {
                        return (
                          <button
                            key={index}
                            onClick={
                              activeButton === `button${index}`
                                ? () => {
                                    searchParams.delete("type");
                                    setSearchParams(searchParams);
                                    setActiveButton("");
                                  }
                                : () => {
                                    {
                                      if (
                                        searchParams.has("minPrice") ||
                                        searchParams.has("maxPrice")
                                      ) {
                                        if (searchParams.has("type")) {
                                          searchParams.delete("type");
                                        }
                                        setSearchParams(
                                          (prev) =>
                                            `${prev}&type=${category.name}`
                                        );
                                      } else {
                                        setSearchParams(
                                          `type=${category.name}`
                                        );
                                      }
                                      handleButtonClick(`button${index}`);
                                    }
                                  }
                            }
                            className={`text-xl my-[0.5em] font-bold rounded p-[0.5em] border border-red-600 text-red-600  hover:scale-[1.1] ${
                              activeButton === `button${index}`
                                ? "isActive"
                                : ""
                            } transition mx-[0.3em] block`}
                          >
                            {category.name}
                          </button>
                        );
                      })
                    : ""}
                </div>
                <div className="list-category relative block lg:hidden">
                  <AiOutlineUnorderedList
                    className="text-red-600 cursor-pointer	"
                    onClick={() => {
                      setClose((prev) => !prev);
                      console.log(close);
                    }}
                    size={30}
                  />
                  <div
                    className={`list-category-items animate__animated ${
                      close ? "animate__zoomOut" : "animate__zoomIn"
                    } h-auto p-[2em] my-[1em] left-[-28px] rounded border border-red-600 z-[50] absolute bg-white`}
                  >
                    {categoryData[0]
                      ? categoryData[0].map((category, index) => {
                          return (
                            <button
                              key={index}
                              onClick={
                                activeButton === `button${index}`
                                  ? () => {
                                      searchParams.delete("type");
                                      setSearchParams(searchParams);
                                      setActiveButton("");
                                    }
                                  : () => {
                                      {
                                        if (
                                          searchParams.has("minPrice") ||
                                          searchParams.has("maxPrice")
                                        ) {
                                          if (searchParams.has("type")) {
                                            searchParams.delete("type");
                                          }
                                          setSearchParams(
                                            (prev) =>
                                              `${prev}&type=${category.name}`
                                          );
                                        } else {
                                          setSearchParams(
                                            `type=${category.name}`
                                          );
                                        }
                                        handleButtonClick(`button${index}`);
                                      }
                                    }
                              }
                              className={`text-xl w-[100px] my-[0.5em] font-bold rounded p-[0.5em] border border-red-600 text-red-600  hover:scale-[1.1] ${
                                activeButton === `button${index}`
                                  ? "isActive"
                                  : ""
                              } transition mx-[0.3em] block`}
                              disabled={close}
                            >
                            
                              {category.name}
                            </button>
                          );
                        })
                      : ""}
                  </div>
                </div>
              </div>
              <div className="price-filter mx-[2em] flex flex-col h-fit mt-[0em] g-[-20px] justify-between">
                <div className="price-cont flex items-center">
                  <div className="buttons-price-cont w-full flex items-center">
                    <input
                      type="number"
                      step="any"
                      placeholder="Min Price"
                      onChange={(event) => setMinPrice(event.target.value)}
                      className="w-[30%] md:w-auto rounded border border-red-600 bg-white text-2xl text-center px-[0.3em] h-[30px]"
                    />

                    <input
                      type="number"
                      step="any"
                      placeholder="Max Price"
                      onChange={(event) => setMaxPrice(event.target.value)}
                      className="w-[30%] md:w-auto rounded mx-[1em] border border-red-600 bg-white text-2xl text-center px-[0.3em] h-[30px]"
                    />
                    <button
                      className="w-[40%] md:text-xl rounded text-white bg-red-600"
                      onClick={() => {
                        if (searchParams.has("type")) {
                          if (
                            searchParams.has("minPrice") ||
                            searchParams.has("maxPrice")
                          ) {
                            searchParams.delete("minPrice");
                            searchParams.delete("maxPrice");
                          }
                          setSearchParams(
                            (prev) =>
                              `${prev}&minPrice=${
                                minPrice ? minPrice : 0
                              }&maxPrice=${maxPrice ? maxPrice : 0}`
                          );
                        } else {
                          setSearchParams(
                            `&minPrice=${minPrice ? minPrice : 0}&maxPrice=${
                              maxPrice ? maxPrice : 0
                            }`
                          );
                        }
                      }}
                    >
                      Set Price
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full home-section py-[5em] px-[1em]">
          <HeroBanner bannerData={props.bannerData} />
          <div className="productsContainer container py-[3em] mx-auto text-center">
            <div className="headline-product py-[4em]">
              <h1 className="text-center text-5xl font-black text-red-600 py-[0.5em]">
                Categories
              </h1>
              <p className="text-center text-xl">Discover our Categories</p>
            </div>
            <div className="categories-rendering w-[90%] mx-auto flex flex-wrap justify-center">
              {categoryData[0] ? (
                categoryData[0].map((category) => {
                  return (
                    <div
                      key={category.name}
                      className="category-render hover:scale-[1.02] transition m-[0.5em] max-w-[45%] sm:max-w-[40%] md:max-w-[30%] lg:max-w-[20%] max-h-[400px]"
                    >
                      <h1 className="p-[0.3em] font-black captial text-3xl w-fit text-blue-900 ">
                        {category.name}
                      </h1>
                      <Link to={`/categories/${category.name}`}>
                        <img
                          className="w-full object-cover max-h-[80%] aspect-ratio rounded-lg "
                          src={urlFor(category.image)}
                          alt=""
                        />
                      </Link>
                    </div>
                  );
                })
              ) : (
                <h1>Loading...</h1>
              )}
            </div>

            <div className="all-prodcuts">
              <h1 className="text-red-600 font-bold pt-[1em]">All Prodcuts</h1>
              <p>Discover all our prodcuts</p>
              <Product
                minPrice={minPrice}
                maxPrice={maxPrice}
                addCart={props.addCart}
                products={props.productsData}
              />
            </div>

            <FotterBanner bannerData={props.bannerData} />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
