import React from "react";

const HeaderV1 = ({ username, avatar, level, points }) => {
  return (
    <div className="header">
      <div className="user-info">
        <div className="avatar">
          <img src={avatar} alt="User Avatar" />
        </div>
        <div className="user-details">
          <span className="username">{username}</span>
          <span className="level">{level}</span>
          <span className="points">{points}</span>
        </div>
      </div>
      <div className="header-icons">
        <span className="icon">&#128276;</span>
        <span className="icon">&#9776;</span>
      </div>
    </div>
  );
};

export default HeaderV1;
