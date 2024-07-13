// src/pages/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <h2>Welcome to People's Bank</h2>
          <p>Your trust, our responsibility.</p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-4 mb-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Apply for a Loan</h5>
              <p className="card-text">Apply for a personal or business loan with competitive rates.</p>
              <Link to="/home/loans" className="btn btn-primary">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Manage Your Accounts</h5>
              <p className="card-text">View your loan's details, transaction history, and more.</p>
              <Link to="/home/user" className="btn btn-primary">
                View Accounts
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Contact Customer Support</h5>
              <p className="card-text">Need assistance? Contact our customer support team.</p>
              <Link to="/home/contact" className="btn btn-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
