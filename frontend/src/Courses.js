import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async (search = "") => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:8081/courses", {
        params: { search }, // Send search term as a query parameter
      });
      setCourses(response.data);
    } catch (err) {
      setError("Failed to load courses. Please try again.");
      console.error("Error fetching courses data:", err);
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchCourses(term); // Fetch courses with the search term
  };

  return (
    <div
      style={{
        backgroundColor: "#15B4CE",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
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

      {/* Courses Content */}
      <div
        className="d-flex justify-content-center align-items-start py-5"
        style={{ minHeight: "calc(100vh - 100px)" }}
      >
        <div className="bg-white p-5 rounded shadow-lg w-75" style={{ opacity: 0.9 }}>
          <h2 className="text-center mb-4">Courses</h2>

          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by course code or department..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {loading ? (
            <p className="text-center">Loading courses...</p>
          ) : error ? (
            <div className="text-center">
              <p className="text-danger mb-3">{error}</p>
              <button onClick={() => fetchCourses(searchTerm)} className="btn btn-info">
                Retry
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <thead className="bg-info text-white">
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Department</th>
                    <th>Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.course_id}>
                      <td>{course.course_code}</td>
                      <td>{course.course_name}</td>
                      <td>{course.department}</td>
                      <td>{course.credits}</td>
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

export default Courses;