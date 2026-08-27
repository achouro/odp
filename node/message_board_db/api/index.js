const path = require('path');
const express = require('express');
const message_router = require('../routes/message_router');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Mount the message routes
app.use('/', message_router);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;