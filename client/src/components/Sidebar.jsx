import { NavLink } from "react-router-dom";

import {
  X,
  LayoutDashboard,
  ReceiptText,
  CirclePlus,
  ChartNoAxesCombined
} from "lucide-react";

function Sidebar({
  sidebarOpen,
  setSidebarOpen
}) {

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-emerald-600 text-white"
        : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
    }`;

  const closeSidebar = () => {
    setSidebarOpen(false);
  };


  const navigation = (
    <nav className="space-y-1.5">

      <NavLink
        to="/dashboard"
        className={linkClass}
        onClick={closeSidebar}
      >
        <LayoutDashboard size={19} />
        Dashboard
      </NavLink>


      <NavLink
        to="/transactions"
        end
        className={linkClass}
        onClick={closeSidebar}
      >
        <ReceiptText size={19} />
        Transactions
      </NavLink>


      <NavLink
        to="/transactions/add"
        className={linkClass}
        onClick={closeSidebar}
      >
        <CirclePlus size={19} />
        Add Transaction
      </NavLink>


      <NavLink
        to="/reports"
        className={linkClass}
        onClick={closeSidebar}
      >
        <ChartNoAxesCombined size={19} />
        Reports
      </NavLink>

    </nav>
  );


  return (
    <>

      {/* Desktop Sidebar */}

      <aside className="hidden md:block w-60 shrink-0 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] p-4">

        <div className="mb-5 px-3">

          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Menu
          </p>

        </div>

        {navigation}

      </aside>


      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}


      {/* Mobile Sidebar */}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 p-4 shadow-xl transform transition-transform duration-300 md:hidden ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* Mobile Header */}

        <div className="flex items-center justify-between mb-7 px-1">

          <h2 className="text-lg font-bold text-emerald-600">
            Money Metrics
          </h2>

          <button
            onClick={closeSidebar}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
            aria-label="Close menu"
          >
            <X size={21} />
          </button>

        </div>

        {navigation}

      </aside>

    </>
  );
}

export default Sidebar;