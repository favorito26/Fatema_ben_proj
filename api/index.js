const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Set up EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));  // Adjusted path for Vercel

// Serve static files
app.use(express.static(path.join(__dirname, '../public'))); // Adjusted path for Vercel

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const FILE_PATH = './data.txt';

// Render the input page
app.get('/admin', (req, res) => {
    let content = '';
    if (fs.existsSync(FILE_PATH)) {
        content = fs.readFileSync(FILE_PATH, 'utf-8');
    }
    res.render('input', { content });
});

// Save or update the text
app.post('/save', (req, res) => {
    const userInput = req.body.userInput || '';
    console.log(req.body);  // Debugging the request body
    if (!userInput) {
        return res.status(400).send("Input cannot be empty");
    }
    try {
        fs.writeFileSync(FILE_PATH, userInput, 'utf-8');
        res.redirect('/');
    } catch (error) {
        console.error("Error writing to file", error);
        res.status(500).send("Internal server error");
    }
});

// Display the saved text
app.get('/', (req, res) => {
    let content = '';
    if (fs.existsSync(FILE_PATH)) {
        content = fs.readFileSync(FILE_PATH, 'utf-8');
    }
    res.render('display', { content });
});

// Start the server (for local development only, Vercel doesn't use this)
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
