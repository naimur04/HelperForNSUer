import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';

axios.defaults.withCredentials = true; 

function Menu() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8081/');
        if (response.data.valid) {
          setLoading(false); 
        }
      } catch (err) {
        console.error("Authentication check failed:", err);
        setError("You must be logged in to access this page");
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8081/logout');
      console.log('Logout response:', response.data);
      if (response.status === 200) {
        navigate('/login');
      } else {
        alert("Failed to logout. Please try again!");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert(`Failed to logout: ${error.response ? error.response.data : error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#15B4CE" }}>
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#15B4CE" }}>
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="vh-100" style={{ backgroundColor: "#15B4CE" }}>
      {/* Header Section */}
      <header className="d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: '#000435', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
        <img src="LOGONSU.png" alt="Logo" style={{ height: '80px', marginRight: '10px' }} />
        <div className="text-center text-white">
          <h1 className="m-0">NSU Help Zone</h1>
          <h4 className="m-0">A Simple Platform for NSUers</h4>
        </div>
        <Dropdown>
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            <i className="bi bi-person-circle"></i>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
            <Dropdown.Item href="/">Back Home</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </header>

      {/* Menu Section */}
      <div className="d-flex justify-content-center align-items-center" style={{ height: 'calc(100vh - 100px)' }}>
        <div className="bg-white p-5 rounded shadow-lg w-50" style={{ opacity: 0.6 }}>
          <h2 className="text-center mb-4">Menu</h2>
          <div className="row row-cols-2 g-4">
            <div className="col"><Link to="/library" className="btn btn-info w-100 btn-lg">Library Book Availability</Link></div>
            <div className="col"><Link to="/medical" className="btn btn-info w-100 btn-lg">Medical Services</Link></div>
            <div className="col"><Link to="/food-stalls" className="btn btn-info w-100 btn-lg">Food Stall Information</Link></div>
            <div className="col"><Link to="/course-ride" className="btn btn-info w-100 btn-lg">Courses & Ride-Sharing</Link></div>
            <div className="col"><Link to="/suggestions" className="btn btn-info w-100 btn-lg">Suggestion Box</Link></div>
            <div className="col"><Link to="/clubs" className="btn btn-info w-100 btn-lg">Club Information</Link></div>
            <div className="col"><Link to="/gym-sports" className="btn btn-info w-100 btn-lg">Gymnasium & Sports Details</Link></div>
            <div className="col"><Link to="/administration" className="btn btn-info w-100 btn-lg">Administration Info</Link></div>
            <div className="col"><Link to="/parking-print" className="btn btn-info w-100 btn-lg">Parking & Print Zone</Link></div>
            <div className="col"><Link to="/resumes" className="btn btn-info w-100 btn-lg">CV Builder</Link></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;