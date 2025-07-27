// DFS: Middleware para verificar JWT y rol del usuario
const jwt = require('jsonwebtoken');
require('dotenv').config();

// DFS: Verifica si el token es válido
const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Token requerido' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;  // DFS: Guarda datos del usuario (id, rol) en la request
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token inválido' });
    }
};

// DFS: Verifica si el usuario es admin
const soloAdmin = (req, res, next) => {
    if (req.usuario.rol !== 'admin') {
        return res.status(403).json({ error: 'Acceso solo para admin' });
    }
    next();
};

// DFS: Verifica si el usuario es viewer
const soloViewer = (req, res, next) => {
    if (req.usuario.rol !== 'viewer') {
        return res.status(403).json({ error: 'Acceso solo para viewer' });
    }
    next();
};

module.exports = { verificarToken, soloAdmin, soloViewer };
