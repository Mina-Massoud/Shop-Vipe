import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {BsArrowRightSquareFill} from "react-icons/bs"
import {BsArrowLeftSquareFill} from "react-icons/bs"
import { Pagination, Navigation } from "swiper";
import { getUser } from "../../APIS/Fetching";
export default function Text() { 
  const [swiperRef, setSwiperRef] = useState(null);
  async function test() { 
    let test = await getUser() ; 
    console.log(test);
  }
  useEffect(()=> { 
    test();
  },[])

  return (
    <>
      <h1>ff</h1>
    </>
  )
} 