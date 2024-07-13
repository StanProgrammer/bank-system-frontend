import React from 'react';
import PropTypes from 'prop-types';
import '../styles/LoanModal.css';

const LoanModal = ({ totalAmount, monthlyEMI, loanName, onClose }) => {
  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Loan Details</h5>
          </div>
          <div className="modal-body">
            <p><strong>Loan Name:</strong> {loanName}</p>
            <p><strong>Total Amount to be Paid:</strong> {totalAmount}</p>
            <p><strong>Monthly EMI:</strong> {monthlyEMI}</p>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button type="button" className="btn btn-primary" onClick={onClose}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

LoanModal.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  monthlyEMI: PropTypes.number.isRequired,
  loanName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default LoanModal;
