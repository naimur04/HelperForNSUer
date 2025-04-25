import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Login() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then((res) => {
        if (res.data.valid) {
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8081/login', values);
      navigate('/');
    } catch (error) {
      setLoginError(error.response?.data?.error || 'An error occurred');
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
        <h2 className="text-center mb-3">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="font-weight-bold">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="font-weight-bold">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              className="form-control"
            />
          </div>
          {loginError && <p className="text-danger text-center small mb-2">{loginError}</p>}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit" 
            className="btn btn-success w-100 mb-2"
          >
            Log in
          </motion.button>
          <Link to="/signup" className="btn btn-light border w-100">Create Account</Link>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
