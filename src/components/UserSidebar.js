import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/UserSidebar.css';

const UserSidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2 className="p-3">Dashboard</h2>
      <ul className="nav flex-column">
        <li className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}>
          <Link to="/home" className="nav-link">Home</Link>
        </li>
        <li className={`nav-item ${location.pathname === '/home/loans' ? 'active' : ''}`}>
          <Link to="/home/loans" className="nav-link">Loans</Link>
        </li>
        <li className={`nav-item ${location.pathname === '/home/payments' ? 'active' : ''}`}>
          <Link to="/home/payments" className="nav-link">Payment</Link>
        </li>
        <li className={`nav-item ${location.pathname === '/home/user' ? 'active' : ''}`}>
          <Link to="/home/user" className="nav-link">Account Overview</Link>
        </li>
        <li className={`nav-item ${location.pathname === '/home/contact' ? 'active' : ''}`}>
          <Link to="/home/contact" className="nav-link">Contact Us</Link>
        </li>
        {/* Add other links here */}
      </ul>
    </div>
  );
}

export default UserSidebar;
