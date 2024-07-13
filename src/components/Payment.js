import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import EMIPaymentModal from './EMIPaymentModal';
import LumpSumPaymentModal from './LumpSumPaymentModal';

const Payment = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const token = localStorage.getItem('token');
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showEMIModal, setShowEMIModal] = useState(false);
  const [showLumpSumModal, setShowLumpSumModal] = useState(false);
  const [numEMIs, setNumEMIs] = useState(1);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    fetchLoanData();
  }, []);

  const fetchLoanData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/loan-data`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLoans(response.data.loans);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching loan data:', error);
      toast.error('Failed to fetch loan data. Please try again later.');
      setLoading(false); // Ensure loading is set to false on error
    }
  };

  const handleEMIPayment = (loanId) => {
    const selected = loans.find((loan) => loan._id === loanId);
    setSelectedLoan(selected);
    setShowEMIModal(true);
  };

  const handleLumpSumPayment = (loanId) => {
    const selected = loans.find((loan) => loan._id === loanId);
    setSelectedLoan(selected);
    setShowLumpSumModal(true);
  };

  const handlePayEMIs = async (loanId, numEMIs, loanName) => {
    try {
      const response = await axios.post(`${backendUrl}/pay-loan`, { loanId, numEMIs }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.data.loan === null) {
        const updatedLoans = loans.filter(loan => loan._id !== loanId);
        setLoans(updatedLoans);
        toast.success(response.data.message);
      } else {
        const updatedLoans = loans.map(loan => {
          if (loan._id === loanId) {
            return {
              ...loan,
              emi_left: response.data.loan.emi_left,
              balance_amount: response.data.loan.balance_amount,
            };
          }
          return loan;
        });
        setLoans(updatedLoans);
        toast.success(`Paid ${numEMIs} EMIs for ${loanName}`);
      }
  
      setShowEMIModal(false);
    } catch (error) {
      console.error('Error paying EMIs:', error);
      toast.error('Failed to pay EMIs. Please try again later.');
    }
  };

  const handlePayLumpSum = async (loanId, amount, loanName, total_amount) => {
    try {
      if (amount === 0) {
        return toast.error('Lump sum cannot be 0');
      }
      if (amount > total_amount) {
        return toast.error('Lump sum cannot be more than ' + total_amount);
      }
      
      const response = await axios.post(`${backendUrl}/pay-lumpsum`, { loanId, amount }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const updatedLoans = loans.map(loan => {
        if (loan._id === loanId) {
          return {
            ...loan,
            emi_left: response.data.loan.emi_left,
            balance_amount: response.data.loan.balance_amount,
          };
        }
        return loan;
      });

      setLoans(updatedLoans);
      toast.success(`Paid lump sum of ${amount} for ${loanName}`);
      setShowLumpSumModal(false);
    } catch (error) {
      console.error('Error paying lump sum:', error);
      toast.error('Failed to pay lump sum. Please try again later.');
    }
  };

  const handleCloseEMIModal = () => {
    setShowEMIModal(false);
    setSelectedLoan(null);
    setNumEMIs(1);
  };

  const handleCloseLumpSumModal = () => {
    setShowLumpSumModal(false);
    setSelectedLoan(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Payment Page</h2>
      {loading ? (
        <center><span class="loader"></span></center>
      ) : loans.length === 0 ? (
        <p>No loans found.</p>
      ) : (
        <div className="row">
          {loans.map((loan) => (
            <div key={loan._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{loan.loan_name}</h5>
                  <p>Balance Amount: {loan.balance_amount}</p>
                  <p>Emi Left: {loan.emi_left}</p>
                  <div className="row">
                    <div className="col">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEMIPayment(loan._id)}
                      >
                        Pay EMI
                      </button>
                    </div>
                    <div className="col">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleLumpSumPayment(loan._id)}
                      >
                        Pay Lump Sum
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showEMIModal && (
        <EMIPaymentModal
          loan={selectedLoan}
          show={showEMIModal}
          onHide={handleCloseEMIModal}
          onPayEMIs={handlePayEMIs}
        />
      )}

      {showLumpSumModal && (
        <LumpSumPaymentModal
          loan={selectedLoan}
          show={showLumpSumModal}
          onHide={handleCloseLumpSumModal}
          onPayLumpSum={handlePayLumpSum}
        />
      )}
    </div>
  );
};

export default Payment;
