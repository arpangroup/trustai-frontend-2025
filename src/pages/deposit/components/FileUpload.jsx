import React, { useState } from 'react';
import './FileUpload.css'; // optional if you're separating styles

import UploadIcon from '../../../assets/icons/upload.svg';

function FileUpload({ label = "Screenshot", name = "screenshot", accept = ".jpg,.jpeg,.png", onFileChange }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
      if (onFileChange) {
        onFileChange(selectedFile);
      }
    }
  };

  return (
    <div className="form-group">
      <label className="upload-label">{label}</label>
      <div className="wrap-custom-file">
        <input
          type="file"
          name={name}
          id={`upload-${name}`}
          accept={accept}
          onChange={handleChange}
        />
        <label
          htmlFor={`upload-${name}`}
          className={previewUrl ? "file-ok" : ""}
          style={{
            backgroundImage: previewUrl ? `url(${previewUrl})` : "none",
          }}
        >
          <div className="upload-content">
          {!previewUrl ? (
            <>
              <img className="upload-icon" src={UploadIcon} alt="upload" />
              <span>Select Screenshot (Required)</span>
            </>
          ) : (
            <span>{file.name}</span>
          )}
        </div>
        </label>
      </div>
    </div>
  );
}

export default FileUpload;
