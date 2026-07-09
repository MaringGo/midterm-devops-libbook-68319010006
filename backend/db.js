const path = require('path');
const { Pool } = require('pg');

require('dotenv').config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const pool = new Pool({
  user: process.env.DB_USER || 'libuser',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'libdb',
  password: process.env.DB_PASSWORD || 'libpass',
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

// Auto-initialize table and populate mock data if empty
async function initializeDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS books (
      isbn VARCHAR(30) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      year INTEGER NOT NULL,
      status VARCHAR(50) NOT NULL CHECK (status IN ('พร้อมให้ยืม', 'ถูกยืม', 'ชำรุด')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL successfully!');
    
    // Create Table
    await client.query(createTableQuery);
    console.log('Table "books" verified/created.');

    // Check if table is empty
    const checkRes = await client.query('SELECT COUNT(*) FROM books;');
    const count = parseInt(checkRes.rows[0].count, 10);
    
    if (count === 0) {
      console.log('Table is empty. Inserting default library books...');
      const insertQuery = `
        INSERT INTO books (isbn, title, author, category, year, status) VALUES
        ('978-616-08-3000-0', 'คู่มือการใช้งาน Docker และ Kubernetes สำหรับนักพัฒนา', 'สมชาย รักดี', 'เทคโนโลยีและคอมพิวเตอร์', 2566, 'พร้อมให้ยืม'),
        ('978-616-08-4122-8', 'โครงสร้างข้อมูลและอัลกอริทึม (Data Structures & Algorithms)', 'ดร.สมเกียรติ ตั้งใจ', 'เทคโนโลยีและคอมพิวเตอร์', 2565, 'ถูกยืม'),
        ('978-974-228-345-1', 'ประวัติศาสตร์เอเชียตะวันออกเฉียงใต้ร่วมสมัย', 'สุรพงษ์ วิเศษ', 'ประวัติศาสตร์และสังคม', 2564, 'พร้อมให้ยืม'),
        ('978-616-18-2029-9', 'จักรวาลในหนึ่งอะตอม (The Universe in a Single Atom)', 'องค์ทะไลลามะ', 'วิทยาศาสตร์และคณิตศาสตร์', 2563, 'ชำรุด'),
        ('978-616-93068-0-1', 'คิดแบบย้อนศร (Reverse Thinking)', 'วิกรม กรมดิษฐ์', 'อื่นๆ', 2567, 'พร้อมให้ยืม'),
        ('978-0-13-235088-4', 'Clean Code: A Handbook of Agile Software Craftsmanship', 'Robert C. Martin', 'เทคโนโลยีและคอมพิวเตอร์', 2008, 'พร้อมให้ยืม');
      `;
      await client.query(insertQuery);
      console.log('Default books inserted successfully.');
    }
    
    client.release();
  } catch (err) {
    console.error('Database initialization failed:', err.message);
  }
}

// Trigger initial setup
initializeDatabase();

module.exports = pool;
