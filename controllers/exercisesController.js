const Exercise = require('../models/exercises');
const jwt = require('jsonwebtoken');

exports.getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los ejercicios', error });
  }
}

exports.getExercisesById = async (req, res) => {
    const { id } = req.params;
  try {
    const exercises = await Exercise.findById(id);
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los ejercicios', error });
  }
}

exports.createExercise = async (req, res) => {
  const { title, instruction, options, answer } = req.body;

  // Corregir la validación (había una coma en lugar de &&)
  if (!title || !instruction || !options || options.length === 0 || answer === undefined) {
    return res.status(400).json({ 
      message: 'Los campos title, instruction, options y answer son obligatorios' 
    });
  }

  try {
    const newExercise = new Exercise({ 
      title, 
      instruction,
      options,
      answer,
      user: req.usuarioId // Usar el ID del usuario del JWT
    });
    
    await newExercise.save();
    
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el ejercicio', error });
  }
}
exports.updateExercise = async (req, res) => {
  const { id } = req.params;
  const { title, instruction, options, answer } = req.body;

  if (!title || !instruction || !options || options.length === 0 || answer === undefined) {
    return res.status(400).json({ 
      message: 'Los campos title, instruction, options y answer son obligatorios' 
    });
  }

  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(id, { 
      title, 
      instruction,
      options,
      answer
    }, { new: true });

    if (!updatedExercise) {
      return res.status(404).json({ message: 'Ejercicio no encontrado' });
    }

    res.status(200).json(updatedExercise);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el ejercicio', error });
  }
}

exports.deleteExercise = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExercise = await Exercise.findByIdAndDelete(id);

    if (!deletedExercise) {
      return res.status(404).json({ message: 'Ejercicio no encontrado' });
    }

    res.status(200).json({ message: 'Ejercicio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el ejercicio', error });
  }
}