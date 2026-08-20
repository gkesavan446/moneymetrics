import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Transactions from "./pages/Transactions.jsx";
import EditTransaction from "./pages/EditTransaction.jsx";
import AddTransaction from "./pages/AddTransaction.jsx";
import Reports from "./pages/Reports.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<Navigate to="/login" replace />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/resetpassword" element={<ResetPassword/>}/>
          <Route  element={<ProtectedRoute />}>
              <Route element={<DashboardLayout/>}>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/transactions" element={<Transactions/>}/>
                <Route path="/transactions/edit/:id"  element={<EditTransaction />}/>
                <Route path="/transactions/add"  element={<AddTransaction />}/>
                <Route path="/reports"  element={<Reports />}/>
              </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;