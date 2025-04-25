import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    nsuId: "",
    email: "",
    department: "",
    major: "",
    age: "",
    bloodGroup: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); 

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null); 
      const response = await axios.get("http://localhost:8081/profile");
      setUserInfo(response.data);
    } catch (err) {
      setError("Failed to load profile. Please try again.");
      console.error("Failed to fetch profile info", err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.nsuId || !userInfo.email) {
      setError("Name, NSU ID, and Email are required");
      return;
    }

    try {
      setError(null);
      setSuccess(null); 
      await axios.post("http://localhost:8081/updateProfile", userInfo);
      setSuccess("Profile updated successfully"); 
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update profile");
      console.error("Failed to update profile", err);
    }
  };

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
        <img src="LOGONSU.png" alt="Logo" style={{ height: '80px', marginRight: '10px' }} />
        <div className="text-center text-white">
          <h1 className="m-0">NSU Help Zone</h1>
          <h4 className="m-0">A Simple Platform for NSUers</h4>
        </div>
        <button 
          onClick={() => navigate('/')} 
          className="btn btn-info"
        >
          Home
        </button>
      </header>

      {/* Profile Content */}
      <div className="d-flex justify-content-center align-items-start py-5" style={{ minHeight: 'calc(100vh - 100px)' }}>
      <div className="bg-white p-5 rounded shadow-lg w-50" style={{ opacity: 0.85 }}>

          <h2 className="text-center mb-4">Profile</h2>

          {loading ? (
            <p className="text-center">Loading profile...</p>
          ) : error && !isEditing ? (
            <div className="text-center">
              <p className="text-danger mb-3">{error}</p>
              <button 
                onClick={fetchProfile}
                className="btn btn-info"
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              {error && <p className="text-danger text-center mb-3">{error}</p>}
              {success && <p className="text-success text-center mb-3">{success}</p>} {/* Success message */}
              
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  {Object.keys(userInfo).map((key) => (
                    <div key={key} className="mb-3">
                      <label className="form-label fw-bold">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </label>
                      <input
                        type={key === "age" ? "number" : "text"}
                        name={key}
                        value={userInfo[key]}
                        onChange={handleChange}
                        className="form-control"
                        required={["name", "nsuId", "email"].includes(key)}
                      />
                    </div>
                  ))}
                  <div className="d-flex justify-content-center gap-3">
                    <button 
                      type="submit" 
                      className="btn btn-info"
                    >
                      Save
                    </button>
                    <button 
                      type="button" 
                      onClick={() => {
                        setIsEditing(false);
                        setError(null);
                        setSuccess(null); 
                        fetchProfile();
                      }}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  {Object.entries(userInfo).map(([key, value]) => (
                    <div key={key} className="mb-3">
                      <strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong>{" "}
                      <span>{value || "Not set"}</span>
                    </div>
                  ))}
                  <div className="text-center">
                    <button 
                      onClick={() => {
                        setIsEditing(true);
                        setSuccess(null); 
                      }}
                      className="btn btn-info mt-3"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;