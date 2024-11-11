const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Endpoint do tworzenia użytkownika
router.get('/', userController.getAllUsers);
router.post('/', userController.addUser);
router.get('/:username', userController.getUserId);

module.exports = router;