const express = require('express');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

const auth_routes = require('./routes/auth_routes');
const post_routes = require('./routes/post_routes');
const user_routes = require('./routes/user_routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
  })
);

app.use(auth_routes);
app.use(post_routes);
app.use(user_routes);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});