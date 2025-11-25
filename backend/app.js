const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Cargar variables de entorno
const connectDB = require('./config/db'); // Importar la conexión a la base de datos

// --- 1. Conectar a MongoDB ---
// Ejecutamos la función de conexión antes de iniciar el servidor
connectDB();

// --- 2. Crear la App ---
const app = express();

// --- 3. Middlewares ---
app.use(cors());       // Permite al frontend acceder a este servidor
app.use(express.json()); // Permite recibir datos en formato JSON (necesario para POST/PUT)

// --- 4. Rutas ---
// Ruta principal de prueba
app.get('/', (req, res) => {
    res.send('API de Reseñas de Libros funcionando correctamente 📚');
});

// (Más adelante importaremos aquí las rutas de usuarios, libros y reseñas)

// --- 5. Iniciar el Servidor ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Servidor escuchando en: http://localhost:${PORT}`);
});