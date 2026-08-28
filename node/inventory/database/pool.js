const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
  connectionString: process.env.DB_URL,
});

/*
const pool= new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST ,
  database: process.env.DB_NAME , 
  port: process.env.DB_PORT || 5432,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
});
*/
module.exports=pool;