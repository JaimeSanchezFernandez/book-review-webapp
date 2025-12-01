const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: [true, 'La puntuación es obligatoria'],
        min: 1,
        max: 5 // Limitamos la puntuación de 1 a 5 estrellas
    },
    comment: {
        type: String,
        required: [true, 'El comentario es obligatorio']
    },
    // Relación: ¿Quién escribió la reseña?
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Relación: ¿A qué libro pertenece la reseña?
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);