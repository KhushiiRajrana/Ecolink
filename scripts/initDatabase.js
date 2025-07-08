const mysql = require("mysql2/promise")
require("dotenv").config()

async function initDatabase() {
  let connection

  try {
    // Connect to MySQL server (without database)
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
    })

    console.log("Connected to MySQL server")

    // Create database if it doesn't exist
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || "ecolink_plus"}`)
    console.log("Database created/verified")

    // Use the database
    await connection.execute(`USE ${process.env.DB_NAME || "ecolink_plus"}`)

    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        address TEXT,
        role ENUM('customer', 'admin', 'shopkeeper') DEFAULT 'customer',
        rewards_points INT DEFAULT 0,
        wallet_balance DECIMAL(10,2) DEFAULT 0.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Create returns table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS returns (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        item_name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        condition_reported ENUM('excellent', 'good', 'fair', 'poor') NOT NULL,
        condition_actual ENUM('excellent', 'good', 'fair', 'poor'),
        description TEXT,
        estimated_value DECIMAL(10,2),
        actual_value DECIMAL(10,2),
        quality_grade ENUM('A', 'B', 'C', 'D'),
        photos JSON,
        status ENUM('pending', 'reviewed', 'approved', 'rejected', 'offered', 'sold') DEFAULT 'pending',
        admin_notes TEXT,
        shopkeeper_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (shopkeeper_id) REFERENCES users(id)
      )
    `)

    // Create donations table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS donations (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        item_name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        condition_reported ENUM('excellent', 'good', 'fair', 'poor') NOT NULL,
        condition_actual ENUM('excellent', 'good', 'fair', 'poor'),
        size VARCHAR(20),
        description TEXT,
        photos JSON,
        status ENUM('pending', 'reviewed', 'approved', 'rejected', 'distributed') DEFAULT 'pending',
        ngo_id INT,
        admin_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (ngo_id) REFERENCES ngos(id)
      )
    `)

    // Create NGOs table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ngos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        contact_person VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(20),
        address TEXT,
        focus_area VARCHAR(255),
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create products table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        original_price DECIMAL(10,2),
        condition_grade ENUM('A', 'B', 'C', 'D'),
        size VARCHAR(20),
        photos JSON,
        shopkeeper_id INT,
        return_id INT,
        donation_id INT,
        status ENUM('available', 'sold', 'reserved') DEFAULT 'available',
        views_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (shopkeeper_id) REFERENCES users(id),
        FOREIGN KEY (return_id) REFERENCES returns(id),
        FOREIGN KEY (donation_id) REFERENCES donations(id)
      )
    `)

    // Create shopkeeper_offers table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS shopkeeper_offers (
        id INT PRIMARY KEY AUTO_INCREMENT,
        return_id INT NOT NULL,
        shopkeeper_id INT NOT NULL,
        offer_price DECIMAL(10,2) NOT NULL,
        notes TEXT,
        status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (return_id) REFERENCES returns(id),
        FOREIGN KEY (shopkeeper_id) REFERENCES users(id)
      )
    `)

    // Create transactions table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        type ENUM('return', 'donation', 'purchase', 'reward') NOT NULL,
        points INT DEFAULT 0,
        amount DECIMAL(10,2) DEFAULT 0.00,
        description TEXT,
        reference_id INT,
        reference_type VARCHAR(50),
        status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `)

    // Insert sample data
    console.log("Inserting sample data...")

    // Sample admin user
    await connection.execute(`
      INSERT IGNORE INTO users (email, password, name, role) VALUES 
      ('admin@ecolink.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin User', 'admin'),
      ('shopkeeper@test.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Test Shopkeeper', 'shopkeeper'),
      ('customer@test.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Test Customer', 'customer')
    `)

    // Sample NGOs
    await connection.execute(`
      INSERT IGNORE INTO ngos (name, contact_person, email, phone, address, focus_area) VALUES 
      ('Hope Foundation', 'John Doe', 'contact@hope.org', '9876543210', '123 Main St, City', 'Education & Clothing'),
      ('Care Society', 'Jane Smith', 'info@care.org', '9876543211', '456 Oak Ave, City', 'Women & Children'),
      ('Community Help', 'Bob Johnson', 'help@community.org', '9876543212', '789 Pine Rd, City', 'General Welfare')
    `)

    console.log("Database initialization completed successfully!")
  } catch (error) {
    console.error("Database initialization failed:", error)
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}

initDatabase()
