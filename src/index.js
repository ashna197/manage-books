const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// Middleware
app.use(bodyParser.json());

require('./database/dbConnection')

// API routes
app.use('/books', require('./routes/booksRoutes'));
app.use((req, res) => {
    return res.status(404).json({ message: "PAGE NOT FOUND" })
});

const port = process.env.PORT || 5080;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 
