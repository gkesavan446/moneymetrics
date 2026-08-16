import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ResetPassword from "./pages/ResetPassword.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/resetpassword" element={<ResetPassword/>}/>
      </Routes>
    </Router>
  );
}

export default App;