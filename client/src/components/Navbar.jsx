import { useNavigate } from "react-router-dom";
import { Menu, LogOut, CircleDollarSign } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";


function Navbar({ onMenuClick }) {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");

      setUser(null);

      navigate("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-3 sm:px-6">

      {/* Left */}

      <div className="flex items-center gap-2 sm:gap-3 min-w-0">

        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-2">
  <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center">
    <CircleDollarSign
      size={20}
      className="text-emerald-600"
    />
  </div>

  <h1 className="text-lg sm:text-xl font-bold text-gray-800 whitespace-nowrap">
    Money Metrics
  </h1>
</div>

      </div>


      {/* Right */}

      <div className="flex items-center gap-2 sm:gap-4">

        <div className="hidden sm:block text-sm text-gray-600">
          Welcome,{" "}
          <span className="font-medium text-gray-800">
            {user?.name.slice(0,1).toUpperCase() + user?.name.slice(1)    }
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={17} />

          <span className="hidden sm:inline">
            Logout
          </span>
        </button>

      </div>

    </header>
  );
}

export default Navbar;