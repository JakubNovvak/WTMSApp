const express = require('express');
const router = express.Router();
const mainController = require('../Controllers/mainController');

router.get('/', mainController.showHomePage);
router.get('/calculate-salary', mainController.showSalaryPage);
router.get('/hours', mainController.showHoursPage);
router.get('/manage-shift', mainController.showShiftPage);

module.exports = router;