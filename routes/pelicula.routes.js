const express = require('express');
const router = express.Router();
const { 
    crearPelicula, 
    obtenerPeliculas, 
    actualizarPelicula, 
    eliminarPelicula,
    obtenerPeliculaPorId,       
    buscarPeliculas,
    obtenerPeliculasRecomendadas,
    obtenerProximosLanzamientos,
    obtenerPeliculaAleatoria,
    obtenerPeliculasPorIdGenero
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
// Obtener próximos lanzamientos - acceso libre
router.get('/lanzamientos', obtenerProximosLanzamientos);
// Obtener película aleatoria - acceso libre
router.get('/aleatoria', obtenerPeliculaAleatoria);
// Obtener películas por género - acceso libre
router.get('/genero/:id', obtenerPeliculasPorIdGenero);
// Obtener película por ID - acceso libre 
router.get('/:id', obtenerPeliculaPorId);
// Actualizar película - solo admin
router.put('/:id', verificarToken, soloAdmin, actualizarPelicula);
// Eliminar película - solo admin
router.delete('/:id', verificarToken, soloAdmin, eliminarPelicula);

module.exports = router;
