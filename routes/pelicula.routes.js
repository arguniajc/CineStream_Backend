const express = require('express');
const router = express.Router();
const { 
    crearPelicula, 
    obtenerPeliculas, 
    actualizarPelicula, 
    eliminarPelicula,
    obtenerPeliculaPorId,       // Importa también estas 3
    buscarPeliculas,
    obtenerPeliculasRecomendadas
} = require('../controllers/pelicula.controller');

const { verificarToken, soloAdmin } = require('../middlewares/auth.middleware');

// Crear película - solo admin
router.post('/', verificarToken, soloAdmin, crearPelicula);

// Obtener todas las películas - acceso libre
router.get('/', obtenerPeliculas);

// Buscar películas por título - acceso libre
router.get('/buscar', buscarPeliculas);

// Obtener películas recomendadas - acceso libre
router.get('/recomendadas', obtenerPeliculasRecomendadas);

// Obtener película por ID - acceso libre (ESTO DEBE IR AL FINAL)
router.get('/:id', obtenerPeliculaPorId);

// Actualizar película - solo admin
router.put('/:id', verificarToken, soloAdmin, actualizarPelicula);

// Eliminar película - solo admin
router.delete('/:id', verificarToken, soloAdmin, eliminarPelicula);

module.exports = router;
