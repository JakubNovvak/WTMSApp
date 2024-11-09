const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Endpoint do tworzenia użytkownika
router.get('/users', userController.getAllUsers);
router.post('/users', userController.addUser);

module.exports = router;