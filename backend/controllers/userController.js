const userModel = require('../models/userModel');

const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
  const { name, contactDetails, role, password } = req.body;

  try {
    const userId = await userModel.createUser(name, contactDetails, role, password);
    res.status(201).json({ userId, message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await userModel.getUserByName(name);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isPasswordValid = await userModel.comparePassword(password, user.password_hash);

    if (isPasswordValid) {
      const token = jwt.sign({ userId: user.user_id, role: user.role },"amar_secret");
      

      res.status(200).json({ token, user });
    } else {
      res.status(401).json({ message: 'Incorrect password.' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getUserBorrowedBooks = async (req, res) => {
  const userId = req.user.userId; // Assuming you have user information in req.user

  try {
    const borrowedBooks = await userModel.getUserBorrowedBooks(userId);
    res.status(200).json({ borrowedBooks });
  } catch (error) {
    console.error('Error getting user-specific borrowing details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getTotalBooksInLibrary = async (req, res) => {
  try {
    const totalBooks = await userModel.getTotalBooksInLibrary();
    res.status(200).json({ totalBooks });
  } catch (error) {
    console.error('Error getting total books in the library:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { registerUser, loginUser,getUserBorrowedBooks,getTotalBooksInLibrary };
