import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleDollarSign, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useAuth();
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

      const response = await api.post(
        "/auth/login",
        formData
      );

      setUser(response.data.user);

      navigate("/dashboard");

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Login failed"
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

            <CircleDollarSign
              size={26}
              className="text-emerald-600"
            />

          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Money Metrics
          </h1>

          <p className="text-sm text-gray-500 mt-1 text-center">
            Track your money. Understand your spending.
          </p>

        </div>


        {/* Login Card */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 shadow-sm">

          <div className="mb-6">

            <h2 className="text-xl font-semibold text-gray-800">
              Welcome back
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Sign in to continue to your dashboard.
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

              <div className="flex items-center justify-between mb-1.5">

                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>

                <Link
                  to="/forgotpassword"
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                >
                  Forgot password?
                </Link>

              </div>

              {/* <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full h-11 border border-gray-300 rounded-lg px-4 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                required
              /> */}

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full h-11 border border-gray-300 rounded-lg px-4 pr-11 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>

            </div>


            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>


          {/* Register */}

          <p className="mt-6 text-sm text-gray-500 text-center">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="font-medium text-emerald-600 hover:text-emerald-700"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;