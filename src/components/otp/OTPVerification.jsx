import React, { useEffect, useRef, useState } from 'react';
import './OTPVerification.css';
import { useNavigate } from 'react-router';

import Toast from '../toast/Toast';
import apiClient from '../../api/apiClient';
import { API_ROUTES } from '../../api/apiRoutes';

const inputLength = 6;
const OTP_RESEND_DELAY_SECONDS = 120;

function OTPVerification({ sessionId, username, email = '@trustai.com', onOtpVerified, onClose }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(inputLength).fill(''));
  const inputs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [toast, setToast] = useState(null);


  useEffect(() => {
  let timerInterval;

  if (isResendDisabled) {
    timerInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timerInterval);
          setIsResendDisabled(false);
          return 60; // reset for next resend
        }
        return prev - 1;
      });
    }, 1000);
  }

  return () => clearInterval(timerInterval);
}, [isResendDisabled]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val) {
      const newOtp = [...otp];
      newOtp[idx] = val;
      setOtp(newOtp);

      // Move to next input
      if (idx < inputLength - 1) {
        inputs.current[idx + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      e.preventDefault(); // Prevent default browser behavior
      const newOtp = [...otp];

      if (otp[idx]) {
        // Clear current value if not empty
        newOtp[idx] = '';
        setOtp(newOtp);
      } else if (idx > 0) {
        // Move to previous input if current is empty
        inputs.current[idx - 1]?.focus();
        newOtp[idx - 1] = '';
        setOtp(newOtp);
      }
    } else if (e.key >= '0' && e.key <= '9') {
      setOtp(prev => {
        const next = [...prev];
        next[idx] = '';
        return next;
      });
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      inputs.current[idx - 1]?.focus();
    } else if (e.key === 'ArrowRight' && idx < inputLength - 1) {
      inputs.current[idx + 1]?.focus();
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };
  
  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    verifyOtp();
  };

  const verifyOtp = async () => {    
    const otpCode = otp.join('');
    if (otpCode.length !== inputLength) {
      showToast('Please enter the full OTP.', "info");
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await apiClient.post(API_ROUTES.AUTH_API.VERIFY_REGISTRATION_OTP, {
        otp: otpCode,
        sessionId,
        username,
      });

      const verificationResponse = response.data;
      if(verificationResponse.success) {
        navigate('/login', { replace: true });
      }

      //setSuccess('OTP verified successfully!');
      //console.log('✅ Verified:', response.data);
    } catch (err) {
      //console.error('❌ Verification failed:', err);
      //setError(err.message || 'Verification failed.');
      showToast(err.message || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  }

  const handleResendOTP = async () => {
    setIsResendDisabled(true); // Start countdown
    setCountdown(OTP_RESEND_DELAY_SECONDS); // Reset to 60 seconds
    setOtp(Array(inputLength).fill('')); // Clear OTP fields

    try {
      await apiClient.post(API_ROUTES.AUTH_API.RESEND_REGISTRATION_OTP, {
        sessionId,
        username,
      });
      showToast("OTP resent successfully.");
    } catch (err) {
      showToast(err.message || "Failed to resend OTP", "error");
    }
  }

  return (
    <div style={{ background: '#fff' }}>
      {/* <div style={{background: '#fff', padding: '16px'}}>
        <button 
            onClick={() => onClose()}
            style={{background: 'transparent'}}>
            &#x276E;
        </button>
    </div> */}

      <div className="otp-outer-container">
        <div className="otp-container">
          <h2>OTP Verification</h2>
          <p>Enter the 6-digit code sent to <br /> your email <span style={{ color: '#1046c7' }}>{email}</span></p>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="otp-inputs">
              {Array(inputLength).fill().map((_, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength="1"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  required
                  value={otp[idx]}
                  ref={el => inputs.current[idx] = el}
                  onChange={e => handleChange(e, idx)}
                  onKeyDown={e => handleKeyDown(e, idx)}
                  onFocus={handleFocus}
                  className="otp-input"
                />
              ))}
            </div>
            <button type="submit" className="otp-btn" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify'}
            </button>
            <p className="title-black">
              Didn't receive the code? {' '}
              {(isResendDisabled || loading) ? (
                <span className="specialText disabledText">
                  {countdown}s
                </span>
              ) : (
                <span
                  className="specialText"
                  onClick={handleResendOTP}
                  style={{ cursor: 'pointer' }}
                >
                  Resend Code
                </span>
              )}
            </p>

            {error && <p className="otp-error">{error}</p>}
            {success && <p className="otp-success">{success}</p>}
          </form>         
        </div>
      </div>
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          duration={10000}
        />
      )}
    </div>
  );
}

export default OTPVerification;
