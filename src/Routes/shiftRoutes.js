const express = require('express');
const router = express.Router();
const shiftController = require('../Controllers/shiftController');
const authMiddleware = require('../Middleware/authMiddleware');

// Endpoint do tworzenia użytkownika
router.post('/', shiftController.addNewShift);
router.get('/user/:userId', shiftController.getAllUserShifts);
router.get('/loggedIn/:shiftsDate', shiftController.getLoggedInDateShifts);
router.post('/start', authMiddleware.isLoggedIn, shiftController.startCurrentShift);
router.post('/end', authMiddleware.isLoggedIn, shiftController.endCurrentShift);
router.post('/viewForm', authMiddleware.isLoggedIn, shiftController.showUpdatedShiftsPage);

module.exports = router;