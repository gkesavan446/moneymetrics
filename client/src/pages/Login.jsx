import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";

function Login() {

    const [formData, setFormData] = useState({
      email: "",
      password: ""
    })

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const {setUser} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
      const { name, value} = e.target
      setFormData({
        ...formData, [name]: value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          setError("")
          setLoading(true)

          const response = await api.post("/auth/login", formData)
          setUser(response.data.user);
          console.log("response.data.user", response)
          navigate('/dashboard')
      } catch (error) {
        setError(error.response?.data?.message || "Login Failed")
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

        <h2 className="text-xl font-semibold mb-6">
          Login
        </h2>

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
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-sm">
          <Link
            to="/forgotpassword"
            className="text-blue-600"
          >
            Forgot password?
          </Link>
        </div>

        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;