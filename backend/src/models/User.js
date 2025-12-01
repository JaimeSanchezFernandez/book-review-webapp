const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // No puede haber dos usuarios con el mismo nombre
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Por favor ingrese un correo válido'] // Validación simple de formato email
    },
    password: {
        type: String,
        required: true
        // Aquí se guardará el hash (la contraseña encriptada), no el texto plano (Pág. 21 del PDF)
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Solo permitimos estos dos roles (Pág. 53 del PDF)
        default: 'user'
    }
}, {
    timestamps: true // Esto crea automáticamente campos: createdAt y updatedAt
});

module.exports = mongoose.model('User', userSchema);