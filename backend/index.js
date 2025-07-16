const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'calendar_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao MySQL!');
});

app.use(cors());
app.use(bodyParser.json());

app.get('/api/items', (req, res) => {
  const { date } = req.query;

  let sql = 'SELECT * FROM items';
  let params = [];

  if (date) {
    sql += ' WHERE DATE(date) = ?';
    params.push(date);
  }

  sql += ' ORDER BY date, start_time';

  console.log('SQL:', sql, 'PARAMS:', params);

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.get('/api/items/:id', (req, res) => {
  db.query('SELECT * FROM items WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(results[0]);
  });
});

app.post('/api/items', (req, res) => {
  const { type, title, description, date, start_time, end_time, completed } = req.body;
  db.query(
    'INSERT INTO items (type, title, description, date, start_time, end_time, completed) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [type, title, description, date, start_time, end_time || null, completed ? 1 : 0],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, ...req.body });
    }
  );
});

app.put('/api/items/:id', (req, res) => {
  const { type, title, description, date, start_time, end_time, completed } = req.body;
  db.query(
    'UPDATE items SET type=?, title=?, description=?, date=?, start_time=?, end_time=?, completed=? WHERE id=?',
    [type, title, description, date, start_time, end_time || null, completed ? 1 : 0, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: req.params.id, ...req.body });
    }
  );
});

app.delete('/api/items/:id', (req, res) => {
  db.query('DELETE FROM items WHERE id=?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
