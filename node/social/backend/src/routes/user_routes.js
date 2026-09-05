const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller');
const { ensure_authenticated } = require('../middleware/auth_middleware');

router.get('/api/users', ensure_authenticated, user_controller.get_users_index);
router.get('/api/users/:id', ensure_authenticated, user_controller.get_profile);
router.post('/api/users/:id/follow', ensure_authenticated, user_controller.send_follow_request);
router.delete('/api/users/:id/unfollow', ensure_authenticated, user_controller.unfollow_user);

module.exports = router;