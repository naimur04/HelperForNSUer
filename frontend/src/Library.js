import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Library = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async (search = "") => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:8081/library", {
        params: { search } // Send search term as a query parameter
      });
      setBooks(response.data);
    } catch (err) {
      setError("Failed to load library books. Please try again.");
      console.error("Error fetching library data:", err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchBooks(term); // Fetch books with the search term
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

      {/* Library Content */}
      <div className="d-flex justify-content-center align-items-start py-5" 
           style={{ minHeight: 'calc(100vh - 100px)' }}>
        <div className="bg-white p-5 rounded shadow-lg w-75" style={{ opacity: 0.90 }}>
          <h2 className="text-center mb-4">Library Books</h2>

          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {loading ? (
            <p className="text-center">Loading books...</p>
          ) : error ? (
            <div className="text-center">
              <p className="text-danger mb-3">{error}</p>
              <button 
                onClick={() => fetchBooks(searchTerm)}
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
                    <th>Title</th>
                    <th>Author</th>
                    <th>Edition</th>
                    <th>Material Type</th>
                    <th>Format</th>
                    <th>Language</th>
                    <th>Year</th>
                    <th>Availability</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.library_id}>
                      <td>{book.title}</td>
                      <td>{book.authors}</td>
                      <td>{book.edition || "Not specified"}</td>
                      <td>{book.material_type}</td>
                      <td>{book.format}</td>
                      <td>{book.language}</td>
                      <td>{book.year_published}</td>
                      <td>{book.availability}</td>
                      <td>{book.status}</td>
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

export default Library;