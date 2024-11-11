const express = require('express');
const router = express.Router();
const salaryController = require('../Controllers/salaryController');
const authMiddleware = require('../Middleware/authMiddleware');

router.get('/calculate-salary', authMiddleware.isLoggedIn, salaryController.showSalaryCalculatorPage);
router.get('/calculate-salary/:selectedMonth', authMiddleware.isLoggedIn, salaryController.calculateSalary);

module.exports = router;