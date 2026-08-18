import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../services/api.js';



function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        setMessage("");
        setError("");
        setLoading(true);

        const response = await api.post('/auth/forgotpassword', {email});

        setMessage(response.data.message);
         setTimeout(()=> navigate("/resetpassword"), 1500)
      } catch (error) {
        setError(error.response?.data?.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
  }


  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center mb-6">
          Money Metrics
        </h1>

        <h2 className="text-xl font-semibold mb-2">
          Forgot Password?
        </h2>

        <p className="text-gray-600 text-sm mb-6">
          Enter your email and we'll send you an OTP to reset your password.
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-md"
          >
            {loading ? "Sending..." : "Send OTP"}
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

export default ForgotPassword;