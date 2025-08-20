const express = require('express');
const app = express();
const connectDB = require('./config/db');
connectDB();
app.get('/', (req, res) => {
    res.send('Hello, world!');
}); 

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


