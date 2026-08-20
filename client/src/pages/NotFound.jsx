import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import notFoundGif from "../assets/404.gif";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-lg text-center">

        {/* GIF */}

        <div className="flex justify-center mb-6">
          <img
            src={notFoundGif}
            alt="Page not found"
            className="w-full max-w-[300px] sm:max-w-[350px] h-auto"
          />
        </div>


        {/* 404 */}

        <h1 className="text-5xl sm:text-6xl font-bold text-emerald-600">
          404
        </h1>


        {/* Message */}

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-3">
          Page not found
        </h2>

        <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-md mx-auto">
          The page you're looking for doesn't exist or may have been moved.
        </p>


        {/* Button */}

        <div className="mt-7">

          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-700 transition"
          >
            <ArrowLeft size={18} />

            Back to Dashboard
          </Link>

        </div>

      </div>

    </div>
  );
}

export default NotFound;