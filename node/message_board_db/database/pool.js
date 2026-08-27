require('dotenv').config();
const { Pool } = require('pg');

module.exports = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    })
  : new Pool({
      host: process.env.DB_HOST ,
      user: process.env.DB_USER ,
      database: process.env.DB_NAME ,
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 5432,
    });