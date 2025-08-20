const Usuario = require('../models/users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
require('dotenv').config();


exports.getUsers = async (req, res) => {
  try {
    const users = await Usuario.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
}

exports.createUser = async (req, res) => {

  console.log('req.body:', req.body);
  
  const { name, surname, profile_image, email, password } = req.body;
  
  if (!name || !surname || !email || !password) {
    return res.status(400).json({ 
      message: 'Los campos name, surname, email y password son obligatorios' 
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = new Usuario({ 
      name, 
      surname, 
      email, 
      profile_image, 
      password: hash 
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
}

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Usuario.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
}

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, surname, profile_image, email, password } = req.body;
  try {
    const user = await Usuario.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    user.name = name || user.name;
    user.surname = surname || user.surname;
    user.profile_image = profile_image || user.profile_image;
    user.email = email || user.email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Usuario.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;


    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const passwordOk = await bcrypt.compare(password, usuario.password);
    if (!passwordOk) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const datosToken = { id: usuario._id };
    const secreto = process.env.SECRETO;
    const opciones = { expiresIn: '1h' };
    const token = jwt.sign(datosToken, secreto, opciones);


    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};