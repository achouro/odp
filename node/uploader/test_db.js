require('dotenv').config();
const { Client } = require('pg');

// Sanitize string for console log to hide password
const connectionString = process.env.DATABASE_URL;
const sanitizedUrl = connectionString 
  ? connectionString.replace(/:([^:@]+)@/, ':****@') 
  : 'NOT FOUND IN .ENV';

console.log('Testing connection with:', sanitizedUrl);

const client = new Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false },
});

async function testConnection() {
  try {
    await client.connect();
    console.log('✅ Success! Connected directly to Supabase.');
    const res = await client.query('SELECT current_database(), current_user, NOW();');
    console.log('Query result:', res.rows[0]);
  } catch (err) {
    console.error('❌ Database connection failed:');
    console.error('Code:', err.code);
    console.error('Message:', err.message);
  } finally {
    await client.end();
  }
}

testConnection();