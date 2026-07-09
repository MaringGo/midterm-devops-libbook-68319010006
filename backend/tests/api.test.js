const request = require('supertest');
const app = require('../index');
const pool = require('../db');

// Mock PostgreSQL pool query
jest.mock('../db', () => {
  return {
    query: jest.fn()
  };
});

describe('Library API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: GET /health (Healthy State)
  it('GET /health should return 200 OK and connected status', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ 1: 1 }] });
    
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'OK');
    expect(res.body.services).toHaveProperty('database', 'connected');
  });

  // Test 2: GET /api/books (Returns book list)
  it('GET /api/books should return list of books', async () => {
    const mockBooks = [
      { isbn: '978-1-23-456789-0', title: 'Test Book 1', author: 'Author 1', category: 'อื่นๆ', year: 2025, status: 'พร้อมให้ยืม' }
    ];
    pool.query.mockResolvedValueOnce({ rows: mockBooks });

    const res = await request(app).get('/api/books');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('isbn', '978-1-23-456789-0');
    expect(res.body[0].title).toBe('Test Book 1');
  });

  // Test 3: POST /api/books (Validation failure)
  it('POST /api/books should fail with 400 if required fields are missing', async () => {
    const incompleteBook = {
      isbn: '978-1-23-456789-0',
      title: 'Incomplete Book'
      // author, category, year, status missing
    };

    const res = await request(app)
      .post('/api/books')
      .send(incompleteBook);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
  });

  // Test 4: POST /api/books (Success creation)
  it('POST /api/books should create a book successfully', async () => {
    const newBook = {
      isbn: '978-6-16-083000-0',
      title: 'Test New Book',
      author: 'Author New',
      category: 'เทคโนโลยีและคอมพิวเตอร์',
      year: 2568,
      status: 'พร้อมให้ยืม'
    };

    // Mock unique ISBN check: empty rows (no duplicate found)
    pool.query.mockResolvedValueOnce({ rows: [] });
    // Mock insert query returning the new book
    pool.query.mockResolvedValueOnce({ rows: [newBook] });

    const res = await request(app)
      .post('/api/books')
      .send(newBook);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('isbn', '978-6-16-083000-0');
    expect(res.body.title).toBe('Test New Book');
  });
});
