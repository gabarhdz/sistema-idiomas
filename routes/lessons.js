const express = require('express');
const router = express.Router();
const lessonsController = require('../controllers/lessonsController');
const { verificarToken } = require('../security/auth');

router.get('/',verificarToken, lessonsController.getLessons);
router.get('/:id',verificarToken, lessonsController.getLessonById); // Route to get a lesson by ID
router.post('/', lessonsController.createLesson); // Route to create a new lesson
router.put('/:id',verificarToken, lessonsController.updateLesson); // Route to update a lesson 
router.delete('/:id',verificarToken, lessonsController.deleteLesson); // Route to delete a lesson