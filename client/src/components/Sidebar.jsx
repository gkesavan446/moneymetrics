import { NavLink  } from "react-router-dom";


function Sidebar(){

    const linkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg ${
      isActive
        ? "bg-emerald-600 text-white"
        : "text-gray-700 hover:bg-emerald-50"
    }`;

    return (
        <aside className="w-60 bg-white border-r min-h-[calc(100vh-4rem)] p-4">
      <nav className="space-y-2">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/transactions" end className={linkClass}>
          Transactions
        </NavLink>

        <NavLink to="/transactions/add" className={linkClass}>
          Add Transaction
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;