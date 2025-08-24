import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
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

        <form>
          <label htmlFor="account">
            <span className="required">*</span> Account
          </label>
          <input type="text" id="account" placeholder="Please enter account" />

          <label htmlFor="password">
            <span className="required">*</span> Password
          </label>
          <div className="password-wrapper">
            <input
              type="password"
              id="password"
              placeholder="Please enter password"
            />
            <span className="eye-icon">👁️</span>
          </div>

          <div className="forgot">
            <a href="#">Forgot Password?</a>
          </div>

          <button className="btn-signin">Sign In</button>
        </form>

        <p className="signup-text">
          No account? <Link to="/signup">SIGN UP</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
