import React from "react";
import { Link } from "react-router-dom";


function ParkingPrinting() {
  return (
    <div className="vh-100" style={{ backgroundColor: "#15B4CE" }}>
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
        <img
          src="LOGONSU.png" 
          alt="NSU Logo"
          style={{ height: '80px', marginRight: '10px' }}
        />
        <div className="text-center text-white">
          <h1 className="m-0">NSU Help Zone</h1>
          <h4 className="m-0">Parking and Printing Info</h4>
        </div>
        <div style={{ width: '80px' }} /> {/* Spacer for alignment */}
      </header>

      {/* Main Content */}
      <div className="d-flex" style={{ height: 'calc(100vh - 100px)' }}>
        {/* Sidebar with Image */}
        <div
          className="bg-white p-3 shadow-lg"
          style={{
            width: '25%',
            opacity: 0.9,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="admin.jpg" 
            alt="Sports and Fitness"
            style={{ width: '100%', maxHeight: '80%', objectFit: 'cover', borderRadius: '10px' }}
          />
       
        </div>

        {/* Buttons Section */}
        <div
          className="d-flex flex-column justify-content-center align-items-center flex-grow-1"
          style={{ marginLeft: '20px' }}
        >
          <div
            className="bg-white p-5 rounded shadow-lg"
            style={{ opacity: 0.6, width: '50%' }}
          >
            <h2 className="text-center mb-4">Options</h2>
            <div className="d-flex flex-column gap-4">
              <Link to="/parking" className="btn btn-info w-100 btn-lg">
                Parking Info
              </Link>
              <Link to="/print-zone" className="btn btn-info w-100 btn-lg">
                Print Zone Info
              </Link>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParkingPrinting;