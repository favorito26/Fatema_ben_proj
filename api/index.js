const express = require('express');
const path = require('path');
const app = express();

// Set up EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));  // Adjusted path for Vercel

// Serve static files
app.use(express.static(path.join(__dirname, '../public'))); // Adjusted path for Vercel

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Temporary in-memory storage
let inMemoryData = '';

// Render the input page
app.get('/admin', (req, res) => {
    res.render('input', { content: inMemoryData });
});

// Save or update the text
app.post('/save', (req, res) => {
    const userInput = req.body.userInput || '';
    console.log(req.body);  // Debugging the request body
    if (!userInput) {
        return res.status(400).send("Input cannot be empty");
    }
    
    // Store the input in memory
    inMemoryData = userInput;

    res.redirect('/');
});

// Display the saved text
app.get('/', (req, res) => {
    res.render('display', { content: inMemoryData });
});

// Start the server (for local development only, Vercel doesn't use this)
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
