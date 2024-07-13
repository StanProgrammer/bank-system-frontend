// components/Ledger.js
import React, { useEffect, useState } from 'react';
import { getLoanLedger } from '../services/loanService';

const Ledger = ({ loanId }) => {
  const [ledger, setLedger] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLedger = async () => {
      try {
        const data = await getLoanLedger(loanId);
        setLedger(data.data);
      } catch (error) {
        console.error("Error fetching ledger:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLedger();
  }, [loanId]);

 if (loading) {
    return (
      <center><span class="loader"></span></center>
    );
  }

  if (!ledger) {
    return <div>No ledger data available</div>;
  }

  return (
    <div className="ledger">
      <h2>Loan Ledger for Loan ID: {loanId}</h2>
      <p>Balance Amount: {ledger.balance_amount}</p>
      <p>Monthly EMI: {ledger.monthly_emi}</p>
      <p>EMIs Left: {ledger.emi_left}</p>
      <h3>Transactions</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {ledger.payments.map((payment, index) => (
            <tr key={index}>
              <td>{new Date(payment.payment_date).toLocaleString()}</td>
              <td>{payment.payment_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ledger;
