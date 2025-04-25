import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Validation from './SignupValidation';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    nsuId: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = Validation(values); 
    setErrors(validationErrors);
    
    console.log('Validation Errors:', validationErrors); 

    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log('Sending request to backend:', values);

        const response = await axios.post('http://localhost:8081/signup', values);

        console.log('Signup Response:', response.data); 

        if (response.data.success) {
          alert('Signup successful!');
          navigate('/login');
        } else {
          alert(response.data.message || 'Signup failed');
        }
      } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred. Check console for details.');
      }
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ backgroundColor: '#000435' }}>
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-white text-center mb-4"
      >
        <img src="/LOGONSU.png" alt="Helper for NSUer Logo" className="mb-3" style={{ width: '100px', height: '100px' }} />
        <h4 className="display-8 font-weight-bold">Helper for NSUer</h4>
      </motion.header>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-4 rounded shadow w-25"
      >
        <h2 className="text-center mb-3">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name" className="font-weight-bold">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={values.name}
              onChange={handleInput}
              className="form-control"
            />
            {errors.name && <p className="text-danger small mt-1">{errors.name}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="nsuId" className="font-weight-bold">NSU ID</label>
            <input
              type="text"
              placeholder="Enter 7-digit NSU ID"
              name="nsuId"
              maxLength="7"
              value={values.nsuId}
              onChange={handleInput}
              className="form-control"
            />
            {errors.nsuId && <p className="text-danger small mt-1">{errors.nsuId}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" className="font-weight-bold">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={values.email}
              onChange={handleInput}
              className="form-control"
            />
            {errors.email && <p className="text-danger small mt-1">{errors.email}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="font-weight-bold">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={values.password}
              onChange={handleInput}
              className="form-control"
            />
            {errors.password && <p className="text-danger small mt-1">{errors.password}</p>}
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit" 
            className="btn btn-success w-100 mb-2"
          >
            Sign Up
          </motion.button>
          <Link to="/login" className="btn btn-light border w-100">Login</Link>
        </form>
      </motion.div>
    </div>
  );
}

export default Signup;
