// services/loanService.js
import axios from 'axios';

export const fetchLoanData = async () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${backendUrl}/loan-data`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.loans;
  } catch (error) {
    console.error('Error fetching loan data:', error);
    
  }
};
