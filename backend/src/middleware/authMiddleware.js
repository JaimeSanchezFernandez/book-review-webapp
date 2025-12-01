const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // 1. ¿Trae el usuario un token en la cabecera?
    const token = req.header('x-auth-token'); 
    // NOTA: A veces se usa 'Authorization: Bearer token', pero para simplificar usaremos 'x-auth-token' 
    // o podemos adaptarlo para usar Bearer como en el PDF:

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
         return res.status(401).json({ message: 'No hay token, permiso denegado' });
    }

    // Sacamos el token quitando la palabra "Bearer "
    const tokenReal = authHeader.split(' ')[1];

    try {
        // 2. Comprobamos si el token es válido usando nuestra palabra secreta
        const decoded = jwt.verify(tokenReal, process.env.JWT_SECRET);
        
        // 3. Si es válido, guardamos los datos del usuario en la petición
        req.user = decoded.user;
        next(); // ¡Adelante!
    } catch (error) {
        res.status(401).json({ message: 'Token no válido' });
    }
};