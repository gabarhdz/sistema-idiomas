const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/db');
const usersRouter = require('./routes/users');
const exercisesRouter = require('./routes/exercises');
const lessonsRouter = require('./routes/lessons');
connectDB();


app.use(express.json()); 

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.send('Hello, world!');
}); 


app.use('/api/users', usersRouter);  
app.use('/api/exercises', exercisesRouter);
app.use('/api/lessons', lessonsRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});