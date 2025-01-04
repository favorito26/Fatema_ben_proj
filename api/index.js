const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// In-memory store for data (for Vercel)
let content = '';

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Render the input page
app.get('/admin', (req, res) => {
    res.render('input', { content });
});

// Save or update the text
app.post('/save', (req, res) => {
    content = req.body.userInput || '';
    res.redirect('/');
});

// Display the saved text
app.get('/', (req, res) => {
    res.render('display', { content });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
