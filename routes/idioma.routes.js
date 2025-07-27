const express = require('express');
const router = express.Router();
const { 
    obtenerIdiomas, 
    obtenerIdiomaPorId, 
    crearIdioma, 
    actualizarIdioma, 
    eliminarIdioma 
} = require('../controllers/idioma.controller');

const { verificarToken, soloAdmin } = require('../middlewares/auth.middleware');

// Acceso libre
router.get('/', obtenerIdiomas);
router.get('/:id', obtenerIdiomaPorId);

// Solo admin
router.post('/', verificarToken, soloAdmin, crearIdioma);
router.put('/:id', verificarToken, soloAdmin, actualizarIdioma);
router.delete('/:id', verificarToken, soloAdmin, eliminarIdioma);

module.exports = router;
