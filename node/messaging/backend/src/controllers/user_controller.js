const prisma = require('../config/database');

const get_users_index = async (req, res) => {
  const currentUserId = req.session.user_id;
  try {
    const users = await prisma.user.findMany({
      where: { id: { not: currentUserId } },
      select: { id: true, username: true, profilePicture: true },
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = { get_users_index };