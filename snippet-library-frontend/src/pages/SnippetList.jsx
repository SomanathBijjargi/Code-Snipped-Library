// pages/SnippetList.jsx
import React, { useState, useEffect } from "react";
import SnippetCard from "../components/SnippetCard";
import { getAllSnippets } from "../services/apiService";
import "./SnippetList.css"; 

const SnippetList = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 1. Add state for the search term
  const [searchTerm, setSearchTerm] = useState("");

  // 2. Update useEffect to fetch data based on the search term
  useEffect(() => {
    const fetchSnippets = async () => {
      setLoading(true);
      try {
        // Your backend automatically handles the 'search' query parameter
        // We need to build the query string to pass to our API service
        const params = new URLSearchParams();
        if (searchTerm) {
          params.append('search', searchTerm);
        }
        
        // Pass the params to the API call
        const response = await getAllSnippets({ params });
        setSnippets(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch snippets.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Use a timeout to prevent API calls on every keystroke
    const delayDebounceFn = setTimeout(() => {
      fetchSnippets();
    }, 1000); // Wait for 1000ms after the user stops typing

    // Cleanup function to cancel the timeout
    return () => clearTimeout(delayDebounceFn);

  }, [searchTerm]); // Re-run the effect when searchTerm changes

  // 3. Add the search input field to the JSX
  return (
    <div className="snippet-list">
      <h2>All Snippets</h2>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search snippets by title or code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          
        />
      </div>

      {loading && <p>Loading snippets...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <div className="snippet-grid">
        {!loading && snippets.length > 0 && (
          snippets.map(snippet => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))
        )}
      </div>

      {!loading && snippets.length === 0 && (
        <p>No snippets found.</p>
      )}
    </div>
  );
};

export default SnippetList;
