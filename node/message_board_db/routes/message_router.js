const { Router } = require('express');
const message_controller = require('../controllers/message_controller');

const message_router = Router();

message_router.get('/', message_controller.get_all_messages);
message_router.get('/new', message_controller.get_new_message_form);
message_router.post('/new', message_controller.create_message);
message_router.get('/message/:id', message_controller.get_message_by_id);

module.exports = message_router;