import React, { useEffect, useState } from 'react';
import { fetchLoanData } from '../services/loanServices';
import '../styles/AccountOverview.css'; 

const AccountOverview = () => {
  const [overview, setOverview] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const data = await fetchLoanData(); 
        setOverview(data);
      } catch (error) {
        console.error('Error fetching account overview:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  // Function to calculate the total amount paid for a loan
  const calculateAmountPaid = (payments) => {
    if (!payments || payments.length === 0) {
      return 0;
    }
    return payments.reduce((total, payment) => total + payment.payment_amount, 0);
  };

  if (loading) {
    return (
      <center><span class="loader"></span></center>
    );
  }

  return (
    <div className="account-overview">
      <center><h2 className='mt-3'>Account Overview</h2></center>
      {overview.length === 0 ? (
        <p>No loans found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Loan Name</th>
              <th>Loan Amount (P)</th>
              <th>Total Amount (A)</th>
              <th>EMI Amount</th>
              <th>Total Interest (I)</th>
              <th>Amount Paid</th>
              <th>EMIs Left</th>
            </tr>
          </thead>
          <tbody>
            {overview.map((loan, index) => (
              <tr key={loan.loan_id}>
                <td>{index + 1}</td>
                <td>{loan.loan_name}</td>
                <td>{loan.loan_amount}</td>
                <td>{loan.total_amount}</td>
                <td>{loan.monthly_emi}</td>
                <td>{loan.total_interest}</td>
                <td>{calculateAmountPaid(loan.payments)}</td>
                <td>{loan.emi_left}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AccountOverview;
