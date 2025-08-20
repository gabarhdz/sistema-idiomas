const Lesson = require('../models/lessons');
const jwt = require('jsonwebtoken');

exports.getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().populate('user exercises');
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las lecciones', error });
  }
}
exports.getLessonById = async (req, res) => {
  const { id } = req.params;
  try {
    const lesson = await Lesson.findById(id).populate('user exercises');
    if (!lesson) {
      return res.status(404).json({ message: 'Lección no encontrada' });
    }
    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la lección', error });
  }
}

exports.createLesson = async (req, res) => {
  const { title, description, language, level, exercises } = req.body;

  if (!title || !description || !language || level === undefined || !exercises || exercises.length === 0) {
    return res.status(400).json({ 
      message: 'Los campos title, description, language, level y exercises son obligatorios' 
    });
  }

  try {
    const newLesson = new Lesson({ 
      title, 
      description,
      language,
      level,
      user: req.usuarioId, // Usar el ID del usuario del JWT
      exercises
    });
    
    await newLesson.save();
    
    res.status(201).json(newLesson);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la lección', error });
  }
}

exports.updateLesson = async (req, res) => {
  const { id } = req.params;
  const { title, description, language, level, exercises } = req.body;

  if (!title || !description || !language || level === undefined || !exercises || exercises.length === 0) {
    return res.status(400).json({ 
      message: 'Los campos title, description, language, level y exercises son obligatorios' 
    });
  }

  try {
    const selectedLesson = await Lesson.findById(id);
    if (selectedLesson.user.toString() !== req.usuarioId) {
      return res.status(403).json({ message: 'No tienes permiso para actualizar esta lección' });
    }
    const updatedLesson = await Lesson.findByIdAndUpdate(id, {
      title,
      description,
      language,
      level,
      exercises
    }, { new: true });

    if (!updatedLesson) {
      return res.status(404).json({ message: 'Lección no encontrada' });
    }

    res.status(200).json(updatedLesson);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la lección', error });
  }
}

exports.deleteLesson = async (req, res) => {
  const { id } = req.params;

  try {
    const selectedLesson = await Lesson.findById(id);
    
    if (!selectedLesson) {
      return res.status(404).json({ message: 'Lección no encontrada' });
    }

    if (selectedLesson.user.toString() !== req.usuarioId) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta lección ya que no eres el creador de la misma' });
    }

    await Lesson.findByIdAndDelete(id);
    res.status(200).json({ message: 'Lección eliminada correctamente' });
    
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la lección', error });
  }
}