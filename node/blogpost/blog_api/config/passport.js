const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: jwt_payload.sub } });
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

const require_author = (req, res, next) => {
  if (req.user && req.user.is_author) {
    return next();
  }
  return res.status(403).json({ error: 'Unauthorized: Author privileges required' });
};

module.exports = {
  passport,
  require_author
};