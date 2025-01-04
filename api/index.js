const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

// Set up EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));  // Adjusted path for Vercel

// Serve static files
app.use(express.static(path.join(__dirname, '../public'))); // Adjusted path for Vercel

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

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
    fs.writeFileSync(FILE_PATH, userInput, 'utf-8');
    res.redirect('/');
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
