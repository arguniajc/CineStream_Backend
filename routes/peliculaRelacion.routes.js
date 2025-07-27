const express = require('express');
const router = express.Router();
const {
    agregarActor,
    editarPersonajeActor,
    eliminarActor,
    agregarDirector,
    eliminarDirector,
    agregarCompania,
    eliminarCompania,
    agregarGenero,
    eliminarGenero,
    agregarIdioma,
    eliminarIdioma
} = require('../controllers/peliculaRelacion.controller');

const { verificarToken, soloAdmin } = require('../middlewares/auth.middleware');

// --- ACTORES ---
// Agregar actor a película
router.post('/:id/actores', verificarToken, soloAdmin, agregarActor);
// Editar personaje de actor
router.put('/:id/actores/:actor_id', verificarToken, soloAdmin, editarPersonajeActor);
// Eliminar actor de película
router.delete('/:id/actores/:actor_id', verificarToken, soloAdmin, eliminarActor);

// --- DIRECTORES ---
router.post('/:id/directores', verificarToken, soloAdmin, agregarDirector);
router.delete('/:id/directores/:director_id', verificarToken, soloAdmin, eliminarDirector);

// --- COMPAÑÍAS ---
router.post('/:id/companias', verificarToken, soloAdmin, agregarCompania);
router.delete('/:id/companias/:compania_id', verificarToken, soloAdmin, eliminarCompania);

// --- GÉNEROS ---
router.post('/:id/generos', verificarToken, soloAdmin, agregarGenero);
router.delete('/:id/generos/:genero_id', verificarToken, soloAdmin, eliminarGenero);

// --- IDIOMAS ---
router.post('/:id/idiomas', verificarToken, soloAdmin, agregarIdioma);
router.delete('/:id/idiomas/:idioma_id', verificarToken, soloAdmin, eliminarIdioma);

module.exports = router;
