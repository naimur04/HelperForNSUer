import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Clubs = () => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching clubs"); 
        const response = await axios.get("http://localhost:8081/clubs");
        console.log("Clubs response:", response.data);
        setClubs(response.data);
      } catch (err) {
        console.error("Error fetching clubs:", err.response || err.message); 
        if (err.response?.status === 401) {
          setError("Session expired. Redirecting to login...");
          setTimeout(() => navigate("/login"), 2000);
        } else if (err.response?.status === 404) {
          setError("Clubs endpoint not found. Please check the backend.");
        } else if (err.response?.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError("Network error. Please check your connection and try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, [navigate]);

  return (
    <div
      style={{
        backgroundColor: "#15B4CE",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <header
        className="d-flex justify-content-between align-items-center p-3"
        style={{
          backgroundColor: "#000435",
          position: "sticky",
          top: 0,
          zIndex: 10,
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <img src="LOGONSU.png" alt="Logo" style={{ height: "50px", marginRight: "10px" }} />
        <div className="text-center text-white">
          <h4 className="m-0">NSU Help Zone</h4>
          <h6 className="m-0">A Simple Platform for NSUers</h6>
        </div>
        <button onClick={() => navigate("/menu")} className="btn btn-info">
          Back
        </button>
      </header>

      {/* Clubs Content */}
      <div
        className="d-flex justify-content-center align-items-start py-5"
        style={{ minHeight: "calc(100vh - 100px)" }}
      >
        <div className="bg-white p-5 rounded shadow-lg w-75" style={{ opacity: 0.9 }}>
          <h2 className="text-center mb-4">Clubs</h2>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Loading clubs...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-danger mb-3">{error}</p>
              <button onClick={() => window.location.reload()} className="btn btn-info">
                Retry
              </button>
            </div>
          ) : clubs.length === 0 ? (
            <p className="text-center">No clubs found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <thead className="bg-info text-white">
                  <tr>
                    <th>Name</th>
                    <th>Faculty Advisor</th>
                    <th>Advisor Email</th>
                    <th>Category</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {clubs.map((club) => (
                    <tr key={club.club_id}>
                      <td>{club.name}</td>
                      <td>{club.faculty_advisor}</td>
                      <td>{club.advisor_email}</td>
                      <td>{club.category}</td>
                      <td>{club.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clubs;