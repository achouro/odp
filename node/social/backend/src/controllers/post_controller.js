const db = require('../config/database');

const get_feed = async (req, res) => {
  const user_id = req.session.user_id;
  try {
    const posts_query = `
      SELECT p.id, p.content, p.created_at, u.id AS author_id, u.username, u.profile_picture,
             (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS like_count,
             EXISTS(SELECT 1 FROM likes l WHERE l.post_id = p.id AND l.user_id = $1) AS user_liked
      FROM posts p
      JOIN users u ON p.author_id = u.id
      WHERE p.author_id = $1 OR p.author_id IN (
        SELECT following_id FROM follows WHERE follower_id = $1 AND status = 'accepted'
      )
      ORDER BY p.created_at DESC;
    `;
    const posts_result = await db.query(posts_query, [user_id]);
    const posts = posts_result.rows;

    for (let post of posts) {
      const comments_result = await db.query(
        `SELECT c.id, c.content, c.created_at, u.username, u.profile_picture 
         FROM comments c JOIN users u ON c.author_id = u.id 
         WHERE c.post_id = $1 ORDER BY c.created_at ASC`,
        [post.id]
      );
      post.comments = comments_result.rows;
    }

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

const create_post = async (req, res) => {
  const { content } = req.body;
  const user_id = req.session.user_id;
  try {
    const result = await db.query(
      `INSERT INTO posts (author_id, content) VALUES ($1, $2) RETURNING id, content, created_at`, 
      [user_id, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

const toggle_like = async (req, res) => {
  const post_id = req.params.id;
  const user_id = req.session.user_id;
  try {
    const existing = await db.query('SELECT * FROM likes WHERE user_id = $1 AND post_id = $2', [user_id, post_id]);
    if (existing.rows.length > 0) {
      await db.query('DELETE FROM likes WHERE user_id = $1 AND post_id = $2', [user_id, post_id]);
      res.json({ liked: false });
    } else {
      await db.query('INSERT INTO likes (user_id, post_id) VALUES ($1, $2)', [user_id, post_id]);
      res.json({ liked: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

const add_comment = async (req, res) => {
  const post_id = req.params.id;
  const user_id = req.session.user_id;
  const { content } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO comments (post_id, author_id, content) VALUES ($1, $2, $3) RETURNING id, content, created_at`, 
      [post_id, user_id, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  get_feed,
  create_post,
  toggle_like,
  add_comment,
};