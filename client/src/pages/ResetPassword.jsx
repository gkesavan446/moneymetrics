import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleDollarSign, KeyRound } from "lucide-react";
import api from "../services/api.js";

function ResetPassword() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: ""
  });

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
      setMessage("");
      setError("");
      setLoading(true);

      const response = await api.post(
        "/auth/resetpassword",
        formData
      );

      setMessage(response?.data?.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Password reset failed"
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
            Set a new password for your account.
          </p>

        </div>


        {/* Card */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 shadow-sm">

          <div className="mb-6">

            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-4">
              <KeyRound
                size={20}
                className="text-emerald-600"
              />
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              Reset Password
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Enter the OTP sent to your email and choose a new password.
            </p>

          </div>


          {/* Success Message */}

          {message && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg px-4 py-3 mb-5 text-sm">
              {message}
            </div>
          )}


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


            {/* OTP */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                OTP
              </label>

              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                className="w-full h-11 border border-gray-300 rounded-lg px-4 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                required
              />

            </div>


            {/* New Password */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                New Password
              </label>

              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
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
                ? "Resetting..."
                : "Reset Password"}
            </button>

          </form>


          {/* Login Link */}

          <p className="mt-6 text-sm text-gray-500 text-center">

            Remember your password?{" "}

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

export default ResetPassword;