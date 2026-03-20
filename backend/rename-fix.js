const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const uploadDir = path.join(__dirname, 'uploads');
const dbPath = path.resolve(__dirname, 'zentrix.db');
const db = new sqlite3.Database(dbPath);

const files = fs.readdirSync(uploadDir).filter(f => f.startsWith('WhatsApp Image 2026-03-17'));
const newImagePaths = [];

files.forEach((file, index) => {
  const newName = `i20_asta_${index + 1}.jpeg`;
  const oldPath = path.join(uploadDir, file);
  const newPath = path.join(uploadDir, newName);
  
  fs.renameSync(oldPath, newPath);
  newImagePaths.push(`/uploads/${newName}`);
  console.log(`Renamed: ${file} -> ${newName}`);
});

db.serialize(() => {
  const sql = "UPDATE cars SET images = ? WHERE name = 'Hyundai i20 Asta' AND year = '2018'";
  db.run(sql, [JSON.stringify(newImagePaths)], function(err) {
    if (err) {
      console.error('Error updating DB:', err.message);
    } else {
      console.log(`✅ Updated ${this.changes} row(s) with ${newImagePaths.length} renamed images.`);
    }
    db.close();
  });
});
