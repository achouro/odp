const express = require('express');
const router = express.Router();
const { signup, signin, get_session, logout } = require('../controllers/auth_controller');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/session', get_session);
router.post('/logout', logout);

module.exports = router;