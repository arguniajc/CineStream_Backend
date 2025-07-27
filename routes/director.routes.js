const express = require('express');
const router = express.Router();
const { 
    obtenerActores, 
    obtenerActorPorId, 
    crearActor, 
    actualizarActor, 
    eliminarActor 
} = require('../controllers/actor.controller');

const { verificarToken, soloAdmin } = require('../middlewares/auth.middleware');

// Acceso libre
router.get('/', obtenerActores);
router.get('/:id', obtenerActorPorId);

// Solo admin
router.post('/', verificarToken, soloAdmin, crearActor);
router.put('/:id', verificarToken, soloAdmin, actualizarActor);
router.delete('/:id', verificarToken, soloAdmin, eliminarActor);

module.exports = router;
