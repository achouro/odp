const express = require('express');
const router = express.Router();
const prisma = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const currentUserId = req.session.user_id;
    
    const users = await prisma.user.findMany({
      where: {
        id: { not: currentUserId }
      },
      select: {
        id: true,
        username: true,
        profilePicture: true
      }
    });

    res.json(users);
  } catch (err) {
    console.error('Failed to fetch users:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;