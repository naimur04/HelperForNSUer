import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Administration = () => {
  const navigate = useNavigate();
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching administrative offices"); // Debug log
        const response = await axios.get("http://localhost:8081/administrative-offices");
        console.log("Offices response:", response.data); // Debug log
        setOffices(response.data);
      } catch (err) {
        console.error("Error fetching offices:", err.response || err.message); // Debug log
        if (err.response?.status === 401) {
          setError("Session expired. Redirecting to login...");
          setTimeout(() => navigate("/login"), 2000);
        } else if (err.response?.status === 404) {
          setError("Administrative offices endpoint not found. Please check the backend.");
        } else if (err.response?.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError("Network error. Please check your connection and try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOffices();
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

      {/* Administration Content */}
      <div
        className="d-flex justify-content-center align-items-start py-5"
        style={{ minHeight: "calc(100vh - 100px)" }}
      >
        <div className="bg-white p-5 rounded shadow-lg w-75" style={{ opacity: 0.9 }}>
          <h2 className="text-center mb-4">Administrative Offices</h2>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Loading offices...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-danger mb-3">{error}</p>
              <button onClick={() => window.location.reload()} className="btn btn-info">
                Retry
              </button>
            </div>
          ) : offices.length === 0 ? (
            <p className="text-center">No offices found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <thead className="bg-info text-white">
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Location</th>
                    <th>Contact Email</th>
                    <th>Contact Phone</th>
                    <th>Website</th>
                  </tr>
                </thead>
                <tbody>
                  {offices.map((office) => (
                    <tr key={office.id}>
                      <td>{office.name}</td>
                      <td>{office.description}</td>
                      <td>{office.location}</td>
                      <td>{office.contact_email}</td>
                      <td>{office.contact_phone}</td>
                      <td>
                        {office.website_url ? (
                          <a href={office.website_url} target="_blank" rel="noopener noreferrer">
                            Visit
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </td>
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

export default Administration;