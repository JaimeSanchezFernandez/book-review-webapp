const express = require('express');
const cors = require('cors');
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

// --- USAR RUTAS ---
app.use('/api/auth', authRoutes);     // Login y registro
app.use('/api/books', bookRoutes);    // Libros
app.use('/api/reviews', reviewRoutes); // Reseñas

app.get('/', (req, res) => res.send('API Funcionando 🚀'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Servidor escuchando en: http://localhost:${PORT}`);
});
