// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current URL location
  
  // This effect will run every time the user navigates to a new page.
  // It checks if the auth token exists and updates the component's state.
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // The '!!' converts a string or null to a true/false boolean
  }, [location]); // The dependency array ensures this runs on every route change

  // This function handles the logout process
  const handleLogout = () => {
    // 1. Remove the token from local storage
    localStorage.removeItem("authToken");
    
    // 2. Update the state to immediately hide the "Logout" button
    setIsLoggedIn(false);
    
    // 3. Notify the user
    alert("You have been logged out successfully.");
    
    // 4. Redirect the user to the login page
    navigate("/login");
  };

  return (
    <header className="header">
      <h1>
        {/* Made the title a link to the homepage */}
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          Code Snippet Library
        </Link>
      </h1>
      <nav>
        {/* Always show the profile link if logged in */}
        {isLoggedIn && <Link to="/profile">Profile</Link>}
        <Link to="/">Home</Link>
        <Link to="/snippets">All Snippets</Link>
        {/* Conditional (ternary) operator to show different links based on login state */}
        {isLoggedIn ? (
          <>
            {/* These links only show if the user IS logged in */}
            <Link to="/create">Add Snippet</Link>
            <button onClick={handleLogout} className="logout-button" style={{ backgroundColor: 'red', color: 'white', border: 'none', marginLeft: '15px',padding: '5px 10px', cursor: 'pointer' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            {/* These links only show if the user IS NOT logged in */}
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        

      </nav>
    </header>
  );
};

export default Header;
