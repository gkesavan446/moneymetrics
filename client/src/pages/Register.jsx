import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WalletCards } from "lucide-react";
import api from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await api.post(
        "/auth/register",
        formData
      );

      navigate("/login");

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md">

        {/* Brand */}

        <div className="flex flex-col items-center mb-6">

          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
            <WalletCards
              size={26}
              className="text-emerald-600"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Money Metrics
          </h1>

          <p className="text-sm text-gray-500 mt-1 text-center">
            Take control of your everyday finances.
          </p>

        </div>


        {/* Register Card */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 shadow-sm">

          <div className="mb-6">

            <h2 className="text-xl font-semibold text-gray-800">
              Create your account
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Start tracking your income and expenses.
            </p>

          </div>


          {/* Error */}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-5 text-sm">
              {error}
            </div>
          )}


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Name */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full h-11 border border-gray-300 rounded-lg px-4 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                required
              />

            </div>


            {/* Email */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full h-11 border border-gray-300 rounded-lg px-4 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                required
              />

            </div>


            {/* Password */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full h-11 border border-gray-300 rounded-lg px-4 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                required
              />

            </div>


            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading
                ? "Creating account..."
                : "Register"}
            </button>

          </form>


          {/* Login Link */}

          <p className="mt-6 text-sm text-gray-500 text-center">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-medium text-emerald-600 hover:text-emerald-700"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;