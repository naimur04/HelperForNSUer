import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const RideSharing = () => {
  const navigate = useNavigate();
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterDestination, setFilterDestination] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    from_location: "",
    destination: "",
    class_start_time: "",
    class_end_time: "",
    phone: ""
  });

  useEffect(() => {
    fetchRiders();
  }, []);

  const fetchRiders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:8081/ride-sharing");
      setRiders(response.data);
    } catch (err) {
      setError("Failed to load ride sharing list. Please try again.");
      console.error("Error fetching riders:", err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/ride-sharing/register", formData);
      setSuccessMessage("Successfully registered for ride sharing!");
      setFormData({
        from_location: "",
        destination: "",
        class_start_time: "",
        class_end_time: "",
        phone: ""
      });
      setShowForm(false);
      fetchRiders();
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error("Error registering for ride sharing:", err);
      setError("Failed to register. Please try again.");
    }
  };

  const filteredRiders = filterDestination
    ? riders.filter(rider => rider.destination.toLowerCase().includes(filterDestination.toLowerCase()))
    : riders;

  return (
    <div style={{ backgroundColor: "#15B4CE", minHeight: "100vh" }}>
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

      {/* Ride Sharing Content */}
      <div className="d-flex justify-content-center align-items-start py-5" 
           style={{ minHeight: 'calc(100vh - 100px)' }}>
        <div className="bg-white p-5 rounded shadow-lg w-75" style={{ opacity: 0.90 }}>
          <h2 className="text-center mb-4">Ride Sharing</h2>

          {/* Success Message */}
          {successMessage && (
            <div className="alert alert-success text-center mb-4" role="alert">
              {successMessage}
            </div>
          )}

          {/* Filter Section */}
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <div>
              <label className="me-2">Filter by Destination:</label>
              <input
                type="text"
                value={filterDestination}
                onChange={(e) => setFilterDestination(e.target.value)}
                className="form-control d-inline-block w-auto"
                placeholder="Enter destination"
              />
            </div>
            <button 
              className="btn btn-info"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Close Form" : "Register for Ride"}
            </button>
          </div>

          {/* Registration Form */}
          {showForm && (
            <form onSubmit={handleRegister} className="mb-4 p-3 bg-light rounded">
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="From Location"
                    value={formData.from_location}
                    onChange={(e) => setFormData({...formData, from_location: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Destination (NSU)"
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="time"
                    className="form-control"
                    value={formData.class_start_time}
                    onChange={(e) => setFormData({...formData, class_start_time: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="time"
                    className="form-control"
                    value={formData.class_end_time}
                    onChange={(e) => setFormData({...formData, class_end_time: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-info w-100">Register</button>
            </form>
          )}

          {/* Riders List */}
          {loading ? (
            <p className="text-center">Loading riders...</p>
          ) : error ? (
            <div className="text-center">
              <p className="text-danger mb-3">{error}</p>
              <button 
                onClick={fetchRiders}
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
                    <th>From</th>
                    <th>Destination</th>
                    <th>Class Start</th>
                    <th>Class End</th>
                    <th>Phone</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRiders.map((rider) => (
                    <tr key={rider.id}>
                      <td>{rider.name}</td>
                      <td>{rider.from_location}</td>
                      <td>{rider.destination}</td>
                      <td>{rider.class_start_time}</td>
                      <td>{rider.class_end_time}</td>
                      <td>{rider.phone}</td>
                      <td>{rider.email}</td>
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

export default RideSharing;