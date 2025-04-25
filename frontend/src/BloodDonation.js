import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const BloodDonation = () => {
  const navigate = useNavigate();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterBloodGroup, setFilterBloodGroup] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    blood_group: "",
    phone: "",
    address: ""
  });
  const [successMessage, setSuccessMessage] = useState(""); 

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:8081/blood-donors");
      setDonors(response.data);
    } catch (err) {
      setError("Failed to load donor list. Please try again.");
      console.error("Error fetching donors:", err);
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
      await axios.post("http://localhost:8081/blood-donors/register", formData);
      setSuccessMessage("Successfully registered as a blood donor!"); 
      setFormData({ name: "", blood_group: "", phone: "", address: "" });
      setShowForm(false);
      fetchDonors(); 
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error("Error registering donor:", err);
      setError("Failed to register. Please try again.");
    }
  };

  const filteredDonors = filterBloodGroup
    ? donors.filter(donor => donor.blood_group === filterBloodGroup)
    : donors;

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

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

      {/* Blood Donation Content */}
      <div className="d-flex justify-content-center align-items-start py-5" 
           style={{ minHeight: 'calc(100vh - 100px)' }}>
        <div className="bg-white p-5 rounded shadow-lg w-75" style={{ opacity: 0.90 }}>
          <h2 className="text-center mb-4">Blood Donation</h2>

          {/* Success Message */}
          {successMessage && (
            <div className="alert alert-success text-center mb-4" role="alert">
              {successMessage}
            </div>
          )}

          {/* Filter Section */}
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <div>
              <label className="me-2">Filter by Blood Group:</label>
              <select 
                value={filterBloodGroup}
                onChange={(e) => setFilterBloodGroup(e.target.value)}
                className="form-select d-inline-block w-auto"
              >
                <option value="">All</option>
                {bloodGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
            <button 
              className="btn btn-info"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Close Form" : "Register as Donor"}
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
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    value={formData.blood_group}
                    onChange={(e) => setFormData({...formData, blood_group: e.target.value})}
                    required
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-info w-100">Register</button>
            </form>
          )}

          {/* Donors List */}
          {loading ? (
            <p className="text-center">Loading donors...</p>
          ) : error ? (
            <div className="text-center">
              <p className="text-danger mb-3">{error}</p>
              <button 
                onClick={fetchDonors}
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
                    <th>Blood Group</th>
                    <th>Phone</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDonors.map((donor) => (
                    <tr key={donor.id}>
                      <td>{donor.name}</td>
                      <td>{donor.blood_group}</td>
                      <td>{donor.phone}</td>
                      <td>{donor.address}</td>
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

export default BloodDonation;