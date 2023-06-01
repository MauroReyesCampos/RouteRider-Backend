const express = require('express');
const router = express.Router();

// importación de userController
const commentController = require('../controllers/commentController');

// rutas para el usuario
router.get('/', commentController.getAllComment);
router.post('/', commentController.createUserComment);
router.put('/:id', commentController.updateUserComment);
router.delete('/:id', commentController.deleteUserComment);

module.exports = router;