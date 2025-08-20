const express = require('express');
const router = express.Router();
const exercisesController = require('../controllers/exercisesController');
const { verificarToken } = require('../security/auth');

// Route to get all exercises
router.get('/', verificarToken, exercisesController.getExercises);
router.get('/:id', verificarToken, exercisesController.getExercisesById); // Route to get an exercise by ID
router.post('/', verificarToken, exercisesController.createExercise); // Route to create a new exercise
router.put('/:id', verificarToken, exercisesController.updateExercise); // Route to update an exercise
router.delete('/:id', verificarToken, exercisesController.deleteExercise); // Route to delete an exercise

module.exports = router;