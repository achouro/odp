const ensure_authenticated = (req, res, next) => {
  if (req.session && req.session.user_id) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized' });
};

module.exports = {
  ensure_authenticated,
};