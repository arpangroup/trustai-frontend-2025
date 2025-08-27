// components/CopyToClipboard.js
import React from "react";
import { FaCopy } from "react-icons/fa";

const CopyToClipboard = ({ 
    text, 
    onCopy, 
    className = "", 
    children,
    size = 16,
    color = "#f0f0f0"
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      if (onCopy) onCopy("Copied to clipboard!", "success");
    } catch (err) {
      if (onCopy) onCopy("Failed to copy!", "error");
    }
  };

  return (
   <span
      className={`copy-to-clipboard ${className}`}
      onClick={handleCopy}
      title="Copy to clipboard"
      style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", marginLeft: "8px" }}
    >
      {children || <FaCopy size={size} color={color} />}
    </span>
  );
};

export default CopyToClipboard;
