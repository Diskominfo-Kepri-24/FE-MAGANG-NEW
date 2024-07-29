const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'portal_magang'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Endpoint untuk mendapatkan informasi pengguna berdasarkan email
app.post('/api/v1/getUser', (req, res) => {
  const { email } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
