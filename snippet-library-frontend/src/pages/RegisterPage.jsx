// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/apiService'; // Import the register function
import { Link } from 'react-router-dom';
// filepath: d:\Code_Snippet_Library\snippet-library-frontend\src\pages\RegisterPage.jsx

const RegisterPage = () => {
    // State to hold form data for username, email, and password
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Handles changes in the input fields and updates the state
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handles the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            // Call the API service to register the user
            const response = await registerUser(formData);
            
            // On success, show a message and redirect to the login page
            alert(response.data.message || 'Registration successful! Please log in.');
            navigate('/login'); // Redirect to login page after successful registration

        } catch (err) {
            // If the API returns an error, display it to the user
            const errorMessage = err.response?.data?.error || 'Registration failed. Please try again.';
            setError(errorMessage);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Basic styling for the form
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
            <h2>Register</h2>
            {error && <p style={errorStyle}>{error}</p>}
            
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                style={inputStyle}
                required
            />
            
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
                required
            />
            
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                style={inputStyle}
                required
            />
            
            <button type="submit" style={buttonStyle} disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </button>

            <p>Already have an account? <Link to="/login">Log in</Link></p>
        </form>
    );
};

export default RegisterPage;
