// src/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authenticateUser = require('../utils/verifyToken');

// Transaction routes
router.post('/borrow', authenticateUser, transactionController.borrowBook);
router.post('/return', authenticateUser, transactionController.returnBook);

module.exports = router;
