/////

export const CLEANUP = `
      DROP SCHEMA public CASCADE
`

export const CREATE_SCHEMA = `
      CREATE SCHEMA public
`
export const HANDLE_GRANTS = `
      GRANT ALL ON SCHEMA public TO postgres;
      GRANT ALL ON SCHEMA public TO public;
      COMMENT ON SCHEMA public IS 'standard public schema';
`

////////

export const CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users(
  id INT GENERATED ALWAYS AS IDENTITY,
  user_nickname VARCHAR(255) NOT NULL UNIQUE,
  user_name VARCHAR(255) NOT NULL,
  user_surname VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_phone VARCHAR(255) NOT NULL UNIQUE,
  user_adress VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
  )`

export const CREATE_ORDERS_TABLE = `CREATE TABLE IF NOT EXISTS orders(
      id INT GENERATED ALWAYS AS IDENTITY,
      user_id INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      shipping_type VARCHAR(255) NOT NULL,
      content TEXT,
      create_at DATE NOT NULL,
      update_at DATE NOT NULL,
      PRIMARY KEY(id),
      CONSTRAINT fk_user
            FOREIGN KEY(user_id) 
            REFERENCES users(id)
      )`

export const CREATE_PRODUCTS_TABLE = `CREATE TABLE IF NOT EXISTS products(
      id INT GENERATED ALWAYS AS IDENTITY,
      user_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      type VARCHAR(255),
      price FLOAT(4) NOT NULL,
      quantity INT,
      content TEXT,
      create_at DATE NOT NULL,
      update_at DATE NOT NULL,
      PRIMARY KEY(id),
      CONSTRAINT fk_user
            FOREIGN KEY(user_id) 
            REFERENCES users(id)
      )`

export const CREATE_PRODUCT_REVIEW_TABLE =`CREATE TABLE IF NOT EXISTS product_review(
      id INT GENERATED ALWAYS AS IDENTITY,
      product_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      rating INT NOT NULL,
      content TEXT,
      create_at DATE NOT NULL,
      update_at DATE NOT NULL,
      PRIMARY KEY(id),
      CONSTRAINT fk_product
            FOREIGN KEY(product_id) 
            REFERENCES products(id)
      )`

export const CREATE_CATEGORIES_TABLE =`CREATE TABLE IF NOT EXISTS categories(
      id INT GENERATED ALWAYS AS IDENTITY,
      title VARCHAR(255) NOT NULL,
      content TEXT,
      create_at DATE NOT NULL,
      update_at DATE NOT NULL,
      PRIMARY KEY(id)
      )`
      
export const CREATE_CATEGORY_PRODUCT_TABLE =`CREATE TABLE IF NOT EXISTS category_product(
      category_id INT NOT NULL,
      product_id INT NOT NULL,
      CONSTRAINT fk_category
            FOREIGN KEY(category_id)
            REFERENCES categories(id),
      CONSTRAINT fk_product
            FOREIGN KEY(product_id) 
            REFERENCES products(id)
      )`

export const CREATE_SHOPPING_CART_TABLE =`CREATE TABLE IF NOT EXISTS shopping_cart(
      id INT GENERATED ALWAYS AS IDENTITY,
      user_id INT NOT NULL,
      PRIMARY KEY(id),
      CONSTRAINT fk_user
            FOREIGN KEY(user_id) 
            REFERENCES users(id)
      )`

export const CREATE_SHOPPING_CART_ITEM_TABLE =`CREATE TABLE IF NOT EXISTS shopping_cart_item(
      id INT GENERATED ALWAYS AS IDENTITY,
      product_id INT NOT NULL,
      shopping_cart_id INT NOT NULL,
      price FLOAT(4) NOT NULL,
      quantity INT NOT NULL,
      PRIMARY KEY(id),
      CONSTRAINT fk_product
            FOREIGN KEY(product_id) 
            REFERENCES products(id),
      CONSTRAINT fk_shoppingcart
            FOREIGN KEY(shopping_cart_id)
            REFERENCES shopping_cart(id)
      )`
      
export const CREATE_RETURNS_TABLE =`CREATE TABLE IF NOT EXISTS returns(
      id INT GENERATED ALWAYS AS IDENTITY,
      user_id INT NOT NULL,
      order_id INT NOT NULL,
      product_id INT NOT NULL,
      PRIMARY KEY(id),
      CONSTRAINT fk_product
            FOREIGN KEY(product_id) 
            REFERENCES products(id),
      CONSTRAINT fk_user
            FOREIGN KEY(user_id)
            REFERENCES users(id),
      CONSTRAINT fk_order
            FOREIGN KEY(order_id)
            REFERENCES orders(id)
      )`

export const CREATE_COMPLAINTS_TABLE =`CREATE TABLE IF NOT EXISTS complaints(
      id INT GENERATED ALWAYS AS IDENTITY,
      user_id INT NOT NULL,
      order_id INT NOT NULL,
      product_id INT NOT NULL,
      reason TEXT,
      PRIMARY KEY(id),
      CONSTRAINT fk_product
            FOREIGN KEY(product_id) 
            REFERENCES products(id),
      CONSTRAINT fk_user
            FOREIGN KEY(user_id)
            REFERENCES users(id),
      CONSTRAINT fk_order
            FOREIGN KEY(order_id)
            REFERENCES orders(id)
      )`

export const CREATE_SUPPLIERS_TABLE =`CREATE TABLE IF NOT EXISTS suppliers(
      id INT GENERATED ALWAYS AS IDENTITY,
      supplier_name VARCHAR(255) NOT NULL UNIQUE,
      supplier_email VARCHAR(255) NOT NULL UNIQUE,
      supplier_phone VARCHAR(255) NOT NULL UNIQUE,
      supplier_adress VARCHAR(255) NOT NULL,
      PRIMARY KEY(id)
      )`
      
export const CREATE_SUPPLIES_DATA_TABLE =`CREATE TABLE IF NOT EXISTS supplies_data(
      id INT GENERATED ALWAYS AS IDENTITY,
      supplier_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT NOT NULL,
      PRIMARY KEY(id),
      CONSTRAINT fk_product
            FOREIGN KEY(product_id) 
            REFERENCES products(id),
      CONSTRAINT fk_supplier
            FOREIGN KEY(supplier_id)
            REFERENCES suppliers(id)
      )`
                 
      
export const INIT_ADMINS = `INSERT INTO users(user_name, user_password) 
      VALUES ('admin1', 'admin1'), 
      ('admin2', 'admin2')
      ON CONFLICT (user_name) DO NOTHING`


