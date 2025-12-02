const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/authMiddleware');

// Solo usuarios registrados pueden comentar
router.post('/', auth, reviewController.addReview);

// 👇 NUEVO: cualquier usuario puede ver las reseñas de un libro
// GET /api/reviews/book/:bookId
router.get('/book/:bookId', reviewController.getReviewsByBook);

module.exports = router;
