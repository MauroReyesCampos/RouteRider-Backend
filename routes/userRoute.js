const express = require('express');
const router = express.Router();

// importación de userController
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// rutas para el usuario
router.get('/', userController.getAllUsers);
router.get('/:email', userController.getUser);
router.post('/create', userController.createUser);
router.put('/update/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', authController.authenticateUser);

module.exports = router;