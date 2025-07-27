const express = require('express');
const router = express.Router();
const { 
    obtenerCompanias, 
    obtenerCompaniaPorId, 
    crearCompania, 
    actualizarCompania, 
    eliminarCompania 
} = require('../controllers/compania.controller');

const { verificarToken, soloAdmin } = require('../middlewares/auth.middleware');

// Acceso libre
router.get('/', obtenerCompanias);
router.get('/:id', obtenerCompaniaPorId);

// Solo admin
router.post('/', verificarToken, soloAdmin, crearCompania);
router.put('/:id', verificarToken, soloAdmin, actualizarCompania);
router.delete('/:id', verificarToken, soloAdmin, eliminarCompania);

module.exports = router;
