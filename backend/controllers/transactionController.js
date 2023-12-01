// src/controllers/transactionController.js
const transactionModel = require('../models/transactionModel');

const borrowBook = async (req, res) => {
  const { userId, bookId, borrowDate, returnDate } = req.body;

  try {
    const transactionId = await transactionModel.borrowBook(userId, bookId, borrowDate, returnDate);
    res.status(201).json({ transactionId, message: 'Book borrowed successfully.' });
  } catch (error) {
    console.error('Error borrowing book:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const returnBook = async (req, res) => {
  const { userId, bookId, returnDate } = req.body;

  try {
    const lateFee = await transactionModel.returnBook(userId, bookId, returnDate);
    res.status(200).json({ lateFee, message: 'Book returned successfully.' });
  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { borrowBook, returnBook };
