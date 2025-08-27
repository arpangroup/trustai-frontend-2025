import React from 'react';
import './KeyValuePair.css'; // Optional, for styling

const KeyValuePair = ({ label, value, labelStyle = {}, valueStyle = {} }) => (
  <div className="key-value-pair">
    <span className="label" style={labelStyle}>{label}:</span>
    <span className="value" style={valueStyle}>{value}</span>
  </div>
);

export default KeyValuePair;
