const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/tasks', (req, res) => {
  const { status, priority_level, title } = req.query; 
  let query = 'SELECT * FROM tasks WHERE 1=1';
  const params = [];

  if (status) {
    query += ' AND status = ?';
    params.push(status === 'completed' ? 1 : 0);
  }

  if (priority_level) {
    query += ' AND priority_level = ?';
    params.push(priority_level);
  }

  if (title) {
    query += ' AND title LIKE ?';
    params.push(`%${title}%`);
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post('/tasks', (req, res) => {
  const { title, description, priority_level } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" }); 

  const query = 'INSERT INTO tasks (title, description, priority_level) VALUES (?, ?, ?)';
  db.query(query, [title, description, priority_level], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: result.insertId, title, priority_level });
  });
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, priority_level, status } = req.body;

  const sql = "UPDATE tasks SET title = ?, description = ?, priority_level = ?, status = ? WHERE id = ?";
  db.query(sql, [title, description, priority_level, status, id], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Tarefa atualizada!");
  });
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted successfully" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));