const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow cross-origin requests (important for React Native)
app.use(express.json()); // Parse incoming JSON data

// Basic Route
app.get('/', (req, res) => {
    res.send('Hello from the Express Serverrrrrrrrrrrrrr!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});