const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); // 1. Import the mysql2 library

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger to help debug
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// 2. Create the Database Connection
const db = mysql.createConnection({
    host: 'localhost',      // XAMPP is running locally
    user: 'root',           // Default XAMPP MySQL username
    password: '',           // Default XAMPP MySQL password is empty
    database: 'react_native_db' // database name you created in Step 1
});

// 3. Connect to the Database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('✅ Connected to MySQL database successfully!');
});

// Basic Route
app.get('/', (req, res) => {
    res.send('Hello from the Expres Server!');
});
// Get all users
app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
// Create a new user
app.post('/users', (req, res) => {
    // 1. Log what we received (To verify data is arriving)
    console.log("POST /users received:", req.body);

    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    const values = [req.body.name, req.body.email];

    db.query(sql, values, (err, data) => {
        if (err) {
            // 2. Log the critical SQL error
            console.error("SQL Error:", err);
            // 3. Return it as JSON so the app doesn't get "<!DOCTYPE html>"
            return res.status(500).json({ error: err.message, sqlMessage: err.sqlMessage });
        }
        return res.json({ message: "User added successfully", id: data.insertId });
    });
});


// Start Server
app.listen(PORT, 'localhost', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// 404 Catch-all (to prevent HTML responses)
app.use((req, res) => {
    res.status(404).json({ error: "Route not found", path: req.url });
});