const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- REGISTRO DE USUARIO ---
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Comprobar si ya existe el usuario
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // 2. Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Crear y guardar usuario
    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    // 4. Generar token igual que en login
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        return res.status(201).json({
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// --- INICIO DE SESIÓN (LOGIN) ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // 2. Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // 3. Generar Token JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        return res.json({
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
