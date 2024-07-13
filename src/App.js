import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import {jwtDecode} from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserHome from './pages/UserHome';
import AdminHome from './pages/AdminHome';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const updateToken = () => {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
      if (storedToken) {
        const decoded = jwtDecode(storedToken);
        if(decoded.user.isAdmin){
          toast("Logged in as admin")
        }
        setIsAdmin(decoded.user.isAdmin);
      } else {
        setIsAdmin(false);
      }
    };

    window.addEventListener('storage', updateToken);
    updateToken(); // Initial call to set state

    return () => {
      window.removeEventListener('storage', updateToken);
    };
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home/*" element={token ? (isAdmin ? <AdminHome /> : <UserHome />) : <Navigate to="/login" />} />
          <Route path="/" element={token ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
