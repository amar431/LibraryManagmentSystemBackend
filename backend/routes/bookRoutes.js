const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authenticateUser = require('../utils/verifyToken');

// Book routes
router.post('/add', authenticateUser, bookController.addBook);
router.put('/update', authenticateUser, bookController.updateBook);
router.delete('/delete/:bookId', authenticateUser, bookController.deleteBook);

module.exports = router;
