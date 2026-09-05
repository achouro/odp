const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/auth_controller');

router.post('/api/signin', auth_controller.signin);
router.post('/api/signup', auth_controller.signup);
router.get('/api/session', auth_controller.check_session);
router.post('/api/logout', auth_controller.logout);

module.exports = router;