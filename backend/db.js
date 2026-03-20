const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Use __dirname to ensure the DB file is found relative to the function in Netlify
const dbPath = path.resolve(__dirname, 'zentrix.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('CRITICAL DB ERROR: Error connecting to database:', err.message);
    // Try read-only if read-write fails (common in serverless)
    if (err.code === 'SQLITE_CANTOPEN' || err.message.includes('readonly')) {
       console.log('Attempting to connect in READONLY mode...');
       return new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);
    }
  } else {
    console.log('Successfully connected to the SQLite database at:', dbPath);
  }
});

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS cars (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      brand TEXT,
      price TEXT NOT NULL,
      stock INTEGER NOT NULL DEFAULT 1,
      year TEXT,
      km_driven TEXT,
      fuel_type TEXT,
      transmission TEXT,
      owner_history TEXT,
      description TEXT,
      images TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      carId INTEGER,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      message TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (carId) REFERENCES cars(id)
    )
  `);
});

module.exports = db;
