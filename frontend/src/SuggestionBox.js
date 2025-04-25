import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const SuggestionBox = () => {
  const navigate = useNavigate();
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setSuggestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("http://localhost:8081/suggestions", { suggestion });
      setSuccess(response.data.message);
      setSuggestion(""); // Reset suggestion field
    } catch (err) {
      console.error("Full error details:", err.response || err);
      setError(err.response?.data?.error || "Failed to submit suggestion. Please try again.");
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

      {/* Suggestion Box Content */}
      <div className="d-flex justify-content-center align-items-start py-5" 
           style={{ minHeight: 'calc(100vh - 100px)' }}>
        <div className="bg-white p-5 rounded shadow-lg w-75" style={{ opacity: 0.90 }}>
          <h2 className="text-center mb-4">Suggestion Box</h2>
          <h4 className="text-center mb-4">Feel free to share your suggestion</h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="suggestion" className="form-label">Your Suggestion:</label>
              <textarea
                className="form-control"
                id="suggestion"
                name="suggestion"
                value={suggestion}
                onChange={handleChange}
                rows="5"
                required
              />
            </div>

            {error && <p className="text-danger text-center mb-3">{error}</p>}
            {success && <p className="text-success text-center mb-3">{success}</p>}

            <div className="text-center">
              <button 
                type="submit" 
                className="btn btn-info" 
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Suggestion"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SuggestionBox;