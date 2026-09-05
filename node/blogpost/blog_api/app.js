//@prisma/client bcryptjs cors dotenv express jsonwebtoken passport passport-jwt
const express = require('express');
const cors = require('cors');
const { passport } = require('./config/passport');

const auth_routes = require('./routes/auth_routes');
const post_routes = require('./routes/post_routes');
const comment_routes = require('./routes/comment_routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.json({ message: 'Blog API is running' });
});

app.use('/api/auth', auth_routes);
app.use('/api/posts', post_routes);
app.use('/api/posts/:post_id/comments', comment_routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});