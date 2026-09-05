const express = require('express');
const session = require('express-session');
const cors = require('cors');

const auth_routes = require('./routes/auth_routes');
const user_routes = require('./routes/user_routes');
const conversation_routes = require('./routes/conversation_routes');
const message_routes = require('./routes/message_routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'super_secret_messaging_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use('/api/auth', auth_routes);
app.use('/api/users', user_routes);
app.use('/api/conversations', conversation_routes);
app.use('/api/messages', message_routes);

app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});