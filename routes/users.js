const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const verificarToken = require('../security/auth');

// Route to get all users
router.get('/', usersController.getUsers); 
router.post('/', usersController.createUser); // Route to create a new user
router.get('/:id', usersController.getUserById); // Route to get a user by ID
router.put('/:id', usersController.updateUser); // Route to update a user by ID
router.delete('/:id', usersController.deleteUser); // Route to delete a user by ID
router.post('/login', usersController.login); // Route for user login

module.exports = router;