const express = require('express');
const connection = require('./config/database.js');
const userRoutes = require('./routes/userRoutes.js');
const bookRoutes = require('./routes/bookRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const dotenv = require('dotenv')
dotenv.config()

const app = express();

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to the database');
  });

// Parse JSON request bodies
app.use(express.json());


// Define routes (we'll add more later)


app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/transactions', transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
