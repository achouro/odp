const express = require('express');
const router = express.Router();
const conversation_controller = require('../controllers/conversation_controller');

router.get('/', conversation_controller.get_conversations);
router.post('/', conversation_controller.create_conversation);

module.exports = router;