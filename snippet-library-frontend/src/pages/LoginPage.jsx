// pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/apiService';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData);
            // IMPORTANT: Store the token
            localStorage.setItem('authToken', response.data.token);
            alert('Login successful!');
            navigate('/snippets'); // Redirect to snippets page
        } catch (error) {
            alert('Login failed. Please check your credentials.');
            console.error(error);
        }
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        margin: '2rem auto',
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
    };

    const inputStyle = {
        marginBottom: '1rem',
        padding: '0.5rem',
        fontSize: '1rem',
    };

    const buttonStyle = {
        padding: '0.75rem',
        fontSize: '1rem',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
    };

    const errorStyle = {
        color: 'red',
        marginBottom: '1rem',
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h2>Login</h2>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={inputStyle} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={inputStyle} />
            <button type="submit" style={buttonStyle}>Login</button>
        </form>
    );
};

export default LoginPage;