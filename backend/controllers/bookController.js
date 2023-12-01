const bookModel = require('../models/bookModel');

const addBook = async (req, res) => {
  const { title, author, genre, ISBN, quantityAvailable } = req.body;
  const userId = req.user.userId;

  try {
    const bookId = await bookModel.addBook(userId,title, author, genre, ISBN, quantityAvailable);
    res.status(201).json({ bookId, message: 'Book added successfully.' });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateBook = async (req, res) => {
  const userId = req.user.userId; // Assuming you have user information in the request

  const { bookId, title, author, genre, ISBN, quantityAvailable } = req.body;

  try {
    await bookModel.updateBook(userId, bookId, title, author, genre, ISBN, quantityAvailable);
    res.status(200).json({ message: 'Book updated successfully.' });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteBook = async (req, res) => {
  const userId = req.user.userId; // Assuming you have user information in the request
  const bookId = req.params.bookId;

  try {
    await bookModel.deleteBook(userId, bookId);
    res.status(200).json({ message: 'Book deleted successfully.' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { addBook, updateBook, deleteBook };
