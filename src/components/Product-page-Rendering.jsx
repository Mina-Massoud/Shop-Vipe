import { useEffect, useState } from "react";
import product from "../../sanity_ecommerce/schemas/product";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { urlFor } from "../../SanityData/client";
import { useSearchParams } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import "animate.css";
import { AiOutlineUnorderedList } from "react-icons/ai";
export default function ProductPageRendering(props) {
  let params = useParams();
  let [close, setClose] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  let typeFilter = searchParams.get("brand");
  const [activeButton, setActiveButton] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const maxPriceFilter = searchParams.has("maxPrice")
    ? searchParams.get("maxPrice") === "0"
      ? Infinity
      : searchParams.get("maxPrice")
    : Infinity;
  let test = searchParams.get("brand");

  const minPriceFilter = searchParams.has("minPrice")
    ? searchParams.get("minPrice")
    : 0;

  const handleButtonClick = (buttonId) => {
    console.log(buttonId);
    setActiveButton(buttonId);
  };
  let ProductsOfCategoryFilter =
    props.productsData &&
    props.productsData.filter((product) => {
      return (
        product.category === params.categoryName,
        product.category === params.categoryName &&
          product.price >= minPriceFilter &&
          product.price <= maxPriceFilter
      );
    });
  let myElements = typeFilter
    ? ProductsOfCategoryFilter.filter((product) => {
        return product.brand === typeFilter;
      })
    : ProductsOfCategoryFilter;
  console.log(myElements);

  return (
    <div onClick={()=>!close && setClose(true)} className={`overflow-x-hidden category-page-render md:flex-row flex-col flex items-start animate__animated animate__zoomIn`}>
      <div className="left-side border p-[1em] mx-[1em] rounded-lg my-[10px] min-w-[200px] w-[100%] md:w-[14%]">
        <div className="brand-filter flex md:block items-start">
          <div className="list-category w-[30%] relative block md:hidden">
            <AiOutlineUnorderedList
              className="text-red-600 cursor-pointer"
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
              {ProductsOfCategoryFilter
                ? ProductsOfCategoryFilter.map((product, index) => {
                    if (product.brand) {
                      return (
                        <button
                          key={index}
                          onClick={
                            activeButton === `button${index}`
                              ? () => {
                                  searchParams.delete("brand");
                                  setSearchParams(searchParams);
                                  setActiveButton("");
                                }
                              : () => {
                                  {
                                    if (
                                      searchParams.has("minPrice") ||
                                      searchParams.has("maxPrice")
                                    ) {
                                      if (searchParams.has("brand")) {
                                        searchParams.delete("brand");
                                      }
                                      setSearchParams(
                                        (prev) =>
                                          `${prev}&brand=${product.brand}`
                                      );
                                    } else {
                                      setSearchParams(`brand=${product.brand}`);
                                    }
                                    handleButtonClick(`button${index}`);
                                  }
                                }
                          }
                          className={`text-xl w-[100px] my-[0.5em] font-bold rounded p-[0.5em] border border-red-600 text-red-600  hover:scale-[1.1] ${
                            activeButton === `button${index}` ? "isActive" : ""
                          } transition mx-[0.3em] block`}
                          disabled={close}
                        >
                          {product.brand}
                        </button>
                      );
                    }
                  })
                : ""}
            </div>
          </div>
          <div className="buttons-brand-filter hidden md:flex flex flex-wrap">
            {ProductsOfCategoryFilter
              ? ProductsOfCategoryFilter.map((product, index) => {
                  if (product.brand) {
                    return (
                      <button
                        key={index}
                        onClick={
                          activeButton === `button${index}`
                            ? () => {
                                searchParams.delete("brand");
                                setSearchParams(searchParams);
                                setActiveButton("");
                              }
                            : () => {
                                {
                                  if (
                                    searchParams.has("minPrice") ||
                                    searchParams.has("maxPrice")
                                  ) {
                                    if (searchParams.has("brand")) {
                                      searchParams.delete("brand");
                                    }
                                    setSearchParams(
                                      (prev) => `${prev}&brand=${product.brand}`
                                    );
                                  } else {
                                    setSearchParams(`brand=${product.brand}`);
                                  }
                                  handleButtonClick(`button${index}`);
                                }
                              }
                        }
                        className={`text-xl w-full md:w-[40%] max-h-[80px] my-[0.5em] font-bold p-[0.5em] border border-red-600 text-red-600 hover:scale-[1.1] ${
                          activeButton === `button${index}` ? "isActive" : ""
                        } transition block mr-[0.3em]`}
                      >
                        {product.brand}
                      </button>
                    );
                  }
                })
              : ""}
          </div>
          <div className="buttons-price-cont my-[0.5em]">
            <div className="inputs-filter-price flex flex-wrap items-center">
              <input
                type="number"
                step="any"
                placeholder="Min Price"
                onChange={(event) => setMinPrice(event.target.value)}
                className="w-[40%] border border-red-600 bg-white text-lg text-center px-[0.3em] h-[30px]"
              />

              <input
                type="number"
                step="any"
                placeholder="Max Price"
                onChange={(event) => setMaxPrice(event.target.value)}
                className="w-[40%] mx-[1em] border border-red-600 bg-white text-lg text-center px-[0.3em] h-[30px]"
              />
            </div>
            <button
                className="text-xl w-fit my-[1em] text-white bg-red-600 hover:scale-[1.04] transition"
                onClick={() => {
                  if (searchParams.has("brand")) {
                    if (
                      searchParams.has("minPrice") ||
                      searchParams.has("maxPrice")
                    ) {
                      searchParams.delete("minPrice");
                      searchParams.delete("maxPrice");
                    }
                    setSearchParams(
                      (prev) =>
                        `${prev}&minPrice=${minPrice ? minPrice : 0}&maxPrice=${
                          maxPrice ? maxPrice : 0
                        }`
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
      <div className="container-of-prodcuts resHeight flex flex-wrap w-full py-[3em]">
        {myElements.length ? (
          myElements.map((product) => {
            return (
              <div
                className=" mx-[0.5em] transition min-h-[300px] p-[0.5em] border-red-200 border rounded-lg w-[47%] sm:w-[23.4%] xl:w-[15%]"
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
                <h3 className="my-[1em] mx-[0.5em] text-[#555] text-xl font-semibold  ">
                  {product.name}
                </h3>
                <p className="text-xl text-[#555] mx-[0.5em] font-bold">
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
            );
          })
        ) : minPriceFilter ? (
          <h1 className="py-[1em] mx-auto my-[1em] animate__animated animate__zoomIn">
            Sorry no products found with your specification
          </h1>
        ) : (
          <h1 className="font-black py-[2em]  animate__animated animate__zoomIn">
            loading...
          </h1>
        )}
      </div>
    </div>
  );
}
