import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="md:px-6 lg:px-8 px-4 mt-6 mx-auto container py-12 mb-20">
      <div className="flex items-center gap-2.5 mb-10 pb-10 pt-4">
        <p className="text-gray-500">Home</p>
        <span className="text-gray-500">/</span>
        <h4 className="font-medium">404 Error</h4>
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="xl:text-9xl lg:text-8xl sm:text-7xl text-4xl font-medium mb-8 tracking-widest">
          404 Not Found
        </h1>
        <p className="sm:text-lg text-sm font-medium text-gray-800 mb-12">
          Your visited page not found. You may go home page.
        </p>
        <Link
          to="/"
          className="hover:bg-red-700 transition-all duration-300 cursor-pointer block bg-[#DB4444] sm:text-lg font-medium text-white lg:px-12 sm:px-8 px-4 sm:py-4 py-3 rounded-md tracking-wide sm:my-8 my-4"
        >
          Back to home page
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
