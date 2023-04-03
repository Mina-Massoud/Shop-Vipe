import { BsFacebook } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
export default function Footer() {
  return (
    <div className="footer h-[100px] flex text-white justify-center items-center py-[4em] bg-[#161616]">
      <p>© 2023 Mina Melad . All Rights Reserved</p>
      <div className="links flex">
        <a
          className="icon text-white hover:scale-125 transition duration-150 w-fit mx-5"
          target={"_blank"}
          href="https://www.facebook.com/profile.php?id=100011422489028"
        >
          <BsFacebook size={20} />{" "}
        </a>
        <a
          className="icon text-white hover:scale-125 transition duration-150 w-fit mx-5"
          target={"_blank"}
          href="https://www.linkedin.com/in/mina-melad"
        >
          <BsLinkedin size={20} />{" "}
        </a>
        <a
          className="icon text-white hover:scale-125 transition duration-150 w-fit mx-5"
          target={"_blank"}
          href="https://github.com/minamelad33333"
        >
          <BsGithub size={20} />{" "}
        </a>
      </div>
    </div>
  );
}
