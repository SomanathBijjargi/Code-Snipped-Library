const pool = require('../models/db');

// Create snippet controller
const createSnippet = async (req, res) => {
  const { title, code, language } = req.body;
  const userId = req.user.userId;

  try {
    await pool.query(
      'INSERT INTO snippets (title, code, language, user_id) VALUES (?, ?, ?, ?)',
      [title, code, language, userId]
    );
    res.status(201).json({ message: 'Snippet created successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to post snippet' });
  }
};

module.exports = { createSnippet };


const getAllSnippets = async (req, res) => {
  const { language, search } = req.query;

  try {
    let query = `
      SELECT snippets.*, users.username 
      FROM snippets 
      JOIN users ON snippets.user_id = users.id
    `;
    const params = [];

    // Add filters
    if (language || search) {
      query += ' WHERE';
    }

    if (language) {
      query += ' snippets.language = ?';
      params.push(language);
    }

    if (search) {
      if (language) query += ' AND';
      query += ' (snippets.title LIKE ? OR snippets.code LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY snippets.created_at DESC';

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch snippets' });
  }
};

const addComment = async (req, res) => {
  const snippetId = req.params.id;
  const userId = req.user.userId;
  const { content } = req.body;

  try {
    await pool.query(
      'INSERT INTO comments (content, user_id, snippet_id) VALUES (?, ?, ?)',
      [content, userId, snippetId]
    );
    res.status(201).json({ message: 'Comment added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

const getComments = async (req, res) => {
  const snippetId = req.params.id;

  try {
    const [comments] = await pool.query(
      `SELECT comments.*, users.username 
       FROM comments 
       JOIN users ON comments.user_id = users.id 
       WHERE snippet_id = ? 
       ORDER BY comments.created_at DESC`,
      [snippetId]
    );
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get comments' });
  }
};

const voteSnippet = async (req, res) => {
  const snippetId = req.params.id;
  const userId = req.user.userId;
  const { vote_type } = req.body; // "up" or "down"

  if (!['up', 'down'].includes(vote_type)) {
    return res.status(400).json({ error: 'Invalid vote type' });
  }

  try {
    await pool.query(
      `INSERT INTO votes (user_id, snippet_id, vote_type)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE vote_type = VALUES(vote_type)`,
      [userId, snippetId, vote_type]
    );
    res.status(200).json({ message: 'Vote recorded' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to vote' });
  }
};

const getSnippetVotes = async (req, res) => {
  const snippetId = req.params.id;

  try {
    const [rows] = await pool.query(
      `SELECT vote_type, COUNT(*) as count
       FROM votes
       WHERE snippet_id = ?
       GROUP BY vote_type`,
      [snippetId]
    );

    const votes = { up: 0, down: 0 };
    rows.forEach(row => {
      votes[row.vote_type] = row.count;
    });

    res.json(votes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get votes' });
  }
};

// Add this function to snippetController.js

const getSnippetById = async (req, res) => {
  const snippetId = req.params.id;

  try {
    const query = `
      SELECT snippets.*, users.username 
      FROM snippets 
      JOIN users ON snippets.user_id = users.id 
      WHERE snippets.id = ?
    `;
    
    const [rows] = await pool.query(query, [snippetId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Snippet not found' });
    }

    // The query returns an array, so we send the first (and only) result
    res.json(rows[0]); 

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch snippet' });
  }
};

module.exports = {
  createSnippet,
  getAllSnippets,
  getComments,
  addComment,
  getSnippetById,
  getSnippetVotes,
  voteSnippet 
};
