import React, { useEffect, useRef, useState } from 'react';
import './OTPVerification.css';
import { useNavigate } from 'react-router';

import Toast from '../toast/Toast';
import apiClient from '../../api/apiClient';
import { API_ROUTES } from '../../api/apiRoutes';
import { OLP_DALAY_SECONDS } from '../../constants/config';
import AlertModal from '../modal/success/AlertModal';
import confetti from 'canvas-confetti';
import SuccessIcon from '../../assets/icons/success.png';

const inputLength = 6;

function OTPVerification({ sessionId, username, email = '@trustai.com', onOtpVerified, onClose }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(inputLength).fill(''));
  const inputs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(OLP_DALAY_SECONDS);
  const [toast, setToast] = useState(null);
  const [modalData, setModalData] = useState({
    isOpen: false,
    type: '', // 'success' or 'error'
    title: '',
    content: '',
    footerButtons: []
  });


  useEffect(() => {
    let timerInterval;

    if (isResendDisabled) {
      timerInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timerInterval);
            setIsResendDisabled(false);
            return OLP_DALAY_SECONDS; // reset for next resend
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [isResendDisabled]);


  useEffect(() => {
    // Resize canvas on mount
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, []);

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
    } else if (e.key >= '0' && e.key <= '9') {
      setOtp(prev => {
        const next = [...prev];
        next[idx] = '';
        return next;
      });
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
    // showToast(err.response?.data?.message || err.message || 'Verification failed.', "error");
  };


  const handleNavigateToLogin = () => {
    navigate('/login', {
      replace: true,
    });
  }

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
      if (verificationResponse.success) {
        //navigate('/login', { replace: true });
        showSuccessMessage();
      }

      //setSuccess('OTP verified successfully!');
      //console.log('✅ Verified:', response.data);
    } catch (err) {
      //console.error('❌ Verification failed:', err);
      //setError(err.message || 'Verification failed.');
      // showToast(err.message || 'Verification failed.');
      showToast(err.response?.data?.message || err.message || "Failed to resend OTP", "error");
    } finally {
      setLoading(false);
    }
  }

  const showSuccessMessage = () => {
    setModalData({
      isOpen: true,
      type: 'success',
      title: 'Registration Success!',
      footerButtons: [
        {
          label: 'Login Now',
          onClick: handleNavigateToLogin,
          className: 'btn btn-success',
        },
      ],
    });

    // 🎉 Confetti trigger after modal is set
    setTimeout(() => {
      const canvas = document.getElementById('confetti-canvas');
      if (canvas) {
        confetti.create(canvas, { resize: true })({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
        });

        // Optional cleanup after 2 seconds
        setTimeout(() => {
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 2000);
      }
    }, 200);

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
       {/* 🎉 Confetti canvas above all content */}
        <canvas id="confetti-canvas" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          width: '100vw',
          height: '100vh',
          zIndex: 2000
        }} />


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
                  Resend Code in {countdown}s
                </span>
              ) : (
                <span
                  className="resend"
                  onClick={handleResendOTP}
                  style={{ cursor: 'pointer', color: '#1046c7 !important' }}
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


      {modalData.isOpen && (
        <AlertModal
          type={"success"}
          icon={SuccessIcon}
          onClose={() => setModalData(prev => ({ ...prev, isOpen: false }))}
          title={modalData.title}
          footerButtons={modalData.footerButtons}
        >
          {modalData.content}
        </AlertModal>
      )}
    </div>
  );
}

export default OTPVerification;
