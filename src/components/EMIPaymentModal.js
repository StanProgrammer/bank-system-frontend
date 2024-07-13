import React, { useState } from 'react';

const EMIPaymentModal = ({ loan, show, onHide, onPayEMIs }) => {
  const [numEMIs, setNumEMIs] = useState(1);

  if (!loan) {
    return null; // Handle case where loan is null or undefined
  }

  const increaseNumEMIs = () => {
    if (numEMIs < loan.emi_left) {
      setNumEMIs(numEMIs + 1);
    }
  };

  const decreaseNumEMIs = () => {
    if (numEMIs > 1) {
      setNumEMIs(numEMIs - 1);
    }
  };

  const payAllEMIs = () => {
    setNumEMIs(loan.emi_left); // Set numEMIs to remaining EMIs
  };

  const handleConfirmPayment = () => {
    onPayEMIs(loan._id, numEMIs, loan.loan_name);
    onHide();
  };

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Pay EMIs for {loan.loan_name}</h5>
            <i className="fa-solid fa-xmark" style={{ cursor: 'pointer', fontSize: "25px" }} onClick={onHide}></i>
          </div>
          <div className="modal-body">
            <p>Remaining EMIs: {loan.emi_left}</p>
            <p>EMI Amount: {loan.monthly_emi}</p>
            <p>EMI Amount: {loan.last_emi}</p>
            <label htmlFor="numEMIs">Number of EMIs to pay:</label>
            <div className="input-group mb-3">
              <input
                type="number"
                id="numEMIs"
                className="form-control"
                value={numEMIs}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value >= 1 && value <= loan.emi_left) {
                    setNumEMIs(value);
                  }
                }}
                min="1"
                max={loan.emi_left}
                disabled
              />
              <button className="btn btn-outline-secondary" type="button" onClick={increaseNumEMIs}>+</button>
              <button className="btn btn-outline-secondary" type="button" onClick={decreaseNumEMIs}>-</button>
              <button className="btn btn-outline-secondary" type="button" onClick={payAllEMIs}>Pay All EMIs</button>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleConfirmPayment}>
              Pay {numEMIs} EMIs
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

export default EMIPaymentModal;
