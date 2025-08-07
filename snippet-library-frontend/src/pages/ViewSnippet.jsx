// pages/ViewSnippet.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { 
  getSnippetById, 
  getCommentsForSnippet, 
  getVotesForSnippet,
  addComment,
  postVote 
} from "../services/apiService"; // <-- IMPORT
import "./ViewSnippet.css";

const ViewSnippet = () => {
  const { id } = useParams();
  
  // NEW: State for all our data
  const [snippet, setSnippet] = useState(null);
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState({ up: 0, down: 0 });
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');

  // NEW: A function to fetch all data for the page
  const fetchData = useCallback(async () => {
    try {
      // Use Promise.all to fetch everything at once
      const [snippetRes, commentsRes, votesRes] = await Promise.all([
        getSnippetById(id),
        getCommentsForSnippet(id),
        getVotesForSnippet(id)
      ]);
      setSnippet(snippetRes.data);
      setComments(commentsRes.data);
      setVotes(votesRes.data);
    } catch (err) {
      setError("Failed to load snippet data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // NEW: Handler to post a new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await addComment(id, { content: newComment });
      setNewComment("");
      fetchData(); // Refresh data to show the new comment
    } catch (err) {
      alert("Failed to add comment. Are you logged in?");
      console.error(err);
    }
  };

  // NEW: Handler to post a vote
  const handleVote = async (voteType) => {
    try {
      await postVote(id, voteType);
      fetchData(); // Refresh data to show the new vote count
    } catch (err) {
      alert("Failed to vote. Are you logged in?");
      console.error(err);
    }
  };

  const handleCopy = () => {
    if (!snippet?.code) return;

    // Create a temporary textarea element to hold the text
    const textArea = document.createElement("textarea");
    textArea.value = snippet.code;
    
    // Make the textarea invisible
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";
    
    document.body.appendChild(textArea);
    
    // Select the text and execute the copy command
    textArea.select();
    try {
      document.execCommand('copy');
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy');
      console.error('Failed to copy text: ', err);
    }
    
    // Clean up by removing the textarea
    document.body.removeChild(textArea);
    
    // Reset the success message after 2 seconds
    setTimeout(() => setCopySuccess(''), 2000);
  };

  if (loading) return <p>Loading snippet...</p>;
  if (error && !copySuccess) return <p style={{ color: "red" }}>{error}</p>;
  if (!snippet) return <p>Snippet not found.</p>;

  return (
    <div className="view-snippet">
      <h2>{snippet.title}</h2>
      <p className="language">Language: {snippet.language}</p>
      
      {/* Vote Section */}
      <div className="vote-section" >
        <button onClick={() => handleVote('up')} >👍</button>
        <span style={{ margin: '0 10px' }}>{votes.up - votes.down}</span>
        <button onClick={() => handleVote('down')}>👎</button>
      </div>

      <div className="code-block-wrapper">
        <pre>
          <button onClick={handleCopy} className="copy-button" >
            {copySuccess ? copySuccess : 'Copy'}
          </button>
          <code>{snippet.code}</code>
        </pre>
        
      </div>
      
      {/* Comments Section */}
      <div className="comments-section">
        <h3>Comments</h3>
        <div className="add-comment">
          <textarea 
            placeholder="Add a comment..." 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Post Comment</button>
        </div>
        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} className="comment">
                <strong>{comment.username}:</strong> {comment.content}
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewSnippet;