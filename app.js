const express = require('express');
const app = express();
const connectDB = require('./config/db');
const usersRouter = require('./routes/users');
connectDB();
app.get('/', (req, res) => {
    res.send('Hello, world!');
}); 

const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api/users', usersRouter); // Use the users router for /api/users endpoint 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


