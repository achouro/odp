const db = require('../config/database');

const get_users_index = async (req, res) => {
  const current_user_id = req.session.user_id;
  try {
    const users_result = await db.query('SELECT id, username, profile_picture FROM users WHERE id != $1', [current_user_id]);
    const users = users_result.rows;

    const follows_result = await db.query('SELECT following_id, status FROM follows WHERE follower_id = $1', [current_user_id]);
    const follow_map = {};
    follows_result.rows.forEach(f => {
      follow_map[f.following_id] = f.status;
    });

    const response_data = users.map(u => ({
      ...u,
      status: follow_map[u.id] || null
    }));

    res.json(response_data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

const get_profile = async (req, res) => {
  const profile_id = req.params.id;
  const current_user_id = req.session.user_id;
  try {
    const user_result = await db.query('SELECT id, username, profile_picture, created_at FROM users WHERE id = $1', [profile_id]);
    if (user_result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    const profile_user = user_result.rows[0];

    const posts_result = await db.query(
      `SELECT p.id, p.content, p.created_at, 
              (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS like_count,
              EXISTS(SELECT 1 FROM likes l WHERE l.post_id = p.id AND l.user_id = $2) AS user_liked
       FROM posts p WHERE p.author_id = $1 ORDER BY p.created_at DESC`,
      [profile_id, current_user_id]
    );

    res.json({ user: profile_user, posts: posts_result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

const send_follow_request = async (req, res) => {
  const target_id = req.params.id;
  const current_user_id = req.session.user_id;
  try {
    await db.query('INSERT INTO follows (follower_id, following_id, status) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING', [current_user_id, target_id, 'accepted']);
    res.json({ message: 'Successfully followed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

const unfollow_user = async (req, res) => {
  const target_id = req.params.id;
  const current_user_id = req.session.user_id;
  try {
    await db.query('DELETE FROM follows WHERE follower_id = $1 AND following_id = $2', [current_user_id, target_id]);
    res.json({ message: 'Successfully unfollowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  get_users_index,
  get_profile,
  send_follow_request,
  unfollow_user,
};