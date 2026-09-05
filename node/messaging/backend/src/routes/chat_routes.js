const express = require('express');
const router = express.Router();
const chat_controller = require('../controllers/chat_controller');
const { ensure_authenticated } = require('../middleware/auth_middleware');

router.get('/api/conversations', ensure_authenticated, chat_controller.get_conversations);
router.post('/api/conversations', ensure_authenticated, chat_controller.start_conversation);
router.get('/api/conversations/:id/messages', ensure_authenticated, chat_controller.get_messages);
router.post('/messages', chat_controller.send_message);

module.exports = router;