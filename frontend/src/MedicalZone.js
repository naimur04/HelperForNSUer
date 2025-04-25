import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const MedicalZone = () => {
  const navigate = useNavigate();
  const [medicalCenters, setMedicalCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMedicalCenters();
  }, []);

  const fetchMedicalCenters = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:8081/medical-centers");
      setMedicalCenters(response.data);
    } catch (err) {
      setError("Failed to load medical center information. Please try again.");
      console.error("Error fetching medical center data:", err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{ 
        backgroundColor: "#15B4CE",
        minHeight: "100vh"
      }}
    >
      {/* Header Section */}
      <header 
        className="d-flex justify-content-between align-items-center p-3" 
        style={{ 
          backgroundColor: '#000435', 
          position: 'sticky', 
          top: 0, 
          zIndex: 10, 
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' 
        }}
      >
        <img src="LOGONSU.png" alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
        <div className="text-center text-white">
          <h4 className="m-0">NSU Help Zone</h4>
          <h6 className="m-0">A Simple Platform for NSUers</h6>
        </div>
        <button 
          onClick={() => navigate('/menu')} 
          className="btn btn-info"
        >
          Back
        </button>
      </header>

      {/* Medical Zone Content */}
      <div className="d-flex justify-content-center align-items-start py-5" 
           style={{ minHeight: 'calc(100vh - 100px)' }}>
        <div className="bg-white p-5 rounded shadow-lg w-75" style={{ opacity: 0.90 }}>
          <h2 className="text-center mb-4">Medical Centers</h2>

          {loading ? (
            <p className="text-center">Loading medical centers...</p>
          ) : error ? (
            <div className="text-center">
              <p className="text-danger mb-3">{error}</p>
              <button 
                onClick={fetchMedicalCenters}
                className="btn btn-info"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <thead className="bg-info text-white">
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Contact Details</th>
                    <th>Operating Hours</th>
                    <th>Facilities</th>
                    <th>Medical Staff</th>
                    <th>Emergency Services</th>
                  </tr>
                </thead>
                <tbody>
                  {medicalCenters.map((center) => (
                    <tr key={center.id}>
                      <td>{center.name}</td>
                      <td>{center.location}</td>
                      <td>{center.contact_details}</td>
                      <td>{center.operating_hours}</td>
                      <td>{center.facilities}</td>
                      <td>{center.medical_staff || "Not specified"}</td>
                      <td>{center.emergency_services || "Not specified"}</td>
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

export default MedicalZone;