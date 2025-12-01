const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/authMiddleware'); // Importamos al portero

// Rutas Públicas (cualquiera puede ver)
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);

// Rutas Privadas (necesitas pasar por el middleware 'auth')
router.post('/', auth, bookController.createBook);

module.exports = router;