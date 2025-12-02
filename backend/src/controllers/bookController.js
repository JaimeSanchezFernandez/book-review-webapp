// src/controllers/bookController.js

const Book = require('../models/Book');

// Obtener todos los libros
exports.getBooks = async (req, res) => {
  try {
    // Traemos username y email del creador
    const books = await Book.find().populate('user', 'username email');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener libros' });
  }
};

// Crear un libro nuevo
exports.createBook = async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      coverImage: req.body.coverImage,
      user: req.user.id,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear libro', error });
  }
};

// Obtener un libro por ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      'user',
      'username email'
    );
    if (!book)
      return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};
