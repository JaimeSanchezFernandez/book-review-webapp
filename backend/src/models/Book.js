const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'El autor es obligatorio'],
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        default: 'https://via.placeholder.com/150' // Imagen genérica si no suben una
    },
    // Relación: Guardamos el ID del usuario que creó este libro
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);