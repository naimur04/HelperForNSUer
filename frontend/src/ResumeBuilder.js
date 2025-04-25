import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

axios.defaults.withCredentials = true;

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    designation: "",
    dateOfBirth: "",
    address: "",
    phone: "",
    email: "",
    linkedin: "",
    facebook: "",
    twitter: "",
    objective: "",
    skills: "",
    computerSkills: "",
    interests: "",
    experience: "",
    education: "",
    activities: "",
    languageProficiency: "",
    picture: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchResume = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:8081/resume/${id}`);
          setFormData(response.data);
        } catch (err) {
          setError("Failed to load resume. Please try again.");
          console.error("Error fetching resume:", err);
          if (err.response?.status === 401) {
            navigate("/login");
          }
        } finally {
          setLoading(false);
        }
      };
      fetchResume();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, picture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      await axios.post("http://localhost:8081/resume/save", data);
      navigate("/resumes");
    } catch (err) {
      setError("Failed to save resume. Please try again.");
      console.error("Error saving resume:", err);
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
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
        <button onClick={() => navigate("/resumes")} className="btn btn-info">
          Back
        </button>
      </header>

      <div
        className="d-flex justify-content-center align-items-start py-5"
        style={{ minHeight: "calc(100vh - 100px)" }}
      >
        <div className="bg-white p-5 rounded shadow-lg w-75" style={{ opacity: 0.90 }}>
          <h2 className="text-center mb-4">{id ? "Edit Resume" : "Build Your Resume"}</h2>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <div className="text-center">
              <p className="text-danger mb-3">{error}</p>
              <button onClick={handleSubmit} className="btn btn-info">
                Retry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <div>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="form-label">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., Undergrad Student"
                />
              </div>
              <div>
                <label className="form-label">Date of Birth</label>
                <input
                  type="text"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., Jan 01, 2000"
                />
              </div>
              <div>
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., Basundhara RA, Dhaka-1229"
                />
              </div>
              <div>
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="form-label">LinkedIn</label>
                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., linkedin.com/yourLink"
                />
              </div>
              <div>
                <label className="form-label">Facebook</label>
                <input
                  type="text"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., facebook.com/yourLink"
                />
              </div>
              <div>
                <label className="form-label">Twitter</label>
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., twitter.com/yourLink"
                />
              </div>
              <div>
                <label className="form-label">Objective</label>
                <textarea
                  name="objective"
                  value={formData.objective}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your career objective"
                  rows="3"
                />
              </div>
              <div>
                <label className="form-label">Skills</label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your skills (one per line)"
                  rows="3"
                />
              </div>
              <div>
                <label className="form-label">Computer Skills</label>
                <textarea
                  name="computerSkills"
                  value={formData.computerSkills}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your computer skills (one per line)"
                  rows="3"
                />
              </div>
              <div>
                <label className="form-label">Interests</label>
                <textarea
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your interests (one per line)"
                  rows="3"
                />
              </div>
              <div>
                <label className="form-label">Experience</label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your experience (one entry per line, e.g., Job Title at Company (Year) - Description)"
                  rows="5"
                />
              </div>
              <div>
                <label className="form-label">Education</label>
                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your education (one entry per line, e.g., Degree at Institution (Year) - Details)"
                  rows="5"
                />
              </div>
              <div>
                <label className="form-label">Activities</label>
                <textarea
                  name="activities"
                  value={formData.activities}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your activities (one per line, e.g., Role at Organization (Year))"
                  rows="3"
                />
              </div>
              <div>
                <label className="form-label">Language Proficiency</label>
                <textarea
                  name="languageProficiency"
                  value={formData.languageProficiency}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your language proficiency (one per line, e.g., Language - Level)"
                  rows="3"
                />
              </div>
              <div>
                 <label className="form-label">Profile Picture 1:1</label>
                <input
                  type="file"
                  name="picture"
                  onChange={handleFileChange}
                  className="form-control"
                  accept="image/*"
                />
                {formData.picture && typeof formData.picture === "string" && (
                  <div className="mt-2">
                    <p>Current Picture:</p>
                    <img
                      src={`http://localhost:8081${formData.picture}`}
                      alt="Current Profile"
                      style={{ maxWidth: "100px", borderRadius: "5px" }}
                    />
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-info mt-3">
                {id ? "Update Resume" : "Save Resume"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;