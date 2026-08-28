const pool = require('./pool');

// ITEM QUERIES
async function get_all_items() {
  const { rows } = await pool.query(
    `SELECT 
       items.id, 
       items.name, 
       items.description, 
       items.price, 
       items.stock, 
       categories.name AS category_name 
     FROM items 
     LEFT JOIN categories ON items.category_id = categories.id 
     ORDER BY items.id ASC`
  );
  return rows;
}

async function get_item_by_id(id) {
  const { rows } = await pool.query(
    `SELECT items.*, categories.name AS category_name 
     FROM items 
     LEFT JOIN categories ON items.category_id = categories.id 
     WHERE items.id = $1`,
    [id]
  );
  return rows[0];
}

async function create_item({ name, description, price, stock, category_id }) {
  await pool.query(
    `INSERT INTO items (name, description, price, stock, category_id) 
     VALUES ($1, $2, $3, $4, $5)`,
    [name, description, price, stock, category_id || null]
  );
}

async function update_item(id, { name, description, price, stock, category_id }) {
  await pool.query(
    `UPDATE items 
     SET name = $1, description = $2, price = $3, stock = $4, category_id = $5 
     WHERE id = $6`,
    [name, description, price, stock, category_id || null, id]
  );
}

async function delete_item(id) {
  await pool.query('DELETE FROM items WHERE id = $1', [id]);
}

// CATEGORY QUERIES
async function get_all_categories() {
  const { rows } = await pool.query('SELECT * FROM categories ORDER BY name ASC');
  return rows;
}

async function get_category_by_id(id) {
  const { rows } = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
  return rows[0];
}

async function create_category({ name, description }) {
  await pool.query(
    'INSERT INTO categories (name, description) VALUES ($1, $2)',
    [name, description]
  );
}

async function get_items_by_category(category_id) {
  const { rows } = await pool.query('SELECT * FROM items WHERE category_id = $1', [category_id]);
  return rows;
}

async function update_category(id, { name, description }) {
  await pool.query(
    'UPDATE categories SET name = $1, description = $2 WHERE id = $3',
    [name, description, id]
  );
}

async function delete_category(id) {
  await pool.query('DELETE FROM categories WHERE id = $1', [id]);
}

module.exports = {
  get_all_items,
  get_item_by_id,
  create_item,
  update_item,
  delete_item,
  get_all_categories,
  get_category_by_id,
  create_category,
  get_items_by_category,
  update_category,
  delete_category,
};