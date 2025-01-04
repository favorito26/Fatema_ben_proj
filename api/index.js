const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

// Update views path to work in Vercel's environment
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
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

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
