import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Dropdown, Button } from 'react-bootstrap';

axios.defaults.withCredentials = true;

function Home() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Checking authentication status"); // Debug log
        const res = await axios.get('http://localhost:8081/');
        console.log("Auth response:", res.data); // Debug log
        if (res.data.valid) {
          setName(res.data.name);
        } else {
          setError("Session invalid. Redirecting to login...");
          setTimeout(() => navigate('/login'), 2000);
        }
      } catch (err) {
        console.error("Error checking auth:", err.response || err.message); // Debug log
        if (err.response?.status === 401) {
          setError("Not authenticated. Redirecting to login...");
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setError("Failed to connect to server. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      console.log("Logging out"); // Debug log
      await axios.post('http://localhost:8081/logout');
      navigate('/login');
    } catch (err) {
      console.error("Error logging out:", err.response || err.message); // Debug log
      setError("Failed to logout. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#15B4CE' }}>
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ backgroundColor: '#15B4CE', color: 'white' }}>
        <p className="text-danger mb-3">{error}</p>
        <Button variant="info" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column justify-content-between vh-100" style={{ background: 'url(nsucamp.jpg) no-repeat center center/cover', color: 'white' }}>
      <header className="d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: '#000435' }}>
        <img src="LOGONSU.png" alt="Logo" style={{ height: '100px', marginRight: '10px' }} />
        <h4 className="m-0">Welcome {name}</h4>
        <div>
          <h1 className="m-0">NSU Help Zone</h1>
          <h4 className="m-0">A Simple Platform for NSUers</h4>
        </div>
        <Dropdown>
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            <i className="bi bi-person-circle"></i>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </header>

      <div className="text-center">
        <h2 className="mb-4">Explore Our Services</h2>
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <Button variant="info" className="btn-animated m-2" href="/menu">Menu</Button>

        </div>
      </div>

      <footer className="text-center p-3" style={{ backgroundColor: '#000435' }}>
        <a href="https://facebook.com" className="text-white m-2">Facebook</a>
        <a href="https://twitter.com" className="text-white m-2">Twitter</a>
        <a href="https://instagram.com" className="text-white m-2">Instagram</a>
      </footer>
    </div>
  );
}

export default Home;