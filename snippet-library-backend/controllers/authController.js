const pool = require('../models/db'); // MySQL pool with .promise()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Register controller
const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);

    // Insert into MySQL database
    await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashed]
    );

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed.' });
  }
};

// Login controller
const login = async (req, res) => {
  const { email, password } = req.body;
 // console.log("Login request:", email, password); 
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    //console.log("DB rows:", rows);

    if (rows.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = rows[0];
    //console.log("Stored hash:", user.password);

    const match = await bcrypt.compare(password, user.password);
    //console.log("Password match:", match);

    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '2d' });

    res.json({ token, user: { id: user.id, email: user.email , username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { register, login };
