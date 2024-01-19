import ui from "../images/ui-ma.png";
import "animate.css";
import { BsFacebook } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
export default function About() {
  return (
    <div className="who-am-i resHeight flex flex-col justify-center items-center animate__animated animate__zoomIn">
      <div className="mina">
        <h1 className="w-fit p-[1em] text-[3rem] font-bold">
          Hi , I'm Mina Melad
        </h1>
        <div className="links flex justify-center mb-[2em]">
          <a
            className="icon text-red-600 hover:scale-125 transition duration-150 w-fit mx-5"
            target={"_blank"}
            href="https://www.facebook.com/profile.php?id=100011422489028"
          >
            <BsFacebook size={40} />{" "}
          </a>
          <a
            className="icon text-red-600 hover:scale-125 transition duration-150 w-fit mx-5"
            target={"_blank"}
            href="https://www.linkedin.com/in/mina-melad"
          >
            <BsLinkedin size={40} />{" "}
          </a>
          <a
            className="icon text-red-600 hover:scale-125 transition duration-150 w-fit mx-5"
            target={"_blank"}
            href="https://github.com/minamelad33333"
          >
            <BsGithub size={40} />{" "}
          </a>
        </div>
      </div>

      <img src={ui} className="w-[80%] lg:max-w-[50%] scale" alt="" />
      <h3 className="w-fit text-[2rem] max-w-[70%] text-center lg:text-[4rem] font-bold text-red-600 pt-[1.5em]">
        ShopVibe is Website that has the main functionalities of any store
      </h3>
      <h4 className="w-fit text-[1.5rem] text-center lg:text-[2rem] text-red-600 p-[1em]">
        i built it to apply my knowledge of react and react router
      </h4>
      <h1 className="w-fit text-[2rem] lg:text-[4rem] py-[0.8em] text-black font-black">
        Finally i hope u like it guys !{" "}
      </h1>
    </div>
  );
}
