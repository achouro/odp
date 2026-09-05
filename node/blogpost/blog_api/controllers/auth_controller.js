const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const signup = async (req, res) => {
  try {
    const { username, password, is_author } = req.body;
    
    const existing_user = await prisma.user.findUnique({ where: { username } });
    if (existing_user) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const new_user = await prisma.user.create({
      data: {
        username,
        password_hash,
        is_author: is_author || false
      }
    });

    return res.status(201).json({ message: 'User created successfully', user_id: new_user.id });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const is_valid_password = await bcrypt.compare(password, user.password_hash);
    if (!is_valid_password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const payload = { sub: user.id, username: user.username, is_author: user.is_author };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.json({ token, user: { id: user.id, username: user.username, is_author: user.is_author } });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  signup,
  login
};