const express = require('express');
const router = express.Router();
const salaryController = require('../Controllers/salaryController');
const authMiddleware = require('../Middleware/authMiddleware');

router.get('/download-csv/:userId/:month', authMiddleware.isLoggedIn, salaryController.downloadMonthlyShiftCsv);
router.get('/download-json/:userId/:month', authMiddleware.isLoggedIn, salaryController.downloadMonthlyShiftJson);

module.exports = router;