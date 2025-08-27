import React from "react";

const PanelMid = ({ label, value, color }) => {
  return (
    <div className="panel-mid">
      {label}
      <br />
      <span style={{ color, fontWeight: "500" }}>{value}</span>
    </div>
  );
};

export default PanelMid;
