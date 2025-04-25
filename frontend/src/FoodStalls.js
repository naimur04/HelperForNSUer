import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const FoodStalls = () => {
  const navigate = useNavigate();
  const [stalls, setStalls] = useState([]);
  const [selectedStall, setSelectedStall] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8081/");
      if (response.data.valid) {
        setIsAuthenticated(true);
        fetchStalls();
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchStalls = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:8081/food-stalls");
      setStalls(response.data);
    } catch (err) {
      setError("Failed to load food stalls. Please try again.");
      console.error("Error fetching stalls:", err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchMenuItems = async (stallId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:8081/food-stalls/${stallId}/menu`);
      setSelectedStall(stallId);
      setMenuItems(response.data);
    } catch (err) {
      setError("Failed to load menu items. Please try again.");
      console.error("Error fetching menu items:", err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const selectedStallName = stalls.find(stall => stall.id === selectedStall)?.name || "";

  if (!isAuthenticated && !loading) {
    return null; 
  }

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

      {/* Food Stalls Content */}
      <div className="d-flex justify-content-center align-items-start py-5" 
           style={{ minHeight: 'calc(100vh - 100px)' }}>
        <div className="bg-white p-5 rounded shadow-lg w-75" style={{ opacity: 0.90 }}>
          <h2 className="text-center mb-4">Food Stalls</h2>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <div className="text-center">
              <p className="text-danger mb-3">{error}</p>
              <button 
                onClick={fetchStalls}
                className="btn btn-info"
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              {/* Stalls List */}
              <div className="table-responsive mb-4">
                <table className="table table-striped table-bordered table-hover">
                  <thead className="bg-info text-white">
                    <tr>
                      <th>Stall Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stalls.map((stall) => (
                      <tr key={stall.id}>
                        <td>{stall.name}</td>
                        <td>
                          <button
                            onClick={() => fetchMenuItems(stall.id)}
                            className="btn btn-info btn-sm"
                          >
                            View Menu
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Menu Items Display */}
              {selectedStall && (
                <div className="table-responsive">
                  <h3 className="text-center mb-3">Menu Items</h3>
                  <h4 className="text-center mb-3">{selectedStallName}</h4>
                  <table className="table table-striped table-bordered table-hover">
                    <thead className="bg-info text-white">
                      <tr>
                        <th>Item Name</th>
                        <th>Price (BDT)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menuItems.length > 0 ? (
                        menuItems.map((item) => (
                          <tr key={item.id}>
                            <td>{item.item_name}</td>
                            <td>{item.price} BDT</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="2" className="text-center">
                            No menu items available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodStalls;