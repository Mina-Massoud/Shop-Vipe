import { Form, Link, Navigate } from "react-router-dom";
import "animate.css";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../SanityData/client";
export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(email, password);
  return null;
}
export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId: import.meta.env.VITE_REACT_API_GOOGLE_TOKEN,
        plugin_name: "chat",
      });
    });
  }, []);
  function responseGoogle(response) {
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };
    client.createOrReplace(doc).then(() => {
      navigate("/", { replace: true });
    });
  }
  return (
    <div className="login resHeight flex items-center animate__animated animate__zoomIn">
      <div className="form-cont w-[80%] lg:w-[30%] m-auto mt-[4em]">
        <Form method="post" className="border rounded p-[2em]">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            required={true}
            className="shadow rounded-lg appearance-none border rounded text-2xl w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Username"
          />
          <label
            className="block text-gray-700 text-xl font-bold mb-2 my-[2em]"
            htmlFor="password"
          >
            Password
          </label>
          <input
            required={true}
            className="shadow rounded-lg appearance-none text-2xl border border-red-500 rounded w-full bg-white py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="******************"
          />
          <p className="text-red-500 text-lg italic">
            Please choose a password.
          </p>
          <div className="flex items-center buttons-login">
            <button className="bg-red-600 text-xl mr-[1em] text-white rounded my-[2em]">
              Sign in
            </button>
            <Link to="/register">
              <button
                type="button"
                className="bg-red-600 text-xl text-white rounded "
              >
                Register
              </button>
            </Link>
            <GoogleLogin
              className="mx-[1em]"
              clientId={import.meta.env.VITE_REACT_API_GOOGLE_TOKEN}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </Form>
        <p className="text-3xl py-[2em] text-red-600">Login and Regeister from Shopify not available right now but you can use Google Login </p>
      </div>
    </div>
  );
}
