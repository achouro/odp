const express = require('express');
const router = express.Router();
const passport = require('passport');
const { require_author } = require('../config/passport');
const {
  get_posts,
  get_post_by_id,
  create_post,
  update_post,
  delete_post
} = require('../controllers/post_controller');

// Optional JWT middleware (attaches user if token exists, but doesn't block guests)
const optional_jwt = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (user) req.user = user;
        next();
    })(req, res, next);
};

// Reusable custom auth middleware
const requireAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ error: 'Unauthorized' });
        req.user = user;
        next();
    })(req, res, next);
};

// Routes (Assuming this router is mounted on /api/posts in app.js)
router.get('/', optional_jwt, get_posts);
router.get('/:id', optional_jwt, get_post_by_id);
router.post('/', requireAuth, create_post);
router.put('/:id', requireAuth, require_author, update_post);
router.delete('/:post_id', requireAuth, require_author, delete_post);

module.exports = router;