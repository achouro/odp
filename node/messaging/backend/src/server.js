const express = require('express');
const session = require('express-session');
const cors = require('cors');

const auth_routes = require('./routes/auth_routes');
const user_routes = require('./routes/user_routes');
const conversation_routes = require('./routes/conversation_routes');
const message_routes = require('./routes/message_routes');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. CORS Configuration (Must allow credentials for cookies)
app.use(cors({
  origin: 'http://localhost:5173', // Adjust to match your frontend URL if different
  credentials: true
}));

// 2. Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Session Middleware Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'super_secret_messaging_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS in production
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// 4. Register Routes
app.use('/api/auth', auth_routes);
app.use('/api/users', user_routes);
app.use('/api/conversations', conversation_routes);
app.use('/api/messages', message_routes);

// 5. Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});