const {
    Pelicula,
    PeliculaActor,
    PeliculaDirector,
    PeliculaCompania,
    PeliculaGenero,
    PeliculaIdioma,
    Actor,
    Director,
    Compania,
    Genero,
    Idioma
} = require('../models');

/////////////////////////// ACTORES ///////////////////////////

const agregarActor = async (req, res) => {
    const { id } = req.params;
    const { actor_id, personaje } = req.body;

    try {
        const pelicula = await Pelicula.findByPk(id);
        if (!pelicula) return res.status(404).json({ error: 'Película no encontrada' });

        const actor = await Actor.findByPk(actor_id);
        if (!actor) return res.status(404).json({ error: 'Actor no encontrado' });

        const existe = await PeliculaActor.findOne({ where: { pelicula_id: id, actor_id } });
        if (existe) return res.status(400).json({ error: 'Actor ya está asociado' });

        await PeliculaActor.create({ pelicula_id: id, actor_id, personaje });
        res.status(201).json({ mensaje: 'Actor agregado' });
    } catch (error) {
        console.error('Error agregar actor:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

const editarPersonajeActor = async (req, res) => {
    const { id, actor_id } = req.params;
    const { personaje } = req.body;

    try {
        const relacion = await PeliculaActor.findOne({ where: { pelicula_id: id, actor_id } });
        if (!relacion) return res.status(404).json({ error: 'Actor no asociado' });

        await relacion.update({ personaje });
        res.json({ mensaje: 'Personaje actualizado' });
    } catch (error) {
        console.error('Error editar personaje:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

const eliminarActor = async (req, res) => {
    const { id, actor_id } = req.params;

    try {
        const relacion = await PeliculaActor.findOne({ where: { pelicula_id: id, actor_id } });
        if (!relacion) return res.status(404).json({ error: 'Actor no asociado' });

        await relacion.destroy();
        res.json({ mensaje: 'Actor eliminado' });
    } catch (error) {
        console.error('Error eliminar actor:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

/////////////////////////// DIRECTORES ///////////////////////////

const agregarDirector = async (req, res) => {
    const { id } = req.params;
    const { director_id } = req.body;

    try {
        const director = await Director.findByPk(director_id);
        if (!director) return res.status(404).json({ error: 'Director no encontrado' });

        const existe = await PeliculaDirector.findOne({ where: { pelicula_id: id, director_id } });
        if (existe) return res.status(400).json({ error: 'Director ya está asociado' });

        await PeliculaDirector.create({ pelicula_id: id, director_id });
        res.status(201).json({ mensaje: 'Director agregado' });
    } catch (error) {
        console.error('Error agregar director:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

const eliminarDirector = async (req, res) => {
    const { id, director_id } = req.params;

    try {
        const relacion = await PeliculaDirector.findOne({ where: { pelicula_id: id, director_id } });
        if (!relacion) return res.status(404).json({ error: 'Director no asociado' });

        await relacion.destroy();
        res.json({ mensaje: 'Director eliminado' });
    } catch (error) {
        console.error('Error eliminar director:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

/////////////////////////// COMPAÑÍAS ///////////////////////////

const agregarCompania = async (req, res) => {
    const { id } = req.params;
    const { compania_id } = req.body;

    try {
        const compania = await Compania.findByPk(compania_id);
        if (!compania) return res.status(404).json({ error: 'Compañía no encontrada' });

        const existe = await PeliculaCompania.findOne({ where: { pelicula_id: id, compania_id } });
        if (existe) return res.status(400).json({ error: 'Compañía ya asociada' });

        await PeliculaCompania.create({ pelicula_id: id, compania_id });
        res.status(201).json({ mensaje: 'Compañía agregada' });
    } catch (error) {
        console.error('Error agregar compañía:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

const eliminarCompania = async (req, res) => {
    const { id, compania_id } = req.params;

    try {
        const relacion = await PeliculaCompania.findOne({ where: { pelicula_id: id, compania_id } });
        if (!relacion) return res.status(404).json({ error: 'Compañía no asociada' });

        await relacion.destroy();
        res.json({ mensaje: 'Compañía eliminada' });
    } catch (error) {
        console.error('Error eliminar compañía:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

/////////////////////////// GÉNEROS ///////////////////////////

const agregarGenero = async (req, res) => {
    const { id } = req.params;
    const { genero_id } = req.body;

    try {
        const genero = await Genero.findByPk(genero_id);
        if (!genero) return res.status(404).json({ error: 'Género no encontrado' });

        const existe = await PeliculaGenero.findOne({ where: { pelicula_id: id, genero_id } });
        if (existe) return res.status(400).json({ error: 'Género ya asociado' });

        await PeliculaGenero.create({ pelicula_id: id, genero_id });
        res.status(201).json({ mensaje: 'Género agregado' });
    } catch (error) {
        console.error('Error agregar género:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

const eliminarGenero = async (req, res) => {
    const { id, genero_id } = req.params;

    try {
        const relacion = await PeliculaGenero.findOne({ where: { pelicula_id: id, genero_id } });
        if (!relacion) return res.status(404).json({ error: 'Género no asociado' });

        await relacion.destroy();
        res.json({ mensaje: 'Género eliminado' });
    } catch (error) {
        console.error('Error eliminar género:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

/////////////////////////// IDIOMAS ///////////////////////////

const agregarIdioma = async (req, res) => {
    const { id } = req.params;
    const { idioma_id } = req.body;

    try {
        const idioma = await Idioma.findByPk(idioma_id);
        if (!idioma) return res.status(404).json({ error: 'Idioma no encontrado' });

        const existe = await PeliculaIdioma.findOne({ where: { pelicula_id: id, idioma_id } });
        if (existe) return res.status(400).json({ error: 'Idioma ya asociado' });

        await PeliculaIdioma.create({ pelicula_id: id, idioma_id });
        res.status(201).json({ mensaje: 'Idioma agregado' });
    } catch (error) {
        console.error('Error agregar idioma:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

const eliminarIdioma = async (req, res) => {
    const { id, idioma_id } = req.params;

    try {
        const relacion = await PeliculaIdioma.findOne({ where: { pelicula_id: id, idioma_id } });
        if (!relacion) return res.status(404).json({ error: 'Idioma no asociado' });

        await relacion.destroy();
        res.json({ mensaje: 'Idioma eliminado' });
    } catch (error) {
        console.error('Error eliminar idioma:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

module.exports = {
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
};