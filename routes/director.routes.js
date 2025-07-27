const express = require('express');
const router = express.Router();
const { 
    obtenerDirectores, 
    obtenerDirectorPorId, 
    crearDirector, 
    actualizarDirector, 
    eliminarDirector 
} = require('../controllers/director.controller');

const { verificarToken, soloAdmin } = require('../middlewares/auth.middleware');

// Acceso libre
router.get('/', obtenerDirectores);
router.get('/:id', obtenerDirectorPorId);

// Solo admin
router.post('/', verificarToken, soloAdmin, crearDirector);
router.put('/:id', verificarToken, soloAdmin, actualizarDirector);
router.delete('/:id', verificarToken, soloAdmin, eliminarDirector);

module.exports = router;
