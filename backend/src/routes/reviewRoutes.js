const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/authMiddleware');

// Solo usuarios registrados pueden comentar
router.post('/', auth, reviewController.addReview);

module.exports = router;