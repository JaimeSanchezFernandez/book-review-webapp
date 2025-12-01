const Review = require('../models/Review.js');

exports.addReview = async (req, res) => {
    try {
        const { bookId, rating, comment } = req.body;

        // Verificar si el usuario ya escribió una reseña para este libro
        const existingReview = await Review.findOne({ 
            book: bookId, 
            user: req.user.id 
        });

        if (existingReview) {
            return res.status(400).json({ message: 'Ya has valorado este libro' });
        }

        const newReview = new Review({
            book: bookId,
            user: req.user.id, // ID del usuario autenticado
            rating,
            comment
        });

        await newReview.save();
        res.status(201).json(newReview);

    } catch (error) {
        res.status(500).json({ message: 'Error al publicar la reseña' });
    }
};