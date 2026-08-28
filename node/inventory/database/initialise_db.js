const fs = require('fs');
const path = require('path');
const pool = require('./pool');

async function init_db() {
  try {
    const schema_path = path.join(__dirname, 'schema.sql');
    const sql_script = fs.readFileSync(schema_path, 'utf8');

    console.log('Initializing database tables and seed data...');
    await pool.query(sql_script);
    console.log('Database successfully initialized!');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    await pool.end();
  }
}

init_db();