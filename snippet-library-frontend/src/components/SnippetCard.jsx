import React from "react";
import { Link } from "react-router-dom";
import "./SnippetCard.css";

const SnippetCard = ({ snippet }) => {
  return (
    <div className="snippet-card">
      <h3>{snippet.title}</h3>
      <p className="language">{snippet.language}</p>
      <p className="description">{snippet.description}</p>
      <Link to={`/snippet/${snippet.id}`} className="view-link">View Snippet</Link>
    </div>
  );
};

export default SnippetCard;
