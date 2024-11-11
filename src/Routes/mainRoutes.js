//"Main Routing" manages all the views in the application

const express = require('express');
const router = express.Router();
const mainController = require('../Controllers/mainController');
const authMiddleware = require('../Middleware/authMiddleware');

// --- publiczne
router.get('/login', mainController.showLoginPage);

//--- dla zalogowanych
router.get('/', authMiddleware.isLoggedIn, mainController.showHomePage);
router.get('/shifts', authMiddleware.isLoggedIn, mainController.showHoursPage);
router.get('/manage-shift', authMiddleware.isLoggedIn, mainController.showShiftPage);

module.exports = router;