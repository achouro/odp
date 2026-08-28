CREATE TABLE IF NOT EXISTS categories( 
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL,
    description TEXT);

CREATE TABLE IF NOT EXISTS items( 
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, 
    description TEXT, 
    price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    stock INT NOT NULL DEFAULT 0,
    category_id INT REFERENCES categories(id) ON DELETE CASCADE);

INSERT INTO categories (name, description) VALUES
    ('Electronics', 'Gadgets and tech accessories'),
    ('Books', 'Hard-copy books, novels, and guides');
 
INSERT INTO items (name, description, price, stock, category_id) VALUES
    ('Wireless Mouse', 'Ergonomic 2.4GHz wireless optical mouse', 24.99, 45, 1),
    ('Mechanical Keyboard', 'RGB backlight mechanical keyboard', 79.99, 20, 1),
    ('Clean Code', 'A Handbook of Agile Software Craftsmanship', 32.50, 15, 2);