import React from 'react';
import UserSidebar from '../components/UserSidebar';
import '../styles/UserHome.css';
import { Routes, Route, Link } from 'react-router-dom';
import LoanPage from '../components/LoanPage';
import HomePage from '../components/HomePage';
import Payment from '../components/Payment';
import Account from './Account';
import Contact from '../components/ContactUs';
import Profile from './Profile';
const UserHome = () => {
  const Logout = () => {
    try {
      localStorage.removeItem("token");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="user-home">
      <i className="fa-solid fa-circle-user user-icon dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown"></i>
  <div className="dropdown-menu" >
    
    <a className="dropdown-item" href="/home/profile"><i className="fa-solid fa-id-card profile"></i> Profile</a>
    <p className="dropdown-item para"><i className="fa-solid fa-right-from-bracket logout" onClick={()=>Logout}></i> Logout</p>
  </div>

  <div className="pos-f-t hamburger">
        <div className="collapse" id="navbarToggleExternalContent">
          <div className="bg-dark p-4">
            <Link className="nav-link" to='/home/loans'>Loans</Link>
            <Link className="nav-link" to='/home/payments'>Payments</Link>
            <Link className="nav-link" to='/home/user'>Account</Link>
            <Link className="nav-link" to='/home/contact'>Contact</Link>
            <Link className="nav-link" to='/home/profile'>Profile</Link>
            {/* Add other links here */}
          </div>
        </div>
        <nav className="navbar navbar-dark bg-dark">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
      </div>

      <UserSidebar />

      <div className="content ml-3 mr-3 overflow-auto">
        <Routes>
        <Route path='/' element={<HomePage />} />
          <Route path='/loans' element={<LoanPage />} />
          <Route path='/payments' element={<Payment />} />
          <Route path='/user' element={<Account />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/profile' element={<Profile />} />
          {/* Add other routes here */}
         
        </Routes>
       
      </div>
    </div>
  );
}

export default UserHome;
