import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoanModal from './LoanModal';

const LoansPage = () => {
  const [loanName, setLoanName ] = useState('')
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPeriod, setLoanPeriod] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (parseFloat(loanAmount) < 50000) {
      toast.error('Loan amount must be greater than 50000');
      return;
    }
    if (parseFloat(loanAmount) > 1000000) {
      toast.error('Loan amount must be greater than 50000');
      return;
    }
    if (parseFloat(interestRate) > 30) {
      toast.error('Maximum interest rate is 30%');
      return;
    }
    if (parseInt(loanPeriod) < 1) {
      toast.error('Loan period must be at least 1 year');
      return;
    }

    // Prepare request data
    const requestData = {
      loan_name: loanName,
      loan_amount: parseFloat(loanAmount),
      loan_period: parseInt(loanPeriod),
      rate_of_interest: parseFloat(interestRate)
    };

    try {
      const response = await axios.post(`${backendUrl}/submit-loan`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const { total_amount, monthly_emi,loan_name} = response.data.loan;
        setTotalAmount(total_amount.toFixed(0));
        setMonthlyEMI(monthly_emi.toFixed(0));
        setLoanName(loan_name)
        toast.success('Loan application submitted successfully');
        setShowModal(true);
      } else {
        toast.error('Failed to submit loan application.');
      }
    } catch (error) {
      if(error.response.status === 409){
        toast.error('Loan application with this name already exists, please use a different name.');
        toast.error('Loan application name are unique to make you identify your loans better.');
      }
      else{
      console.error('Error submitting loan:', error);
      toast.error('Failed to submit loan application. Please try again later.');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Reset form fields
    setLoanName('');
    setLoanAmount('');
    setLoanPeriod('');
    setInterestRate('');
    setTotalAmount(0);
    setMonthlyEMI(0);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Apply for a Loan</h2>
              <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="loanAmount" className="form-label">Loan Name</label>
                  <input 
                    type="string" 
                    placeholder='Give Any Name you want to'
                    className="form-control" 
                    id="loanAmount" 
                    value={loanName} 
                    onChange={(e) => setLoanName(e.target.value)} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="loanAmount" className="form-label">Loan Amount</label>
                  <input 
                    placeholder='Enter loan amount'
                    type="number" 
                    className="form-control" 
                    id="loanAmount" 
                    value={loanAmount} 
                    onChange={(e) => setLoanAmount(e.target.value)} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="loanPeriod" className="form-label">Loan Period (in years)</label>
                  <input 
                    placeholder='Enter loan Period'
                    type="number" 
                    className="form-control" 
                    id="loanPeriod" 
                    value={loanPeriod} 
                    onChange={(e) => setLoanPeriod(e.target.value)} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="interestRate" className="form-label">Interest Rate (%)</label>
                  <input 
                    placeholder='Enter rate of interest'
                    type="number" 
                    step="0.01" 
                    className="form-control" 
                    id="interestRate" 
                    value={interestRate} 
                    onChange={(e) => setInterestRate(e.target.value)} 
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Apply Now</button>
              </form>
              <div className="text-center mt-3">
                <Link to="/home">Back to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <LoanModal
          totalAmount={parseInt(totalAmount)}
          monthlyEMI={parseInt(monthlyEMI)}
          loanName={loanName}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default LoansPage;
