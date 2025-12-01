const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Versión JS de la librería del PDF (pág 24)
const jwt = require('jsonwebtoken'); // Librería del PDF (pág 41)

// --- REGISTRO DE USUARIO ---
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 1. Validar si ya existe el usuario
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // 2. Encriptar contraseña (Hashing - Pág 24 PDF)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Crear y guardar usuario
        user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: 'Usuario registrado con éxito' });

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

        // 2. Comparar contraseñas (Pág 24 PDF)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // 3. Generar Token JWT (Pág 41 PDF)
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        // Firmamos el token con nuestra clave secreta
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }, // Caduca en 1 hora
            (err, token) => {
                if (err) throw err;
                res.json({ token }); // Enviamos el token al frontend
            }
        );

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};