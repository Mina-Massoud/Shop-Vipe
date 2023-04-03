import { Link } from "react-router-dom";
import "animate.css";
export default function Error() {
  return (
    <section className="flex items-center animate__animated animate__zoomIn h-full p-16 dark:bg-black-900 dark:text-gray-100 resHeight ">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-black font-black">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl text-black font-semibold md:text-3xl">
            Sorry, Shopify Doesn't Complete yet!
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link
            to="/"
            className="px-8 py-3 rounded bg-red-600 text-white hover:none transition text-2xl font-black"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
