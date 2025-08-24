// RegisterForm.jsx
import React from "react";
import "./RegisterForm.css";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <div className="register-container">
      <div className="register-card">
        <div className="header-row">
          <button 
            type="button" 
            className="back-button" 
            aria-label="Go back"
            onClick={() => window.history.back()}
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon-chevron-left"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <h2 className="register-title">Register</h2>
        </div>

        <p className="register-subtitle">Create your account to continue</p>

        <form className="register-form">
          <label>
            Account <span className="required">*</span>
            <input type="text" placeholder="Please enter account" required />
          </label>

          <label>
            Password <span className="required">*</span>
            <input type="password" placeholder="Please enter password" required />
          </label>

          <label>
            Second Confirmation Password <span className="required">*</span>
            <input
              type="password"
              placeholder="Please enter your password again"
              required
            />
          </label>

          <label className="phone-label">
            Phone Number
            <div className="phone-input">
              <select>
                <option value="+91" selected>+91</option>
              </select>
              <input type="tel" placeholder="Enter mobile number" />
            </div>
          </label>

          <label>
            Email
            <input type="email" placeholder="Please enter your email" />
          </label>

          <label>
            Invitation code (required) <span className="required">*</span>
            <input type="text" placeholder="Please enter the invitation code" required />
          </label>

          <button type="submit" className="register-btn" disabled>
            Register
          </button>
        </form>

        <p className="signin-text">
          Have an account?<Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
