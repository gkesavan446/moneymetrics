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

  return (
    <div>
      <h1>ResetPassword</h1>
    </div>
  );
}

export default ResetPassword;