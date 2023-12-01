// src/models/transactionModel.js
const connection = require('../config/database');

const borrowBook = async (userId, bookId, borrowDate, returnDate) => {
  try {
     // Check if the user has already borrowed the specified book
     const [existingBorrow] = await connection
     .promise()
     .query('SELECT * FROM Transactions WHERE user_id = ? AND book_id = ?', [userId, bookId]);

   if (existingBorrow.length > 0) {
     throw new Error('User has already borrowed this book.');
   }

   // Check if the user has borrowed any other books
   const [otherBorrows] = await connection
     .promise()
     .query('SELECT * FROM Transactions WHERE user_id = ?', [userId]);

   // Assuming the user can borrow multiple books simultaneously, you may adjust this limit
   const maxBooksAllowed = 5;

   if (otherBorrows.length >= maxBooksAllowed) {
     throw new Error(`User has already borrowed the maximum allowed books (${maxBooksAllowed}).`);
   }

   // Proceed with borrowing the book
    const [result] = await connection.promise().query(
      'INSERT INTO Transactions (user_id, book_id, borrow_date, return_date) VALUES (?, ?, ?, ?)',
      [userId, bookId, borrowDate, returnDate]
    );

    await updateBookQuantity(bookId, -1);

    return result.insertId;
  } catch (error) {
    throw error;
  }
};

const returnBook = async (userId, bookId, returnDate) => {
  try {
    const [result] = await connection.promise().query(
      'SELECT borrow_date FROM Transactions WHERE user_id = ? AND book_id = ?',
      [userId, bookId]
    );

    if (result.length === 0) {
      throw new Error('Book not borrowed by the user.');
    }

    const borrowDate = result[0].borrow_date;
    const lateFee = calculateLateFee(borrowDate, returnDate);
    console.log(lateFee)

    await connection.promise().query(
      'UPDATE Transactions SET return_date = ?, late_fee = ? WHERE user_id = ? AND book_id = ?',
      [returnDate, lateFee, userId, bookId]
    );

    await updateBookQuantity(bookId, 1);

    return lateFee;
  } catch (error) {
    throw error;
  }
};

const calculateLateFee = (borrowDate, returnDate) => {
    // Convert the borrowDate and returnDate to Date objects
    const borrowDateObj = new Date(borrowDate);
    const returnDateObj = new Date(returnDate);
  
    // Calculate the difference in days
    const daysDifference = (returnDateObj - borrowDateObj) / (1000 * 60 * 60 * 24);
  
    // If the book is returned within 10 days, late fee is 0
    if (daysDifference <= 10) {
      console.log("hi")
      return 0.00;
    }
  
    // If the book is returned after 10 days, late fee is 30 rupees
    return 30.00;
  };

  const updateBookQuantity = async (bookId, quantityChange) => {
    try {
      const [result] = await connection
        .promise()
        .query('UPDATE Books SET quantity_available = quantity_available + ? WHERE book_id = ?', [
          quantityChange,
          bookId,
        ]);
  
      return result;
    } catch (error) {
      throw error;
    }
  };
  
  

module.exports = { borrowBook, returnBook };
