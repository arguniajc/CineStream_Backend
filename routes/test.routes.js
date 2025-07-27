const express = require('express');
const router = express.Router();
const { verificarToken, soloAdmin, soloViewer } = require('../middlewares/auth.middleware');

// DFS: Ruta solo para admin
router.get('/admin', verificarToken, soloAdmin, (req, res) => {
    res.json({ mensaje: 'Hola Admin, acceso concedido' });
});

// DFS: Ruta solo para viewer
router.get('/viewer', verificarToken, soloViewer, (req, res) => {
    res.json({ mensaje: 'Hola Viewer, acceso concedido' });
});

// DFS: Ruta para cualquier usuario autenticado
router.get('/usuario', verificarToken, (req, res) => {
    res.json({ mensaje: `Hola ${req.usuario.rol}, estás autenticado`, datos: req.usuario });
});

module.exports = router;
