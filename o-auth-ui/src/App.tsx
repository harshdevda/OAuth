import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard";

const Login: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const { instance } = useMsal();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      setToken(tokenFromUrl);
      navigate("/dashboard", { replace: true });
    } else {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        navigate("/dashboard", { replace: true });
      }
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = "https://localhost:7104/api/auth/google-login";
  };

  const handleMicrosoftLogin = () => {
    window.location.href = "https://localhost:7104/api/auth/microsoft-login";
  };

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 text-center" style={{ width: "400px" }}>
        <h2 className="mb-3">Login</h2>
        <input type="text" className="form-control mb-2" placeholder="Username" disabled />
        <input type="password" className="form-control mb-3" placeholder="Password" disabled />
        <button className="btn btn-primary w-100 mb-3" disabled>
          Login
        </button>
        <h5>Or Login with</h5>
        <button className="btn btn-danger w-100 mb-2" onClick={handleGoogleLogin}>
          Login with Google
        </button>
        <button className="btn btn-info w-100" onClick={handleMicrosoftLogin}>
          Login with Microsoft
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
