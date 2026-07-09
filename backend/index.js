const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper function to clean ISBN strings (strip hyphens and whitespaces)
function cleanISBN(isbn) {
  return isbn ? isbn.replace(/[-\s]/g, '') : '';
}

// Validator for printing year (Buddhist Era vs Common Era)
function isValidYear(year) {
  const y = parseInt(year, 10);
  if (isNaN(y)) return false;
  
  const currentCE = new Date().getFullYear();
  const currentBE = currentCE + 543;

  if (y > 2300) {
    return y >= 2400 && y <= (currentBE + 1);
  } else {
    return y >= 1800 && y <= (currentCE + 1);
  }
}

// ==========================================================================
// API ENDPOINTS
// ==========================================================================

// 1. Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check DB status
    await pool.query('SELECT 1');
    return res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      services: {
        api: 'healthy',
        database: 'connected'
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      services: {
        api: 'healthy',
        database: 'disconnected',
        error: err.message
      }
    });
  }
});

// 2. GET /api/books - Get books list with filters, searching, and sorting
app.get('/api/books', async (req, res) => {
  const { search, category, status, sortBy } = req.query;
  
  let queryText = 'SELECT * FROM books WHERE 1=1';
  const queryParams = [];
  let paramCount = 1;

  // Search filter (searches title, author, isbn)
  if (search) {
    const rawSearch = cleanISBN(search);
    queryText += ` AND (LOWER(title) LIKE LOWER($${paramCount}) OR LOWER(author) LIKE LOWER($${paramCount}) OR REPLACE(REPLACE(isbn, '-', ''), ' ', '') LIKE $${paramCount + 1})`;
    queryParams.push(`%${search}%`);
    queryParams.push(`%${rawSearch}%`);
    paramCount += 2;
  }

  // Category filter
  if (category && category !== 'all') {
    queryText += ` AND category = $${paramCount}`;
    queryParams.push(category);
    paramCount++;
  }

  // Status filter
  if (status && status !== 'all') {
    queryText += ` AND status = $${paramCount}`;
    queryParams.push(status);
    paramCount++;
  }

  // Sorting
  let orderClause = ' ORDER BY created_at DESC'; // default
  if (sortBy) {
    if (sortBy === 'isbn') {
      orderClause = ' ORDER BY REPLACE(REPLACE(isbn, \'-\', \'\'), \' \', \'\') ASC';
    } else if (sortBy === 'title') {
      orderClause = ' ORDER BY title COLLATE "C" ASC';
    } else if (sortBy === 'year-desc') {
      orderClause = ' ORDER BY year DESC';
    } else if (sortBy === 'year-asc') {
      orderClause = ' ORDER BY year ASC';
    }
  }
  queryText += orderClause;

  try {
    const result = await pool.query(queryText, queryParams);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. POST /api/books - Create a new book entry
app.post('/api/books', async (req, res) => {
  const { isbn, title, author, category, year, status } = req.body;

  // Basic Validation
  if (!isbn || !title || !author || !category || !year || !status) {
    return res.status(400).json({ error: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' });
  }

  // ISBN Format check
  const cleaned = cleanISBN(isbn);
  if (cleaned.length !== 10 && cleaned.length !== 13) {
    return res.status(400).json({ error: 'รหัส ISBN ต้องมีความยาว 10 หรือ 13 หลักเท่านั้น' });
  }

  // Year check
  if (!isValidYear(year)) {
    return res.status(400).json({ error: 'ปีที่พิมพ์ไม่ถูกต้อง (พ.ศ. 2400-2600 หรือ ค.ศ. 1800-2100)' });
  }

  // Status check
  const allowedStatuses = ['พร้อมให้ยืม', 'ถูกยืม', 'ชำรุด'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'สถานะของหนังสือไม่ถูกต้อง' });
  }

  try {
    // Unique ISBN check
    const checkDup = await pool.query(
      'SELECT isbn FROM books WHERE REPLACE(REPLACE(isbn, \'-\', \'\'), \' \', \'\') = $1',
      [cleaned]
    );
    if (checkDup.rows.length > 0) {
      return res.status(400).json({ error: 'รหัสทะเบียน/ISBN นี้ได้รับการลงทะเบียนในระบบแล้ว' });
    }

    // Insert Book
    const insertQuery = `
      INSERT INTO books (isbn, title, author, category, year, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const result = await pool.query(insertQuery, [isbn, title, author, category, parseInt(year, 10), status]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. PUT /api/books/:isbn - Update book properties
app.put('/api/books/:isbn', async (req, res) => {
  const { isbn } = req.params;
  const { title, author, category, year, status } = req.body;

  // Basic Validation
  if (!title || !author || !category || !year || !status) {
    return res.status(400).json({ error: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' });
  }

  // Year check
  if (!isValidYear(year)) {
    return res.status(400).json({ error: 'ปีที่พิมพ์ไม่ถูกต้อง (พ.ศ. 2400-2600 หรือ ค.ศ. 1800-2100)' });
  }

  // Status check
  const allowedStatuses = ['พร้อมให้ยืม', 'ถูกยืม', 'ชำรุด'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'สถานะของหนังสือไม่ถูกต้อง' });
  }

  try {
    // Update query
    const updateQuery = `
      UPDATE books
      SET title = $1, author = $2, category = $3, year = $4, status = $5
      WHERE isbn = $6
      RETURNING *;
    `;
    const result = await pool.query(updateQuery, [title, author, category, parseInt(year, 10), status, isbn]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'ไม่พบหนังสือเล่มที่ต้องการแก้ไข' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. DELETE /api/books/:isbn - Delete book entry
app.delete('/api/books/:isbn', async (req, res) => {
  const { isbn } = req.params;

  try {
    const result = await pool.query('DELETE FROM books WHERE isbn = $1 RETURNING *', [isbn]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'ไม่พบข้อมูลหนังสือเล่มที่ต้องการลบ' });
    }
    res.json({ message: 'ลบข้อมูลหนังสือสำเร็จ', deletedBook: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server (Avoid starting when running tests to prevent EADDRINUSE)
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Backend API Server running on port ${PORT}`);
  });
}

module.exports = app;
