const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateUser = require('../utils/verifyToken');

// User registration route
router.post('/register', userController.registerUser);

// User login route
router.post('/login', userController.loginUser);

router.get('/user/borrowed-books',authenticateUser, userController.getUserBorrowedBooks);

router.get('/admin/total-books', userController.getTotalBooksInLibrary);



module.exports = router;
