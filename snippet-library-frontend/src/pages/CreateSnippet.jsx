// pages/CreateSnippet.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSnippet } from "../services/apiService"; // <-- IMPORT
import "./CreateSnippet.css";

const CreateSnippet = () => {
  const [formData, setFormData] = useState({
    title: "",
    language: "",
    description: "", // Your backend doesn't have this field, but we can ignore it for now or add it later
    code: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // MODIFIED: handleSubmit to be async and call the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // The auth token is added automatically by our apiService
      await createSnippet(formData);
      alert("Snippet created successfully!");
      navigate("/snippets");
    } catch (err) {
      alert("Failed to create snippet. Are you logged in?");
      console.error(err);
    }
  };
  
  // The rest of your component's JSX remains the same...
  return (
    <div className="create-snippet-container">
      <h2>Create New Snippet</h2>
      <form onSubmit={handleSubmit} className="snippet-form">
        {/* All your input fields go here */}
        <label>Title</label>
        <input name="title" value={formData.title} onChange={handleChange} required />
        <label>Language</label>
        <input name="language" value={formData.language} onChange={handleChange} required />
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        <label>Code</label>
        <textarea name="code" value={formData.code} onChange={handleChange} rows={8} required></textarea>
        <button type="submit">Add Snippet</button>
      </form>
    </div>
  );
};

export default CreateSnippet;