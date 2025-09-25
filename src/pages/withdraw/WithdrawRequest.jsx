import React, { useEffect, useState } from "react";
import "./WithdrawRequest.css";
import { FaTimes } from "react-icons/fa";
import { CURRENCY_UNIT, MINIMUM_WITHDRAW, SERVICE_CHARGE } from "../../constants/config";
import apiClient from "../../api/apiClient";
import { API_ROUTES } from "../../api/apiRoutes";
import { toast } from "react-toastify";

export default function WithdrawRequest() {
  const [walletBalance, setWalletBalance] = useState("100");
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);


  // ✅ Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(API_ROUTES.USER_INFO); // Replace with your actual endpoint
        const user = response.data;

        setWalletBalance(user.walletBalance);
        setWalletAddress(user.walletAddress);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load account settings");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);


  // useEffect(() => {
  //   fetchWalletBalance();
  // }, []);


  // const fetchWalletBalance = async () => {
  //   try {
  //     //await delay(1000 * 3);
  //     const response = await apiClient.get(API_ROUTES.WALLET.WALLET_BALANCE);
  //     const wallet = response.data;
  //     setWalletBalance(wallet.walletBalance);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default submission behavior

    // ✅ Validate wallet address
    if (!walletAddress || walletAddress.trim() === "") {
      toast.warning("Wallet address is required.");
      return;
    }

    
    if (walletAddress.trim().length < 5) {
      console.log("Invalid wallet address");
      toast.warning("Wallet address must be at least 5 characters long.");
      return;
    }

    const numericAmount = parseFloat(amount);

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      toast.warning("Please enter a valid amount.");
      return;
    }

    if (numericAmount < MINIMUM_WITHDRAW) {
      toast.warning(`Minimum withdraw amount is ${MINIMUM_WITHDRAW} ${CURRENCY_UNIT}.`);
      return;
    }

    if (numericAmount > parseFloat(walletBalance)) {
      toast.warning("Entered amount exceeds your wallet balance.");
      return;
    }

    const totalDeduction = numericAmount + SERVICE_CHARGE;
    if (totalDeduction > parseFloat(walletBalance)) {
      toast.warning(`You don't have enough balance after service charge (${SERVICE_CHARGE} ${CURRENCY_UNIT}).`);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        amount: parseFloat(amount),
        walletAddress: walletAddress,
      };

      const response = await apiClient.post(API_ROUTES.WITHDRAWAL.WITHDRAW_REQUEST, payload);

      toast.success("Withdraw request submitted successfully!");

      // Reset amount after successful submission
      setAmount("");
      //fetchWalletBalance(); // Refresh balance
    } catch (error) {
      console.error("Withdrawal failed:", error);
      toast.error(error.message || "Failed to submit withdraw request.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setAmount("");
  };

  return (
    <div>
      <div className="withdraw-page">
        {/* <h2 className="withdraw-title">Withdraw Request</h2> */}
        <form onSubmit={handleSubmit}>

          <div className="withdraw-card" style={{ marginTop: '16px' }}>
            {/* Withdraw Address */}
            <div className="form-group">
              <label>Withdraw Address</label>
              <input
                type="text"
                value={walletAddress}
                disabled
                className="withdraw-input"
              />
            </div>

            <hr className="divider" />

            {/* Amount Input */}
            <div className="form-group">
              <label>Amount</label>
              <div className="amount-wrapper">
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="withdraw-input"
                  required
                />
                <span className="currency">{CURRENCY_UNIT}</span>
              </div>
            </div>

            <hr className="divider" />

            {/* Read-only Info */}
            <div className="info-row">
              <span>Available Balance</span>
              <span>{walletBalance} {CURRENCY_UNIT}</span>
            </div>
            <div className="info-row">
              <span>Minimum Withdraw</span>
              <span>{MINIMUM_WITHDRAW} {CURRENCY_UNIT}</span>
            </div>
            <div className="info-row">
              <span>Service Charge</span>
              <span>{SERVICE_CHARGE} {CURRENCY_UNIT}</span>
            </div>

            <hr className="divider" />

            {/* Buttons */}
            <div className="button-row">
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="confirm-button">
                Confirm
              </button>
            </div>
          </div>
        </form>


      </div>
    </div>
  );
}
