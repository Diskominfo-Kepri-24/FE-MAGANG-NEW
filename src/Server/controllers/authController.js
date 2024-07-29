const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.register = async (req, res) => {
  const { role, nama, email, password, tanggal_mulai, tanggal_akhir, jenis_kelamin, jurusan, asal_sekolah } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      role,
      nama,
      email,
      password: hashedPassword,
      tanggal_mulai: role === 'Peserta Magang' ? tanggal_mulai : null,
      tanggal_akhir: role === 'Peserta Magang' ? tanggal_akhir : null,
      jenis_kelamin: role === 'Peserta Magang' ? jenis_kelamin : null,
      jurusan: role === 'Peserta Magang' ? jurusan : null,
      asal_sekolah: role === 'Peserta Magang' ? asal_sekolah : null
    };

    db.query('INSERT INTO users SET ?', user, (err, result) => {
      if (err) {
        return res.status(400).send('Error registering user');
      }
      res.status(201).send('User registered successfully');
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(400).send('Cannot find user');

    const user = results[0];

    try {
      if (await bcrypt.compare(password, user.password)) {
        req.session.userId = user.id;
        req.session.role = user.role;
        res.status(200).send('Login successful');
      } else {
        res.status(400).send('Not allowed');
      }
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
};
