const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const authMiddleware = require('../Middleware/authMiddleware');

router.get('/', authMiddleware.isAdmin, adminController.showHomePage);
router.get('/manageUsers', authMiddleware.isAdmin, adminController.showManageUserPage);
router.post('/editUser/:userId', authMiddleware.isAdmin, adminController.editUser);
router.get('/addUser', authMiddleware.isAdmin, adminController.showAddUserPage);
router.post('/addUser', authMiddleware.isAdmin, adminController.addNewUser);
router.get('/manageShifts/:userId?', authMiddleware.isAdmin, adminController.showManageShiftsPage);
router.post('/manageShifts/:userId', authMiddleware.isAdmin, adminController.showManageShiftsPage);
router.post('/manageShifts/editShift/:shiftId', authMiddleware.isAdmin, adminController.editShift);

module.exports = router;