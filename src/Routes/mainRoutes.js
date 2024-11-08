const express = require('express');
const router = express.Router();
const mainController = require('../Controllers/mainController');
const authMiddleware = require('../Middleware/authMiddleware');

// --- public routes
router.get('/login', mainController.showLoginPage);

//--- logged in routes
router.get('/', authMiddleware.isLoggedIn, mainController.showHomePage);
router.get('/calculate-salary', authMiddleware.isLoggedIn, mainController.showSalaryPage);
router.get('/hours', authMiddleware.isLoggedIn, mainController.showHoursPage);
router.get('/manage-shift', authMiddleware.isLoggedIn, mainController.showShiftPage);

module.exports = router;