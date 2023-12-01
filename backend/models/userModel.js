const bcrypt = require('bcrypt');
const connection = require('../config/database');

const createUser = async (name, contactDetails, role, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await connection.promise().query(
      'INSERT INTO Users (name, contact_details, role, password_hash) VALUES (?, ?, ?, ?)',
      [name, contactDetails, role, hashedPassword]
    );

    return result.insertId;
  } catch (error) {
    throw error;
  }
};

const getUserByName = async (name) => {
  try {
    const [rows] = await connection.promise().query(
      'SELECT * FROM Users WHERE name = ?',
      [name]
    );

    return rows[0];
  } catch (error) {
    throw error;
  }
};

const comparePassword = async (enteredPassword, hashedPassword) => {
  return bcrypt.compare(enteredPassword, hashedPassword);
};

const getUserBorrowedBooks = async (userId) => {
  try {
    const [rows] = await connection
      .promise()
      .query('SELECT * FROM Transactions WHERE user_id = ?', [userId]);

    return rows;
  } catch (error) {
    throw error;
  }
};

const getTotalBooksInLibrary = async () => {
  try {
    const [rows] = await connection.promise().query('SELECT *  FROM Books');

    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser, getUserByName, comparePassword,getUserBorrowedBooks,getTotalBooksInLibrary };
