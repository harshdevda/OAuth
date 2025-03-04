import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [protectedData, setProtectedData] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    const fetchProtectedData = async () => {
      try {
        const response = await axios.get("https://localhost:7104/api/protected", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.data.Message) {
          setProtectedData(response.data.Message);
        } else if (response.data.message) {
          setProtectedData(response.data.message);
        } else {
          setProtectedData(`Unexpected API response: ${JSON.stringify(response.data)}`);
        }
      } catch (error) {
        console.error("Error fetching protected data:", error);
        setProtectedData("Failed to load protected data.");
      }
    };
    
    
    

    fetchProtectedData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 text-center">
        <h2>Dashboard</h2>
        {protectedData ? <p>{protectedData}</p> : <p>Loading protected content...</p>}
        <button className="btn btn-danger mt-3" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
