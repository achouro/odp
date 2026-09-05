const bcrypt = require('bcrypt');
const db = require('../config/database');
const crypto = require('crypto');

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(400).json({ error: 'User not found' });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    req.session.user_id = user.id;
    res.json({ message: 'Signed in successfully', user: { id: user.id, username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashed_password = await bcrypt.hash(password, 10);
    const hash_email = crypto.createHash('md5').update(email.trim().toLowerCase()).digest('hex');
    const profile_picture = `https://www.gravatar.com/avatar/${hash_email}?d=identicon`;

    const result = await db.query(
      'INSERT INTO users (username, email, password_hash, profile_picture) VALUES ($1, $2, $3, $4) RETURNING id',
      [username, email, hashed_password, profile_picture]
    );

    req.session.user_id = result.rows[0].id;
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error creating user (Username or Email may already exist).' });
  }
};

const check_session = async (req, res) => {
  if (!req.session.user_id) return res.status(401).json({ authenticated: false });
  try {
    const result = await db.query('SELECT id, username, profile_picture FROM users WHERE id = $1', [req.session.user_id]);
    if (result.rows.length === 0) return res.status(401).json({ authenticated: false });
    res.json({ authenticated: true, user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
};

module.exports = {
  signin,
  signup,
  check_session,
  logout,
};