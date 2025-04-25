import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const ResumeList = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:8081/resumes");
      setResumes(response.data);
    } catch (err) {
      setError("Failed to load resumes. Please try again.");
      console.error("Error fetching resumes:", err);
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (resumeId) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        await axios.delete(`http://localhost:8081/resume/${resumeId}`);
        setResumes(resumes.filter((resume) => resume.id !== resumeId));
      } catch (err) {
        setError("Failed to delete resume. Please try again.");
        console.error("Error deleting resume:", err);
        if (err.response?.status === 401) {
          navigate("/login");
        }
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#15B4CE",
        minHeight: "100vh",
      }}
    >
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

      <div
        className="d-flex justify-content-center align-items-start py-5"
        style={{ minHeight: "calc(100vh - 100px)" }}
      >
        <div className="bg-white p-5 rounded shadow-lg w-75" style={{ opacity: 0.90 }}>
          <h2 className="text-center mb-4">Your Resumes</h2>

          {loading ? (
            <p className="text-center">Loading resumes...</p>
          ) : error ? (
            <div className="text-center">
              <p className="text-danger mb-3">{error}</p>
              <button onClick={fetchResumes} className="btn btn-info">
                Retry
              </button>
            </div>
          ) : resumes.length === 0 ? (
            <div className="text-center">
              <p>No resumes found.</p>
              <button onClick={() => navigate("/resume-builder")} className="btn btn-info">
                Create New Resume
              </button>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                  <thead className="bg-info text-white">
                    <tr>
                      <th>Name</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resumes.map((resume) => (
                      <tr key={resume.id}>
                        <td>{resume.name}</td>
                        <td>{new Date(resume.created_at).toLocaleString()}</td>
                        <td>
                          <button
                            onClick={() => navigate(`/resume/${resume.id}`)}
                            className="btn btn-info btn-sm me-2"
                          >
                            View
                          </button>
                          <button
                            onClick={() => navigate(`/resume-builder/${resume.id}`)}
                            className="btn btn-warning btn-sm me-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(resume.id)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-center mt-4">
                <button onClick={() => navigate("/resume-builder")} className="btn btn-info">
                  Create New Resume
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeList;