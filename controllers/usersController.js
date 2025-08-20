const Usuario = require('../models/user');


exports.getUsers = async (req, res) => {
  try {
    const users = await Usuario.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
}

exports.createUser = async (req, res) => {
  const { name,surname,profile_image, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = new Usuario({ name,surname, email, profile_image, password: hash });
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
  const { name,surname,profile_image, email, password } = req.body;
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
    const { email, clave } = req.body;
    
    // 1. Buscar al usuario por email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' }); // No se encontró el email
    }
    // 2. Verificar la contraseña con bcrypt.compare
    const passwordOk = await bcrypt.compare(clave, usuario.clave);
    if (!passwordOk) {
      return res.status(401).json({ error: 'Credenciales inválidas' }); // Contraseña incorrecta
    }
    
    // 3. Credenciales válidas: Generar token JWT
    const datosToken = { id: usuario._id };            // Podemos incluir datos en el token (p.ej. el ID de usuario)
    const secreto = 'SECRETO_SUPER_SEGUR0';            // Clave secreta para firmar el token (en producción, mantener en una variable de entorno)
    const opciones = { expiresIn: '1h' };              // El token expirará en 1 hora
    const token = jwt.sign(datosToken, secreto, opciones);
    
    // 4. Enviar el token al cliente
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};