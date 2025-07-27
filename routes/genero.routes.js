const express = require('express');
const router = express.Router();
const { 
    obtenerGeneros, 
    obtenerGeneroPorId, 
    crearGenero, 
    actualizarGenero, 
    eliminarGenero 
} = require('../controllers/genero.controller');

const { verificarToken, soloAdmin } = require('../middlewares/auth.middleware');

// Acceso libre
router.get('/', obtenerGeneros);
router.get('/:id', obtenerGeneroPorId);

// Solo admin
router.post('/', verificarToken, soloAdmin, crearGenero);
router.put('/:id', verificarToken, soloAdmin, actualizarGenero);
router.delete('/:id', verificarToken, soloAdmin, eliminarGenero);

module.exports = router;
