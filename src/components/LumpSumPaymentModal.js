import React, { useState } from 'react';

const LumpSumPaymentModal = ({ loan, show, onHide, onPayLumpSum }) => {
  const [lumpSumAmount, setLumpSumAmount] = useState(0);

  if (!loan) {
    return null; // Handle case where loan is null or undefined
  }

  const handleConfirmPayment = () => {
    onPayLumpSum(loan._id, lumpSumAmount, loan.loan_name,loan.total_amount);
    onHide();
  };

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Pay Lump Sum for {loan.loan_name}</h5>
            <i className="fa-solid fa-xmark" style={{ cursor: 'pointer', fontSize: "25px" }} onClick={onHide}></i>
          </div>
          <div className="modal-body">
            <p>Balance Amount: {loan.balance_amount}</p>
            <label htmlFor="lumpSumAmount">Lump Sum Amount:</label>
            <input
              type="number"
              id="lumpSumAmount"
              className="form-control"
              value={lumpSumAmount}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setLumpSumAmount(value);
               
              }}
              max={loan.balance_amount}
              required
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleConfirmPayment}>
              Pay Lump Sum
            </button>
            <button type="button" className="btn btn-secondary" onClick={onHide}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LumpSumPaymentModal;
