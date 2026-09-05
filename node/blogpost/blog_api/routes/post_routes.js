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

const optional_jwt = passport.authenticate('jwt', { session: false, failWithError: false }, (req, res, next) => {
  next();
});

router.get('/', get_posts);
router.get('/:post_id', optional_jwt, get_post_by_id);
router.post('/', passport.authenticate('jwt', { session: false }), require_author, create_post);
router.put('/:post_id', passport.authenticate('jwt', { session: false }), require_author, update_post);
router.delete('/:post_id', passport.authenticate('jwt', { session: false }), require_author, delete_post);

module.exports = router;