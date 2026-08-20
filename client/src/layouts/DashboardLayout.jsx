import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar
        onMenuClick={() =>
          setSidebarOpen(true)
        }
      />

      <div className="flex">

        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;