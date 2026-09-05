const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/post_controller');
const { ensure_authenticated } = require('../middleware/auth_middleware');

router.get('/api/posts', ensure_authenticated, post_controller.get_feed);
router.post('/api/posts', ensure_authenticated, post_controller.create_post);
router.post('/api/posts/:id/like', ensure_authenticated, post_controller.toggle_like);
router.post('/api/posts/:id/comments', ensure_authenticated, post_controller.add_comment);

module.exports = router;