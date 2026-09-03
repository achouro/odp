require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const methodOverride = require('method-override'); // Added for DELETE/PUT forms

const prisma = require('./config/database');
const initialise_passport = require('./config/passport');

const authentication_routes = require('./routes/authentication_routes');
const folder_routes = require('./routes/folder_routes');
const file_routes = require('./routes/file_routes');

const express_layouts = require('express-ejs-layouts');

const express_session = session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false, 
    cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 },
    store: new PrismaSessionStore(prisma, { checkPeriod: 2 * 60 * 1000, dbRecordIdIsSessionId: true })
});

const app = express();

initialise_passport(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Enables ?_method=DELETE or ?_method=PUT in HTML forms

app.use(express_layouts);
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');

app.use(express_session);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

app.get('/', (request, response) => {
    if (request.isAuthenticated()) {
        return response.redirect('/dashboard');
    }
    return response.redirect('/auth/login');
});

// Mounted at root so GET /dashboard and folder endpoints resolve correctly
app.use('/', folder_routes); 
app.use('/auth', authentication_routes);
app.use('/files', file_routes);

app.get('/login', (req, res) => res.redirect('/auth/login'));
app.get('/register', (req, res) => res.redirect('/auth/register'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});