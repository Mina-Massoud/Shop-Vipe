import "animate.css";
import { Form, Link } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const userName = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const rePassword = formData.get("repassword");
  if (password === rePassword) {
    // submit the form
    // const response = await fetch('/register', {
    //   method: 'POST',
    //   body: formData,
    // });
    // // handle the response
  } else {
    // do not submit the form and display an error message
    alert("Passwords do not match");
  }
  console.log(userName, email, password, rePassword);
  return null;
}

export default function Register() {
  return (
    <div className="register flex resHeight animate__animated animate__zoomIn">
      <div className="form-cont w-[80%] lg:w-[30%] mx-auto my-[4em]">
        <Form method="post" className="border rounded p-[2em]">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            required={true}
            className="shadow rounded-lg appearance-none border rounded text-2xl w-full py-2 px-3 bg-white text-gray-700  focus:outline-none focus:shadow-outline"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
          />
          <label
            className="block text-gray-700 text-xl font-bold mb-2 my-[2em]"
            htmlFor="email"
          >
            Email
          </label>
          <input
            required={true}
            className="shadow rounded-lg appearance-none text-2xl border rounded w-full bg-white py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="******************"
          />
          <label
            className="block text-gray-700 text-xl font-bold mb-2 my-[2em]"
            htmlFor="password"
          >
            Password
          </label>
          <input
            required={true}
            className="shadow rounded-lg appearance-none text-2xl border rounded w-full bg-white py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="******************"
          />
          <p className="text-red-500 text-lg italic">
            Please choose a password.
          </p>
          <label
            className="block text-gray-700 text-xl font-bold mb-2 my-[2em]"
            htmlFor="password"
          >
            Re-enter password
          </label>
          <input
            required={true}
            className="shadow rounded-lg appearance-none text-2xl border rounded w-full bg-white py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="repassword"
            name="repassword"
            type="text"
            placeholder="Re-enter password"
          />
          <button className="bg-red-600 text-xl mr-[1em] text-white rounded my-[2em]">
            Register
          </button>
          <Link to="/login">
            <button
              type="button"
              className="bg-red-600 text-xl text-white rounded "
            >
              Login
            </button>
          </Link>
        </Form>
        <p className="text-2xl font-black py-[2em] text-red-600">
          Login or sRegeister from ShopVibe not available right now but you can
          use Google Login{" "}
        </p>
      </div>
    </div>
  );
}
