// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT,
      isChecked BOOLEAN,
      userId TEXT
  )`);
});

// API Endpoints

// Fetch all todos for a user
app.get('/api/todos/:userId', (req, res) => {
    const { userId } = req.params;
    db.all('SELECT * FROM todos WHERE userId = ?', [userId], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Add a new todo
app.post('/api/todos', (req, res) => {
    const { text, isChecked, userId } = req.body;
    const stmt = db.prepare('INSERT INTO todos (text, isChecked, userId) VALUES (?, ?, ?)');
    stmt.run(text, isChecked, userId, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, text, isChecked, userId });
    });
    stmt.finalize();
});

// Update an existing todo
app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const { text, isChecked, userId } = req.body;
    const stmt = db.prepare('UPDATE todos SET text = ?, isChecked = ? WHERE id = ? AND userId = ?');
    stmt.run(text, isChecked, id, userId, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id, text, isChecked, userId });
    });
    stmt.finalize();
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM todos WHERE id = ?", id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'Deleted successfully' });
  });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
