// RegisterForm.jsx
import React, { useEffect, useState } from "react";
import "./AccountSetting.css";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { API_ROUTES } from "../../api/apiRoutes";
import { toast } from "react-toastify";


const AccountSetting = () => {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: "johndoe",
        country: "India",
        walletAddress: "0xABCD1234EFGH5678IJKL",
        countryCode: "+91",
        mobile: "987654321",
        email: "john@doe.com",
    });

    // ✅ Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(API_ROUTES.GET_USER_PROFILE); // Replace with your actual endpoint
                const user = response.data;

                // Set form data with fetched values
                setFormData({
                    username: user.username || "",
                    country: user.country || "",
                    walletAddress: user.walletAddress || "",
                    countryCode: user.countryCode || "+91",
                    mobile: user.mobile || "",
                    email: user.email || "",
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error("Failed to load account settings");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ✅ Submit updated account info
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                country: formData.country,
                walletAddress: formData.walletAddress,
                countryCode: formData.countryCode,
                mobile: formData.mobile,
                email: formData.email,
            };

            const response = await apiClient.post(API_ROUTES.USER_KYC, payload);
            toast.success("Account updated successfully");
            console.log("Update response:", response.data);
        } catch (error) {
            console.error("Account setting update failed:", error);
            toast.error("Failed to update account settings");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="user-setting-container">
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        disabled
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Country</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={formData.country}
                        onChange={handleChange}
                        disabled
                    />
                </div>


                <div className="mb-3">
                    <label className="form-label">Wallet address</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={formData.walletAddress}
                        onChange={handleChange}
                    />
                </div>


                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled
                    />
                </div>

                {/* Mobile */}
                <div className="mb-3">
                    <label className="form-label">Mobile</label>
                    <div className="phone-input">
                        <select name="countryCode" value={formData.countryCode} onChange={handleChange} style={{ maxHeight: '38px' }}>
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
                </div>

                {/* Register Button */}
                <button type="submit" className="register-btn" disabled={loading}>Update Account</button>
            </form>

        </div>
    );
};

export default AccountSetting;
