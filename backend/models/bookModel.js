const connection = require('../config/database');

const addBook = async (userId,title, author, genre, ISBN, quantityAvailable) => {
    try {
        // Check if the user is an admin
        const isAdmin = await checkUserRole(userId, 'admin');
    
        if (isAdmin) {
          const [result] = await connection.promise().query(
            'INSERT INTO Books (title, author, genre, ISBN, quantity_available) VALUES (?, ?, ?, ?, ?)',
            [title, author, genre, ISBN, quantityAvailable]
          );
    
          return result.insertId;
        } else {
          throw new Error('User does not have permission to add books.');
        }
      } catch (error) {
        throw error;
      }
    };
    


const updateBook = async (userId, bookId, title, author, genre, ISBN, quantityAvailable) => {
  try {
    // Check if the user is an admin
    const isAdmin = await checkUserRole(userId, 'admin');

    if (isAdmin) {
      await connection.promise().query(
        'UPDATE Books SET title = ?, author = ?, genre = ?, ISBN = ?, quantity_available = ? WHERE book_id = ?',
        [title, author, genre, ISBN, quantityAvailable, bookId]
      );
    } else {
      throw new Error('User does not have permission to update books.');
    }
  } catch (error) {
    throw error;
  }
};

const deleteBook = async (userId, bookId) => {
  try {
    // Check if the user is an admin
    const isAdmin = await checkUserRole(userId, 'admin');

    if (isAdmin) {
      await connection.promise().query('DELETE FROM Books WHERE book_id = ?', [bookId]);
    } else {
      throw new Error('User does not have permission to delete books.');
    }
  } catch (error) {
    throw error;
  }
};

const checkUserRole = async (userId, role) => {
  try {
    const [rows] = await connection.promise().query(
      'SELECT role FROM Users WHERE user_id = ?',
      [userId]
    );

    return rows.length > 0 && rows[0].role === role;
  } catch (error) {
    throw error;
  }
};

module.exports = { addBook, updateBook, deleteBook };
