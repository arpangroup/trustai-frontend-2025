import React from 'react';
import './ProfileCard.css';
import { FaWallet } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import CopyToClipboard from '../../../components/clipboard/CopyToClipboard';

const ProfileCard = ({ username, uuid, level, points, profileImage }) => {
  const navigate = useNavigate();

  return (
    <div className="profile-card">
      <div className="top-row">
        <img src={profileImage} alt={username} className="profile-img" />
        <div className="user-info">
          <div className="user-header">
            <h2 className="username">{username}</h2>
            <FaWallet className="wallet-icon" onClick={() => navigate(`/transactions`)} />
          </div>
          <div className="user-id">
            UID: {uuid}
            <CopyToClipboard
              text={uuid}
              size={14}
              color='#ccc'
              className="uid-copy-icon"
            />
          </div>
        </div>
      </div>

      <div className="bottom-row">
        <div className="info-box">Level {level}</div>
        <div className="info-box">{points} Points</div>
      </div>
    </div>
  );
};

export default ProfileCard;
