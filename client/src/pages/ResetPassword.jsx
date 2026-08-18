import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../services/api.js'


function ResetPassword() {

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: ""
  })

  const handleChange = (e) => {
      const {name, value} = e.target
      setFormData({
        ...formData, [name]: value 
      })
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setLoading(true);
      setError("");
      
      const response = await api.post("/auth/resetpassword", formData);

      setMessage(response?.data?.message);
      setTimeout(()=> navigate("/login"), 1500)
    } catch (error) {
      setError(error.response?.data?.message || "Password reset failed")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center mb-6">
          Money Metrics
        </h1>

        <h2 className="text-xl font-semibold mb-2">
          Reset Password
        </h2>

        <p className="text-gray-600 text-sm mb-6">
          Enter the OTP sent to your email and choose a new password.
        </p>

        {message && (
          <p className="text-green-600 mb-4">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1">
              OTP
            </label>

            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-md"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="mt-4 text-sm">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-blue-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;