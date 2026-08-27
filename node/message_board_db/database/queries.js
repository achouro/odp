const pool = require('./pool');

async function get_all_messages() {
  const { rows } = await pool.query('SELECT id, username AS user, text, added AS date FROM messages ORDER BY added DESC');
  return rows;
}

async function get_message_by_id(id) {
  const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1', [id]);
  return rows[0];
}

async function insert_message(username, text) {
  await pool.query(
    'INSERT INTO messages (username, text) VALUES ($1, $2)',
    [username, text]
  );
}
async function delete_message(id) {
  await pool.query('DELETE FROM messages WHERE id = $1', [id]);

}
module.exports = {
  get_all_messages,
  get_message_by_id,
  insert_message,
};