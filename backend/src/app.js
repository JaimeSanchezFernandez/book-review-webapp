const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');

// --- IMPORTAR RUTAS ---
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// 👉 Servir frontend estático (ajusta la ruta si tu carpeta se llama distinto)
app.use(express.static(path.join(__dirname, '..', '..', 'frontend')));

// --- USAR RUTAS API ---
app.use('/api/auth', authRoutes);      // Login y registro
app.use('/api/books', bookRoutes);     // Libros
app.use('/api/reviews', reviewRoutes); // Reseñas

// Ruta por defecto: enviar el index.html del frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor escuchando en: http://localhost:${PORT}`);
});


