// src/components/UploadComponent.js
import React, { useState } from 'react';

/**
 * Component for handling the upload of image files for transcription.
 * This component provides an interface for users to select an image file,
 * which is then passed to the useTranscription hook for processing.
 */
const UploadComponent = ({ transcribeImage }) => {
  const [file, setFile] = useState(null);

  /**
   * Handles the change event on the file input.
   * Sets the selected file to state and initiates transcription.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the file input.
   */
  const handleUpload = async (event) => {
    const newFile = event.target.files[0];
    console.log(newFile);
    if (newFile) {
      setFile(newFile);
      await transcribeImage(newFile);
    }
  };

  return (
    <div className="upload-container">
      <h3>Upload your image for transcription</h3>
      <input
        type="file"
        className="upload-input"
        onChange={handleUpload}
        accept="image/*"
      />
    </div>
  );
};

export default UploadComponent;
