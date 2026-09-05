const prisma = require('../config/database');
const bcrypt = require('bcrypt');

async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existing_user = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] }
    });

    if (existing_user) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const profilePicture = '/avatars/default-1.png';

    const user = await prisma.user.create({
      data: { username, email, passwordHash, profilePicture }
    });

    req.session.user_id = user.id;
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ error: 'Server error' });
      }
      res.json({
        message: 'Signed up successfully',
        user: { id: user.id, username: user.username, email: user.email, profilePicture: user.profilePicture }
      });
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function signin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const valid_password = await bcrypt.compare(password, user.passwordHash);
    if (!valid_password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    req.session.user_id = user.id;
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ error: 'Server error' });
      }
      res.json({
        message: 'Signed in successfully',
        user: { id: user.id, username: user.username, email: user.email, profilePicture: user.profilePicture }
      });
    });
  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function get_session(req, res) {
  if (!req.session.user_id) {
    return res.status(401).json({ authenticated: false });
  }
  try {
    const user = await prisma.user.findUnique({ where: { id: req.session.user_id } });
    if (!user) return res.status(401).json({ authenticated: false });
    res.json({
      authenticated: true,
      user: { id: user.id, username: user.username, email: user.email, profilePicture: user.profilePicture }
    });
  } catch (err) {
    console.error('Session check error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'Could not log out' });
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
}

module.exports = { signup, signin, get_session, logout };