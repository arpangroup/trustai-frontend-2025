import React, { useState } from "react";
import "./ForgotPassword.css";
import apiClient from "../../api/apiClient";
import { API_ROUTES } from "../../api/apiRoutes";
import Toast from "../../components/toast/Toast";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage ] = useState(null);
    const [messageType, setMessageType] = useState("danger");
    const [toast, setToast] = useState(null);

    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const [attempts, setAttempts] = useState(0);

    const MAX_ATTEMPTS = 10;
    const RESEND_DELAY = 30; // seconds

    // send verification code
    const handleSendCode = async () => {
        if (cooldown > 0) return;

        try {
            setLoading(true);
            const res = await apiClient.post(API_ROUTES.AUTH_API.VERIFY_FORGOT_PASSWORDP, { email });
            
            const sid = res.data?.data?.sessionId;
            if (!sid) throw new Error("Session ID missing in response");

            setSessionId(sid);
            //showMessage ("Password reset OTP sent to your email.");
            setOtpSent(true);

            // start cooldown timer
            setCooldown(RESEND_DELAY);
            const interval = setInterval(() => {
                setCooldown((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (err) {
            console.log(err);
            showMessage (err.message || "Error sending reset email", "danger");
        } finally {
            setLoading(false);
        }
    };

    // reset password confirm
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (attempts >= MAX_ATTEMPTS) {
            showMessage ("Maximum attempts reached. Please try again later.");
            return;
        }

        if (password !== confirmPassword) {
            showMessage ("Passwords do not match.");
            return;
        }

        try {
            await apiClient.post(API_ROUTES.AUTH_API.RESET_PASSWORD, {
                sessionId: sessionId,
                email,
                otp: verificationCode,
                password,
            });
            showMessage ("Password reset successful. Redirecting to login...", "success");
            setTimeout(() => {
                window.location.href = "/login";
            }, 1500);
        } catch (err) {
            setAttempts(attempts + 1);
            showMessage (err.response?.data?.message || "Error resetting password", "danger");
        } finally {
            setLoading(false);
        }
    };

    const showToast = (message, type = "success") => {
        setToast({ message, type });
    };

    const showMessage = (msg, type = "success") => {
        setMessage (msg);
        setMessageType(type);
        setTimeout(() => showMessage (null), 4000);
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

                    <h2 className="register-title">Forgot Password</h2>
                </div>


                <form className="register-form" autoComplete="off" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div style={{ marginTop: '32px' }}>
                        Email <span className="required">*</span>
                        <input
                            type="email"
                            name="email"
                            placeholder="Please enter your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Verification Section */}
                    <div className="verification-input">
                        <input
                            type="text"
                            name="verificationCode"
                            value={verificationCode}
                            onChange={e => setVerificationCode(e.target.value)}
                            placeholder="Enter verification code"
                            className="verificationCode"
                            disabled={!otpSent} />
                        <button
                            type="button"
                            name="sendVerificationCode"
                            onClick={handleSendCode}
                            disabled={loading || cooldown > 0}
                        >{cooldown > 0 ? `Resend (${cooldown}s)` : "Send"}
                        </button>
                    </div>

                    {/* Reset Password Section - visible only after OTP sent */}
                    {otpSent && (
                        <div className="reset-password">
                            {/* Password */}
                            <div>
                                Password <span className="required">*</span>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Please enter your new password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                Confirm Password <span className="required">*</span>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Please confirm your new password"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="register-btn"
                                disabled={loading || attempts >= MAX_ATTEMPTS}
                            >
                                {loading ? "Processing..." : "Confirm"}
                            </button>
                        </div>
                    )}
                </form>
                {message && <div className={`alert alert-${messageType}`}>{message}</div>}
                {/* Toast */}
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </div>



        </div>
    );
};

export default ForgotPassword;
