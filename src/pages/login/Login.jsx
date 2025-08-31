import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

import { AuthContext } from "../../context/AuthContext";
import apiClient from "../../api/apiClient";
import { API_ROUTES } from "../../api/apiRoutes";

const Login = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Where to redirect after login (default /dashboard)
  const from = location.state?.from?.pathname || '/';


  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      //console.log('Calling ACCESS_TOKEN...');
      const res = await apiClient.post(API_ROUTES.AUTH_API.ACCESS_TOKEN, {
        username,
        password,
        flow: 'password',
      });

      const {
      accessToken,
      refreshToken,
      accessTokenExpiry,
      refreshTokenExpiry
    } = res.data;
      // Store tokens in AuthContext
      login(accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry, username);

      // Navigate to previous or default route
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Logo */}
        <div className="logo">
          <div className="logo-grid">
            <div className="logo-square top-left"></div>
            <div className="logo-square top-right"></div>
            <div className="logo-square bottom-left"></div>
            <div className="logo-square bottom-right"></div>
          </div>
          <h2>Trust AI</h2>
        </div>

        {/* Form */}
        <h3>Sign in to your account</h3>
        <p className="sub-text">Enter your email and password to sign in</p>

        <form onSubmit={handleLogin} autoComplete="off">
          <label htmlFor="account">
            <span className="required">*</span> Account
          </label>
          <input 
            type="text" 
            id="account" 
            placeholder="Please enter username" 
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">
            <span className="required">*</span> Password
          </label>
          <div className="password-wrapper">
            <input
              type="password"
              placeholder="Please enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {/* <span className="eye-icon">👁️</span> */}
          </div>

          <div className="forgot">
            <a href="#">Forgot Password?</a>
          </div>

          <button className="btn-signin" type='submit'>Sign In</button>
        </form>

        <p className="signup-text">
          No account? <Link to="/signup">SIGN UP</Link>
        </p>

        <div className="alert">
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
