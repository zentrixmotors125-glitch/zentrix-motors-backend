const FormData = require('form-data');
async function run() {
  try {
    const form = new FormData();
    form.append('name', 'Test Car from Node');
    form.append('images', 'some string'); // Append text field named 'images'
    
    // Test fetch against the running backend server
    const res = await fetch('http://localhost:5000/api/admin/cars', {
      method: 'POST',
      body: form
    });
    const text = await res.text();
    console.log(res.status, text.substring(0, 500));
  } catch (err) {
    console.error("ERROR:");
    console.error(err);
  }
}
run();
