import React, { useState } from 'react';
import './DepositManual.css';
import FileUpload from './components/FileUpload';
import apiClient from '../../api/apiClient'; 
import { API_ROUTES } from '../../api/apiRoutes';
import Toast from '../../components/toast/Toast';

const DepositManual = ({ onClose, onSuccess }) => {
    const [screenshotFile, setScreenshotFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const handleScreenshotChange = (file) => {
        setScreenshotFile(file);
    };

    const showToast = (message, type = "error") => {
        setToast({ message, type });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();        

        const paymentMethod = e.target.payment_method.value;
        const amount = e.target.amount.value;
        const transactionId = e.target.transaction_id.value;


        // Validation
        if (!paymentMethod || paymentMethod === 'null') {
            setMessage('Please select a payment method.');
            showToast("Please select a payment method.");
            return;
        }
        if (!amount || parseFloat(amount) <= 0) {
            setMessage('Please enter a valid amount.');
            showToast("Please enter a valid amount.");
            return;
        }
        if (!transactionId.trim()) {
            setMessage('Please enter a transaction ID.');
            showToast('Please enter a transaction ID.');
            return;
        }
        if (!screenshotFile) {
            setMessage('Please upload a screenshot before submitting.');
            showToast('Please upload a screenshot before submitting.');
            return;
        }
        
        setLoading(true);
        setMessage('Uploading...');

        try {
            const formData = new FormData();
            formData.append('paymentGateway', paymentMethod);
            formData.append('amount', amount);
            formData.append('txnId', transactionId);
            formData.append('screenshot', screenshotFile);

            console.log("Submit Deposit Request......");
            const response = await apiClient.post(API_ROUTES.DEPOSIT.DEPOSIT_REQUEST, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            console.log("DEPOSIT_RESPONSE: ", response);
            showToast('Deposit submitted successfully!', "success");
            onSuccess(true)
            

            // Simulate file upload as base64 or filename (backend dependent)
            /*const reader = new FileReader();
            reader.onloadend = async () => {
                const base64File = reader.result;

                const payload = {
                    payment_method: paymentMethod,
                    amount: parseFloat(amount),
                    transaction_id: transactionId,
                    screenshot: base64File, // or screenshotFile.name if you only send the filename
                };

                try {
                    const response = await apiClient.post(API_ROUTES.DEPOSIT.DEPOSIT_REQUEST, payload);
                    setMessage('Deposit submitted successfully!');
                } catch (error) {
                    setMessage(error.message || 'Something went wrong.');
                } finally {
                    setLoading(false);
                }
            };
            reader.readAsDataURL(screenshotFile);*/
        } catch (err) {
            setMessage(err.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fullscreen-modal-overlay">
            <div className="fullscreen-modal-content">
                <div className="deposit-header">
                    <button className="back-button" onClick={onClose}>←</button>
                    <div className="header-title-wrapper">
                        <h2>Manual Deposit</h2>
                    </div>
                </div>

                <div className="deposit-main">
                     <form className="deposit-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="payment_method">Payment Method</label>
                            <select id="payment_method" name="payment_method" defaultValue="BINANCE">
                                <option disabled value="">--Select Gateway--</option>
                                <option value="BINANCE">Binance</option>
                                <option value="COINBASE" disabled={true}>Coinbase</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="amount">Amount</label>
                            <input type="number" id="amount" name="amount" placeholder="Enter Amount" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="transaction_id">Transaction ID</label>
                            <input type="text" id="transaction_id" name="transaction_id" placeholder="Enter Transaction ID" />
                        </div>

                        {/* Screenshot Upload */}
                        <FileUpload
                            onFileChange={handleScreenshotChange}
                            accept=".pdf,.jpg,.png"
                            label="Upload Proof of Payment"
                        />
                        <button type="submit" className="submit-button" disabled={loading}>
                            {loading ? 'Submitting...' : 'Upload Proof of Payment'}
                        </button>

                        {message && <p className="form-message">{message}</p>}
                    </form>
                </div>
            </div>
            {/* Toast */}

            {toast && (
            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(null)}
            />
            )}
        </div>
    );
};

export default DepositManual;
