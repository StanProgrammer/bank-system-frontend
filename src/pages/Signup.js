import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../styles/Signup.css';
import { toast } from 'react-toastify';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPwd, setConfPwd] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(password !== confPwd){
                return toast.error('Password and Confirm Password do not match.');
            }
            if (!validatePassword(password)) {
                return toast.error('Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.');
            }
            if(phone.length !== 10){
                return toast.error('Invalid phone number');

            }
            const result = await axios.post(`${backendUrl}/register`, { name, email, password, phone });
            if(result.data.statusCode === 409){
                toast(result.data.msg);
            } else {
                localStorage.setItem('token', result.data.token);
                toast.success("Registration successful");
                navigate("/home");
            }
        } catch (error) {
            toast.error('Server error');
            console.log(error);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100 signup-container">
            <div className="bg-white p-3 rounded w-25">
                <h2><center>Sign Up</center></h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input 
                            type="text" 
                            placeholder='Enter Name' 
                            autoComplete='off' 
                            name='name' 
                            className='form-control rounded-0'
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input 
                            type="email" 
                            placeholder='Enter Email' 
                            autoComplete='off' 
                            name='email' 
                            className='form-control rounded-0' 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone">
                            <strong>Phone Number</strong>
                        </label>
                        <input 
                            type="text" 
                            placeholder='Enter Phone Number' 
                            autoComplete='off' 
                            name='phone' 
                            className='form-control rounded-0' 
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input 
                            type="password" 
                            placeholder='Enter Password' 
                            name='password' 
                            className='form-control rounded-0' 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirm-password">
                            <strong>Confirm Password</strong>
                        </label>
                        <input 
                            type="password" 
                            placeholder='Confirm Password' 
                            name='confirm-password' 
                            className='form-control rounded-0' 
                            onChange={(e) => setConfPwd(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Sign Up
                    </button>
                </form>
                <p>Already have an account?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
