const Review = require('../models/Review');

// Creamos un objeto controlador
const reviewController = {};

// POST /api/reviews  → crear reseña
reviewController.addReview = async (req, res) => {
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
    console.error(error);
    res.status(500).json({ message: 'Error al publicar la reseña' });
  }
};

// GET /api/reviews/book/:bookId  → obtener reseñas de un libro
reviewController.getReviewsByBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const reviews = await Review.find({ book: bookId })
      .populate('user', 'username email')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las reseñas' });
  }
};

module.exports = reviewController;
