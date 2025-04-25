import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

axios.defaults.withCredentials = true;

const ResumePreview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const resumeRef = useRef();

  useEffect(() => {
    fetchResume();
  }, [id]);

  const fetchResume = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:8081/resume/${id}`);
      setResume(response.data);
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

  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Allow cross-origin loading
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  };

  const downloadPDF = async () => {
    try {
      // Preload the image if it exists
      if (resume?.picture) {
        await preloadImage(`http://localhost:8081${resume.picture}`);
      }

      const element = resumeRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true, // Enable CORS for images
        logging: true, // Enable logging for debugging
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resume.name}_Resume.pdf`);
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Failed to generate PDF. Please try again.");
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
          <h2 className="text-center mb-4">Your Resume</h2>

          {loading ? (
            <p className="text-center">Loading resume...</p>
          ) : error ? (
            <div className="text-center">
              <p className="text-danger mb-3">{error}</p>
              <button onClick={fetchResume} className="btn btn-info">
                Retry
              </button>
            </div>
          ) : !resume ? (
            <div className="text-center">
              <p>Resume not found.</p>
              <button onClick={() => navigate("/resumes")} className="btn btn-info">
                Back to Resumes
              </button>
            </div>
          ) : (
            <>
              <div
                ref={resumeRef}
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <div className="d-flex">
                  <div
                    style={{
                      width: "30%",
                      backgroundColor: "#2c3e50",
                      color: "white",
                      padding: "20px",
                      borderRadius: "5px 0 0 5px",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      {resume.picture ? (
                        <img
                          src={`http://localhost:8081${resume.picture}`}
                          alt="Profile"
                          crossOrigin="anonymous" // Add crossOrigin attribute
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            marginBottom: "10px",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            backgroundColor: "#ccc",
                            margin: "0 auto 10px",
                          }}
                        />
                      )}
                    </div>
                    <h4 style={{ textTransform: "uppercase", marginBottom: "10px" }}>
                      {resume.name}
                    </h4>
                    <p style={{ fontSize: "14px", marginBottom: "20px" }}>
                      {resume.designation || "Not specified"}
                    </p>

                    <h5 style={{ marginBottom: "10px" }}>CONTACT</h5>
                    {resume.dateOfBirth && (
                      <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                        <strong>Date of Birth:</strong> {resume.dateOfBirth}
                      </p>
                    )}
                    {resume.address && (
                      <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                        <strong>Address:</strong> {resume.address}
                      </p>
                    )}
                    {resume.phone && (
                      <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                        <strong>Phone:</strong> {resume.phone}
                      </p>
                    )}
                    {resume.email && (
                      <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                        <strong>Email:</strong> {resume.email}
                      </p>
                    )}
                    {resume.linkedin && (
                      <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                        <strong>LinkedIn:</strong> {resume.linkedin}
                      </p>
                    )}
                    {resume.facebook && (
                      <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                        <strong>Facebook:</strong> {resume.facebook}
                      </p>
                    )}
                    {resume.twitter && (
                      <p style={{ fontSize: "12px", marginBottom: "20px" }}>
                        <strong>Twitter:</strong> {resume.twitter}
                      </p>
                    )}

                    {resume.skills && (
                      <>
                        <h5 style={{ marginBottom: "10px" }}>SKILLS</h5>
                        <ul style={{ fontSize: "12px", paddingLeft: "20px", marginBottom: "20px" }}>
                          {resume.skills.split("\n").map((skill, index) => (
                            <li key={index}>{skill}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    {resume.computerSkills && (
                      <>
                        <h5 style={{ marginBottom: "10px" }}>COMPUTER SKILLS</h5>
                        <ul style={{ fontSize: "12px", paddingLeft: "20px", marginBottom: "20px" }}>
                          {resume.computerSkills.split("\n").map((skill, index) => (
                            <li key={index}>{skill}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    {resume.interests && (
                      <>
                        <h5 style={{ marginBottom: "10px" }}>INTERESTS</h5>
                        <ul style={{ fontSize: "12px", paddingLeft: "20px" }}>
                          {resume.interests.split("\n").map((interest, index) => (
                            <li key={index}>{interest}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>

                  <div style={{ width: "70%", padding: "20px" }}>
                    {resume.objective && (
                      <>
                        <h5 style={{ marginBottom: "15px" }}>OBJECTIVE</h5>
                        <p style={{ fontSize: "14px", marginBottom: "20px" }}>
                          {resume.objective}
                        </p>
                      </>
                    )}

                    {resume.experience && (
                      <>
                        <h5 style={{ marginBottom: "15px" }}>EXPERIENCE</h5>
                        {resume.experience.split("\n").map((exp, index) => (
                          <div key={index}>
                            <p style={{ fontSize: "14px", marginBottom: "10px" }}>{exp}</p>
                          </div>
                        ))}
                      </>
                    )}

                    {resume.education && (
                      <>
                        <h5 style={{ marginBottom: "15px" }}>EDUCATION</h5>
                        {resume.education.split("\n").map((edu, index) => (
                          <div key={index}>
                            <p style={{ fontSize: "14px", marginBottom: "10px" }}>{edu}</p>
                          </div>
                        ))}
                      </>
                    )}

                    {resume.activities && (
                      <>
                        <h5 style={{ marginBottom: "15px" }}>ACTIVITIES</h5>
                        {resume.activities.split("\n").map((activity, index) => (
                          <div key={index}>
                            <p style={{ fontSize: "14px", marginBottom: "10px" }}>{activity}</p>
                          </div>
                        ))}
                      </>
                    )}

                    {resume.languageProficiency && (
                      <>
                        <h5 style={{ marginBottom: "15px" }}>LANGUAGE PROFICIENCY</h5>
                        {resume.languageProficiency.split("\n").map((lang, index) => (
                          <div key={index}>
                            <p style={{ fontSize: "14px" }}>{lang}</p>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-center mt-4">
                <button onClick={downloadPDF} className="btn btn-info me-3">
                  Download as PDF
                </button>
                <button
                  onClick={() => navigate(`/resume-builder/${id}`)}
                  className="btn btn-info"
                >
                  Edit Resume
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;