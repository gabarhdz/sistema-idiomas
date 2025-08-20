const mongoose = require('mongoose');
require('dotenv').config();

const db_url= process.env.DB_PASSWORD;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, options);
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ Error de conexión:', err);
  }
};