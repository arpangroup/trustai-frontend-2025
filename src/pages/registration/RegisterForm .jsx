// RegisterForm.jsx
import React, { useEffect, useState } from "react";
import "./RegisterForm.css";
import { Link, useLocation, useSearchParams } from "react-router-dom";


import { AuthContext } from "../../context/AuthContext";
import apiClient from "../../api/apiClient";
import { API_ROUTES } from "../../api/apiRoutes";
import Toast from "../../components/toast/Toast";


import OTPVerification from "../../components/otp/OTPVerification";
import SlidePanel from "../../components/panels/SlidePanel";
// import RightPanel from "../../components/panel/RightPanel"; // Path to your RightPanel component

const defaultRegistrationResponse = {
  sessionId: '123',
  username: 'johndoe'
}

const RegisterForm = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 3;
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [toast, setToast] = useState(null);
  const [showOtpPanel, setShowOtpPanel] = useState(false);
  const [registrationResponse, setRregistrationResponse] = useState(null)

  const [formData, setFormData] = useState({
    username: "johndoe",
    password: "12345",
    confirmPassword: "12345",
    countryCode: "+91",
    mobile: "",
    email: "john@doe.com",
    referralCode: "123",
    otp: "",
  });

  // Populate referralCode from URL
  useEffect(() => {
    const referral = searchParams.get("referral");
    if (referral) {
      setFormData((prev) => ({ ...prev, referralCode: referral }));
    }
  }, [searchParams]);


  // Timer countdown
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.email || !formData.referralCode) {
      alert("Please fill all mandatory fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (attempts >= maxAttempts) {
      showToast("You have exceeded the maximum number of attempts.", "error");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        mobile: formData.mobile,
        referralCode: formData.referralCode,
      };

      const response = await apiClient.post(API_ROUTES.AUTH_API.REGISTRATION, payload);
      setRregistrationResponse(response.data)
      //console.log("RESPONSE: ", response.data);
      
      // Instead of registering immediately, show OTP panel
      setShowOtpPanel(true);
    } catch (error) {
      console.error("Registration error:", error);

      // Increment attempt count on error
      setAttempts((prev) => prev + 1);

      if (attempts + 1 >= maxAttempts) {
        showToast("You have exceeded the maximum number of registration attempts. Please try again later.", "error");
      } else {
        showToast(error.message || "Failed to register. Please try again.", "error");
      }

    } finally {
      setLoading(false);
    }

  };



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

        <form className="register-form" autoComplete="off" onSubmit={handleSubmit}>
          
          {/* Username */}
          <label>
            Username <span className="required">*</span>
            <input 
              type="text"
              name="username"
              placeholder="Please enter user name"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>

          {/* Password */}
          <label>
            Password <span className="required">*</span>
            <input              
              type="password"
              name="password"
              placeholder="Please enter your password"
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </label>


          {/* Confirm Password */}
          <label>
            Confirm password <span className="required">*</span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Please re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>

          {/* Mobile */}
          <label className="phone-label">
            Phone Number
            <div className="phone-input">
              <select name="countryCode" value={formData.countryCode} onChange={handleChange}>
                <option value="+91">+91</option>
                {/* <option value="+1">+1</option>
                <option value="+44">+44</option> */}
              </select>
              <input               
                type="number"
                name="mobile"
                placeholder="Enter Mobile No."
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
          </label>

          {/* Email */}
          <label>
            Email <span className="required">*</span>
            <input 
              type="email"
              name="email"
              placeholder="Please enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          {/* Referral Code */}
          <label>
            Referral code (required) <span className="required">*</span>
            <input 
              type="text"
              name="referralCode"
              placeholder="Enter your Referral Code"
              value={formData.referralCode}
              onChange={handleChange}
              required 
            />
          </label>

          {/* Register Button */}
          <button 
            type="submit" 
            className="register-btn"            
            disabled={loading || attempts >= maxAttempts}
          >
            Register
          </button>
        </form>

        {/* Link to Login */}
        <p className="signin-text">
          Have an account?<Link to="/login">Sign In</Link>
        </p>

        {attempts >= maxAttempts && (
          <p className="lockout-msg">Too many attempts. Try again in {timer}m.</p>
        )}

      </div>                  

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

     

      <SlidePanel
        isOpen={showOtpPanel}
        onClose={() => setShowOtpPanel(false)}
        title="Verify OTP"
      >
        {registrationResponse && registrationResponse?.sessionId (
        <OTPVerification
          sessionId={registrationResponse.sessionId}
          username={registrationResponse.username || formData.username}
          email={formData.email}
          onClose={() => setShowOtpPanel(false)}
        />
        )}
      </SlidePanel>



    </div>
  );
};

export default RegisterForm;
