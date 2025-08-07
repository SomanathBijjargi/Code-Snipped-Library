// App.js
// ... other imports
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SnippetList from './pages/SnippetList';
import CreateSnippet from './pages/CreateSnippet';
import ViewSnippet from './pages/ViewSnippet';
import RegisterPage from './pages/RegisterPage'; // <-- IMPORT
import LoginPage from "./pages/LoginPage"; // <-- IMPORT
import ProfilePage from './pages/ProfilePage'; // Import the new page
import ProtectedRoute from './components/ProtectedRoute'; // Import the protected route
import './App.css'; // Assuming you have some global styles
function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/snippets" element={<SnippetList />} />
          <Route path="/create" element={<CreateSnippet />} />
          <Route path="/snippet/:id" element={<ViewSnippet />} />
          <Route path="/login" element={<LoginPage />} /> {/* <-- ADD ROUTE */}
          <Route path="/register" element={<RegisterPage />} /> {/* <-- ADD ROUTE */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } /> {/* Protected route for profile page */}
          <Route path="*" element={<Home />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;