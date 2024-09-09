import React, { useState } from 'react';
import axios from 'axios';
import './SantaAssignment.css'; // Ensure this CSS file is properly linked

const SantaAssignment: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const onFileUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      axios.post('http://localhost:5000/api/upload', formData, {
        responseType: 'blob'
      })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        setDownloadLink(url);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
    }
  };

  return (
    <div className="santa-assignment-container">
      <header className="header">
        <h1>Secret Santa File Upload</h1>
      </header>
      <main className="main-content">
        <div className="upload-container">
          <input
            type="file"
            onChange={onFileChange}
            className="file-input"
          />
          <button
            onClick={onFileUpload}
            className="upload-button"
          >
            Upload
          </button>
        </div>
        {downloadLink && (
          <div className="download-link-container">
            <a href={downloadLink} download="secret_santa_assignments.xlsx" className="download-link">
              Download Assignments
            </a>
          </div>
        )}
      </main>
    </div>
  );
}

export default SantaAssignment;
