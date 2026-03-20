const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'zentrix.db'));
db.get('SELECT * FROM cars WHERE name LIKE "%i20%"', (err, row) => {
  if (err) {
    console.error(err);
  } else if (row) {
    console.log('SUCCESS: Found ' + row.name);
    console.log('ID:', row.id);
    console.log('Price:', row.price);
    console.log('Images:', row.images);
  } else {
    console.log('FAILED: Car not found in zentrix.db');
  }
  db.close();
});
