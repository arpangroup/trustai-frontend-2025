// RegisterForm.jsx
import React, { useEffect, useState } from "react";
import "./AccountSetting.css";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { API_ROUTES } from "../../api/apiRoutes";
import { toast } from "react-toastify";
import { INDIAN_STATES, REQUIRED_KYC_FIELDS } from "../../constants/config";


const AccountSetting = () => {
    const [loading, setLoading] = useState(false);
    const [initialData, setInitialData] = useState({});

    const [formData, setFormData] = useState({
        username: "johndoe",
        firstname: "john",
        lastname: "doe",
        country: "India",
        walletAddress: "0xABCD1234EFGH5678IJKL",
        countryCode: "+91",
        mobile: "987654321",
        email: "john@doe.com",
        state: "WB",
    });

    // ✅ Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(API_ROUTES.USER_INFO); // Replace with your actual endpoint
                const user = response.data;

                
                const userData = {
                    username: user.username || "",
                    firstname: user.firstname || "",
                    lastname: user.lastname || "",
                    country: user.country || "",
                    walletAddress: user.walletAddress || "",
                    countryCode: user.countryCode || "+91",
                    mobile: user.mobile || "",
                    email: user.email || "",
                    state: user.state || "",
                    city: user.city || "",
                    address: user.address || "",
                    zipCode: user.zipCode || "",
                };

                
                setFormData(userData);
                setInitialData(userData);
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

        // 🚨 Validate required fields
        for (const field of REQUIRED_KYC_FIELDS) {
            const value = formData[field];
            if (!value || (typeof value === "string" && value.trim() === "")) {
                toast.error(`Please fill out the required field: ${field}`);
                setLoading(false);
                return;
            }
        }

        try {
            const changedFields = {};
            
            // Loop through keys to find what has changed
            Object.keys(formData).forEach((key) => {
                if (formData[key] !== initialData[key]) {
                    changedFields[key] = formData[key];
                }
            });

            if (Object.keys(changedFields).length === 0) {
                toast.info("No changes to update");
                return setLoading(false);
            }

            const response = await apiClient.patch(API_ROUTES.UPDATE_USER_INFO, changedFields);
            toast.success("Account updated successfully");
            console.log("Update response:", response.data);
            
            // Optionally update the initialData again
            setInitialData(formData);
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
                    <label className="form-label">Country</label>
                    <input
                        type="text"
                        className="form-control"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        disabled
                    />
                </div>


                <div className="mb-3">
                    <label className="form-label">Wallet address</label> 
                    
                    <div className="select__wrapper" style={{marginBottom: '6px'}}>
                        <select>
                            <option>USDT-BEP-20</option>
                        </select>
                    </div>                   
                    <input
                        type="text"
                        className="form-control mt-4"
                        name="walletAddress"
                        value={formData.walletAddress}
                        onChange={handleChange}
                        required
                    />
                </div>

                
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
                    <label className="form-label">Firstname</label>
                    <input
                        type="text"
                        className="form-control"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Lastname</label>
                    <input
                        type="text"
                        className="form-control"
                        name="lastname"
                        value={formData.lastname}
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

                
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flexBasis: '50%' }}>
                        <label className="form-label">State</label>
                        <select name="state" value={formData.state} onChange={handleChange} style={{ maxHeight: '38px', width: '100%' }}>
                            <option value="" disabled>Select a State</option>
                            {INDIAN_STATES.map(({ code, name }) => (
                                <option key={code} value={code}>
                                {name}
                                </option>
                            ))}                      
                        </select>
                    </div>
                     <div style={{ flexBasis: '50%' }}>
                        <label className="form-label">City</label>
                        <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>

                
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">ZipCode</label>
                    <input
                        type="number"
                        className="form-control"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                    />
                </div>

                {/* Register Button */}
                <button type="submit" className="register-btn" disabled={loading}>Update Account</button>
            </form>

        </div>
    );
};

export default AccountSetting;
