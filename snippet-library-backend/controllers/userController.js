// controllers/userController.js
const pool = require('../models/db');

// Get user profile details and their snippets
const getUserProfile = async (req, res) => {
  // The user's ID is available from the 'authenticate' middleware
  const userId = req.user.userId; 

  try {
    // Fetch user details and snippets in parallel for efficiency
    const [userPromise, snippetsPromise] = await Promise.all([
      pool.query('SELECT id, username, email, created_at FROM users WHERE id = ?', [userId]),
      pool.query('SELECT id, title, code, language, created_at FROM snippets WHERE user_id = ? ORDER BY created_at DESC', [userId])
    ]);

    const [userRows] = userPromise;
    const [snippets] = snippetsPromise;

    if (userRows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Combine the data into a single profile object
    const profile = {
      ...userRows[0],
      snippets: snippets
    };

    res.json(profile);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

module.exports = { getUserProfile };
