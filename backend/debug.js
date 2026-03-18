app.post('/api/admin/cars/debug', (req, res, next) => {
  const multer = require('multer')();
  const upload = multer.any(); // Accept anything to see what it is
  upload(req, res, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    console.log("DEBUG POST BODY:", req.body);
    console.log("DEBUG POST FILES:", req.files);
    res.json({ ok: true });
  });
});
