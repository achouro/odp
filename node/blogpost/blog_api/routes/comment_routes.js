const express = require('express');
const router = express.Router({ mergeParams: true });
const passport = require('passport');
const {
  get_comments_by_post,
  create_comment,
  delete_comment
} = require('../controllers/comment_controller');

const optional_jwt = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (user) req.user = user;
    next();
  })(req, res, next);
};

router.get('/', get_comments_by_post);
router.post('/', optional_jwt, create_comment);
router.delete('/:comment_id', passport.authenticate('jwt', { session: false }), delete_comment);

module.exports = router;