import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const PrintZone = () => {
  const navigate = useNavigate();
  const [printInfo, setPrintInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrintInfo();
  }, []);

  const fetchPrintInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:8081/print-zone");
      setPrintInfo(response.data);
    } catch (err) {
      setError("Failed to load print zone information. Please try again.");
      console.error("Error fetching print zone info:", err);
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

      {/* Print Zone Content */}
      <div className="d-flex justify-content-center align-items-start py-5" 
           style={{ minHeight: 'calc(100vh - 100px)' }}>
        <div className="bg-white p-5 rounded shadow-lg w-75" style={{ opacity: 0.90 }}>
          <h2 className="text-center mb-4">Print Zone Information</h2>

          {loading ? (
            <p className="text-center">Loading print zone information...</p>
          ) : error ? (
            <div className="text-center">
              <p className="text-danger mb-3">{error}</p>
              <button 
                onClick={fetchPrintInfo}
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
                    <th>Printing Time</th>
                    <th>Allowed Pages</th>
                  </tr>
                </thead>
                <tbody>
                  {printInfo.map((info) => (
                    <tr key={info.id}>
                      <td>{info.printing_time}</td>
                      <td>{info.allowed_pages}</td>
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

export default PrintZone;