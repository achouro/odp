const express = require('express');
const authentication_controller = require('../controllers/authentication_controller');
const { ensure_authentication, ensure_guest } = require('../middleware/authentication');

const router = express.Router();

router.get('/login', ensure_guest, (req, res) => {
    res.render('auth/login');
});

router.get('/register', ensure_guest, (req, res) => {
    res.render('auth/register'); 
});

router.post('/register', ensure_guest, authentication_controller.register);
router.post('/login', ensure_guest, authentication_controller.login);
router.post('/logout', ensure_authentication, authentication_controller.logout);
router.get('/me', ensure_authentication, authentication_controller.get_me);

module.exports = router;