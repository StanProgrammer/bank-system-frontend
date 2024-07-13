import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/Profile.css';

const Profile = () => {
  const [data, setData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('https://placehold.co/600x400?text=Upload Image');

  // Fetch user data from backend
  const userData = async () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${backendUrl}/user-data`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(response.data);
      
      if (response.data.profilePic) {
        setPreview(response.data.profilePic);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to fetch user data. Please try again later.');
    }
  };


  useEffect(() => {
    userData();
    handleFileUpload();
  }, [selectedFile]);

  // Handle file upload
  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(`${backendUrl}/upload-image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      // Refresh user data after successful upload
      userData();
      toast.success('Image uploaded successfully.');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again later.');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  if (!data) {
   
      return (
        <center><span class="loader"></span></center>
      );
    }
  

  return (
    <div className="card profile-card">
      <div className="card-body text-center">
        <img
          src={preview}
          className="profile-image rounded-circle"
          alt="Profile"
          style={{cursor: 'pointer'}}
          onClick={() => document.getElementById('imageInput').click()} // Trigger file input click on image click
        />
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <h5 className="card-title mt-3">{data.name}</h5>
        <center>
          <button type="button" className="btn btn-primary mb-2" onClick={() => document.getElementById('imageInput').click()}>
            Upload Image
          </button>
        </center>

        <div className="card-text">
          <p className="mb-2">
            <strong>Email:</strong> {data.email}
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> {data.phone}
          </p>
          <p className="mb-2">
            <strong>No. of Loans:</strong> {data.loans.length}
          </p>
          <p className="mb-0">
            <strong>Active Since:</strong> {new Date(data.isActive).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
