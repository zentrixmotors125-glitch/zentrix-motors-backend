const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Cars API
app.get('/api/cars', (req, res) => {
  db.all('SELECT * FROM cars ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const cars = rows.map(r => ({ ...r, images: JSON.parse(r.images || '[]') }));
    res.json(cars);
  });
});

app.get('/api/cars/:id', (req, res) => {
  db.get('SELECT * FROM cars WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Car not found' });
    row.images = JSON.parse(row.images || '[]');
    res.json(row);
  });
});

// Admin add car
app.post('/api/admin/cars', upload.any(), (req, res) => {
  try {
    const { name, brand, price, stock, year, km_driven, fuel_type, transmission, owner_history, description } = req.body;
    const imagePaths = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];
    
    const sql = `INSERT INTO cars (name, brand, price, stock, year, km_driven, fuel_type, transmission, owner_history, description, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [name, brand, price, parseInt(stock)||1, year, km_driven, fuel_type, transmission, owner_history, description, JSON.stringify(imagePaths)];
    
    db.run(sql, params, function(err) {
      if (err) {
        console.error("DB INSERT ERROR:", err);
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, message: 'Car added successfully' });
    });
  } catch (err) {
    console.error("POST CATCH ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// Admin edit car
app.put('/api/admin/cars/:id', upload.any(), (req, res) => {
  const { name, brand, price, stock, year, km_driven, fuel_type, transmission, owner_history, description, existingImages } = req.body;
  
  let imagesToKeep = [];
  if (existingImages) {
    imagesToKeep = Array.isArray(existingImages) ? existingImages : [existingImages];
  }
  const newImagePaths = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];
  const finalImages = [...imagesToKeep, ...newImagePaths];

  const sql = `UPDATE cars SET name=?, brand=?, price=?, stock=?, year=?, km_driven=?, fuel_type=?, transmission=?, owner_history=?, description=?, images=? WHERE id=?`;
  const params = [name, brand, price, parseInt(stock)||0, year, km_driven, fuel_type, transmission, owner_history, description, JSON.stringify(finalImages), req.params.id];
  
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Car updated successfully' });
  });
});

app.delete('/api/admin/cars/:id', (req, res) => {
  db.run('DELETE FROM cars WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Car deleted' });
  });
});

// Enquiries API
app.post('/api/enquire', (req, res) => {
  const { carId, name, phone, message, carName } = req.body;
  
  const sql = `INSERT INTO enquiries (carId, name, phone, message) VALUES (?, ?, ?, ?)`;
  db.run(sql, [carId, name, phone, message], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    
    // Simulate WhatsApp API forwarding
    const adminPhone = '7974009478';
    console.log(`\n=== WHATSAPP SIMULATION ===`);
    console.log(`To: ${adminPhone}`);
    console.log(`Msg: New Car Inquiry:\nName: ${name}\nPhone: ${phone}\nCar: ${carName || 'Unknown'}\nMessage: ${message}`);
    console.log(`===========================\n`);

    res.status(201).json({ message: 'Enquiry sent successfully' });
  });
});

app.get('/api/admin/enquiries', (req, res) => {
  const sql = `
    SELECT e.*, c.name as carName 
    FROM enquiries e 
    LEFT JOIN cars c ON e.carId = c.id 
    ORDER BY e.createdAt DESC
  `;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Features API
app.get('/api/features', (req, res) => {
  const features = [
    {
      title: 'Premium Selection',
      description: 'Hand-picked luxury vehicles inspected by experts.',
      icon: 'verified',
      colorClass: 'bg-primary/10 text-primary'
    },
    {
      title: 'Fast Financing',
      description: 'Quick approval and flexible EMI options available.',
      icon: 'payments',
      colorClass: 'bg-blue-500/10 text-blue-500'
    },
    {
      title: 'Expert Support',
      description: '24/7 dedicated assistance for all your queries.',
      icon: 'support_agent',
      colorClass: 'bg-green-500/10 text-green-500'
    },
    {
      title: 'Secure Deals',
      description: 'Transparent documentation and verified ownership.',
      icon: 'security',
      colorClass: 'bg-purple-500/10 text-purple-500'
    }
  ];
  res.json(features);
});

// Services API
app.get('/api/services', (req, res) => {
  const services = [
    {
      title: 'Buy Your Dream Car',
      description: 'Explore our curated collection of premium pre-owned vehicles.',
      icon: 'directions_car'
    },
    {
      title: 'Sell Your Car',
      description: 'Get the best market value for your vehicle with instant payment.',
      icon: 'sell'
    },
    {
      title: 'Car Insurance',
      description: 'Comprehensive insurance plans tailored for luxury vehicles.',
      icon: 'description'
    },
    {
      title: 'Maintenance',
      description: 'Professional servicing and genuine spare parts support.',
      icon: 'build'
    }
  ];
  res.json(services);
});

// Add seed data if empty
app.get('/api/seed', (req, res) => {
  db.get('SELECT COUNT(*) as count FROM cars', [], (err, row) => {
    if (row.count === 0) {
      const sql = `INSERT INTO cars (name, brand, price, stock, year, km_driven, fuel_type, transmission, owner_history, description, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const dummyCar = ['Hyundai i20 Asta', 'Hyundai', '₹5,60,000', 1, '2020', '45,000 km', 'Petrol', 'Manual', '1st Owner', 'Pristine condition Hyundai i20. Single owner, fully serviced.', JSON.stringify(['https://lh3.googleusercontent.com/aida-public/AB6AXuBubHO85oAOyMiNfeCPkuO4c4AePwm23Czh5xDtaO9hudEOdEG7jbuDv1gNNs33H5OIESDq4bsgDCE2i-EIvJ2nTIajGf_pclS3htGc6NfcKo_SsisdPd8hpBuZkZR2a9MOj03ThexNSz0SV6zGrXMY-jmTauzTbxHV3h-fKKCLSrzsBty3G_aPap_kgawh-2SjvczNNNyYC-9gs2dplYx2SKHzAOrKK8y9LYhgHH9tIr3AfyXx_Fwpyg32D3SBpNPwUpCittFVK3y4'])];
      db.run(sql, dummyCar);
      res.json({ message: 'Seeded Hyundai i20' });
    } else {
      res.json({ message: 'Database already seeded' });
    }
  });
});

app.use((err, req, res, next) => {
  console.error("EXPRESS ERROR:", err);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Multer Error: ${err.message}` });
  }
  res.status(500).json({ error: err.message });
});

// ── Serve React frontend (production build) ──────────────────────────────────
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  // Catch-all: Express 5 compatible wildcard for React Router SPA
  app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
  console.log(`Serving frontend from ${frontendDist}`);
} else {
  console.log('Frontend dist not found — run "npm run build" in the frontend folder first.');
}

app.listen(PORT, () => {
  console.log(`Zentrix Motors running on http://localhost:${PORT}`);
});
