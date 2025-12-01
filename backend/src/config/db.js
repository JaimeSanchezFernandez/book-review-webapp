const mongoose = require('mongoose');

// Esta función es la que llamaremos desde app.js para iniciar la conexión
const connectDB = async () => {
    try {
        // Intentamos conectar usando la dirección que guardaremos en el archivo .env
        // Si no hay .env, usa la local por defecto
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bookreviews');

        console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error al conectar a MongoDB: ${error.message}`);
        // Si falla, apagamos el servidor porque sin base de datos no podemos trabajar
        process.exit(1);
    }
};

module.exports = connectDB;