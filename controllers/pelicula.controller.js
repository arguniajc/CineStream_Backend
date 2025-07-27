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
    Idioma,
    sequelize
} = require('../models');

const { Op } = require('sequelize');

// ✅ Obtener películas recomendadas
const obtenerPeliculasRecomendadas = async (req, res) => {
    try {
        const peliculas = await Pelicula.findAll({
            limit: 5,
            order: [['calificacion', 'DESC']],
            include: [
                { model: Genero, as: 'generos' },
                { model: Actor, as: 'actores', through: { attributes: ['personaje'] } },
                { model: Director, as: 'directores' },
                { model: Compania, as: 'companias' },
                { model: Idioma, as: 'idiomas' }
            ]
        });

        const peliculasLimpias = peliculas.map(p => {
            const data = p.toJSON();
            data.actores = data.actores.map(actor => ({
                id: actor.id,
                nombre: actor.nombre,
                imagen_url: actor.imagen_url,
                personaje: actor.PeliculaActor?.personaje || null
            }));
            data.directores = data.directores.map(d => ({
                id: d.id,
                nombre: d.nombre,
                imagen_url: d.imagen_url
            }));
            data.companias = data.companias.map(c => ({
                id: c.id,
                nombre: c.nombre,
                imagen_url: c.imagen_url
            }));
            data.generos = data.generos.map(g => ({ id: g.id, nombre: g.nombre }));
            data.idiomas = data.idiomas.map(i => ({ id: i.id, nombre: i.nombre }));
            return data;
        });

        res.json(peliculasLimpias);
    } catch (error) {
        console.error('Error al obtener recomendadas:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

// 🔍 Validar existencia de IDs relacionados
const validarExistenciaIds = async ({ actores, directores, companias, generos, idiomas }) => {
    const errores = [];

    if (!Array.isArray(actores) || actores.length === 0) {
        errores.push('Debe incluir al menos un actor');
    } else {
        const actorIds = actores.map(a => a.actor_id);
        const actoresBD = await Actor.findAll({ where: { id: actorIds } });
        const encontrados = actoresBD.map(a => a.id);
        actorIds.filter(id => !encontrados.includes(id))
                .forEach(id => errores.push(`Actor con ID ${id} no existe`));
    }

    const validarLote = async (items, model, tipo) => {
        if (!Array.isArray(items) || items.length === 0) {
            errores.push(`Debe incluir al menos un ${tipo}`);
            return;
        }
        const elementosBD = await model.findAll({ where: { id: items } });
        const encontrados = elementosBD.map(e => e.id);
        items.filter(id => !encontrados.includes(id))
             .forEach(id => errores.push(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} con ID ${id} no existe`));
    };

    await validarLote(directores, Director, 'director');
    await validarLote(companias, Compania, 'compañía');
    await validarLote(generos, Genero, 'género');
    await validarLote(idiomas, Idioma, 'idioma');

    return errores;
};

// ✅ Crear película
const crearPelicula = async (req, res) => {
    const {
        titulo_espanol, titulo_original, sinopsis, fecha_estreno, pais_estreno,
        duracion_minutos, calificacion, trailer_url, poster_url,
        actores, directores, companias, generos, idiomas
    } = req.body;

    const t = await sequelize.transaction();

    try {
        const errores = await validarExistenciaIds({ actores, directores, companias, generos, idiomas });
        if (errores.length > 0) {
            await t.rollback();
            return res.status(400).json({ error: errores.join('. ') });
        }

        const nuevaPelicula = await Pelicula.create({
            titulo_espanol, titulo_original, sinopsis, fecha_estreno, pais_estreno,
            duracion_minutos, calificacion, trailer_url, poster_url
        }, { transaction: t });

        await PeliculaActor.bulkCreate(
            actores.map(a => ({
                pelicula_id: nuevaPelicula.id,
                actor_id: a.actor_id,
                personaje: a.personaje
            })),
            { transaction: t }
        );

        await PeliculaDirector.bulkCreate(
            directores.map(director_id => ({ pelicula_id: nuevaPelicula.id, director_id })),
            { transaction: t }
        );

        await PeliculaCompania.bulkCreate(
            companias.map(compania_id => ({ pelicula_id: nuevaPelicula.id, compania_id })),
            { transaction: t }
        );

        await PeliculaGenero.bulkCreate(
            generos.map(genero_id => ({ pelicula_id: nuevaPelicula.id, genero_id })),
            { transaction: t }
        );

        await PeliculaIdioma.bulkCreate(
            idiomas.map(idioma_id => ({ pelicula_id: nuevaPelicula.id, idioma_id })),
            { transaction: t }
        );

        await t.commit();
        res.status(201).json({ mensaje: 'Película creada', pelicula: nuevaPelicula });
    } catch (error) {
        await t.rollback();
        console.error('Error al crear película:', error);
        res.status(500).json({ error: 'Error al crear película', detalle: error.message });
    }
};

// ✅ Obtener películas con paginación y limpieza
const obtenerPeliculas = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const { rows: peliculas, count } = await Pelicula.findAndCountAll({
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [['id', 'DESC']],
            include: [
                { model: Actor, as: 'actores', through: { attributes: ['personaje'] } },
                { model: Director, as: 'directores' },
                { model: Compania, as: 'companias' },
                { model: Genero, as: 'generos' },
                { model: Idioma, as: 'idiomas' }
            ]
        });

        const peliculasLimpias = peliculas.map(p => {
            const data = p.toJSON();
            data.actores = data.actores.map(actor => ({
                id: actor.id,
                nombre: actor.nombre,
                imagen_url: actor.imagen_url,
                personaje: actor.PeliculaActor?.personaje || null
            }));
            data.directores = data.directores.map(d => ({
                id: d.id,
                nombre: d.nombre,
                imagen_url: d.imagen_url
            }));
            data.companias = data.companias.map(c => ({
                id: c.id,
                nombre: c.nombre,
                imagen_url: c.imagen_url
            }));
            data.generos = data.generos.map(g => ({ id: g.id, nombre: g.nombre }));
            data.idiomas = data.idiomas.map(i => ({ id: i.id, nombre: i.nombre }));
            return data;
        });

        res.json({ total: count, peliculas: peliculasLimpias });
    } catch (error) {
        console.error('Error al obtener películas:', error);
        res.status(500).json({ error: 'Error al obtener películas', detalle: error.message });
    }
};

// ✅ Obtener película por ID
const obtenerPeliculaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const pelicula = await Pelicula.findByPk(id, {
            include: [
                { model: Actor, as: 'actores', through: { attributes: ['personaje'] } },
                { model: Director, as: 'directores' },
                { model: Compania, as: 'companias' },
                { model: Genero, as: 'generos' },
                { model: Idioma, as: 'idiomas' }
            ]
        });

        if (!pelicula) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }

        const data = pelicula.toJSON();
        data.actores = data.actores.map(actor => ({
            id: actor.id,
            nombre: actor.nombre,
            imagen_url: actor.imagen_url,
            personaje: actor.PeliculaActor?.personaje || null
        }));
        data.directores = data.directores.map(d => ({
            id: d.id,
            nombre: d.nombre,
            imagen_url: d.imagen_url
        }));
        data.companias = data.companias.map(c => ({
            id: c.id,
            nombre: c.nombre,
            imagen_url: c.imagen_url
        }));
        data.generos = data.generos.map(g => ({ id: g.id, nombre: g.nombre }));
        data.idiomas = data.idiomas.map(i => ({ id: i.id, nombre: i.nombre }));

        res.json(data);
    } catch (error) {
        console.error('Error al obtener película:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

// ✅ Actualizar película
const actualizarPelicula = async (req, res) => {
    const { id } = req.params;
    const {
        titulo_espanol, titulo_original, sinopsis, fecha_estreno, pais_estreno,
        duracion_minutos, calificacion, trailer_url, poster_url,
        actores, directores, companias, generos, idiomas
    } = req.body;

    const t = await sequelize.transaction();

    try {
        const pelicula = await Pelicula.findByPk(id);
        if (!pelicula) {
            await t.rollback();
            return res.status(404).json({ error: 'Película no encontrada' });
        }

        const errores = await validarExistenciaIds({ actores, directores, companias, generos, idiomas });
        if (errores.length > 0) {
            await t.rollback();
            return res.status(400).json({ error: errores.join('. ') });
        }

        await pelicula.update({
            titulo_espanol, titulo_original, sinopsis, fecha_estreno, pais_estreno,
            duracion_minutos, calificacion, trailer_url, poster_url
        }, { transaction: t });

        // Limpiar relaciones
        await PeliculaActor.destroy({ where: { pelicula_id: id }, transaction: t });
        await PeliculaDirector.destroy({ where: { pelicula_id: id }, transaction: t });
        await PeliculaCompania.destroy({ where: { pelicula_id: id }, transaction: t });
        await PeliculaGenero.destroy({ where: { pelicula_id: id }, transaction: t });
        await PeliculaIdioma.destroy({ where: { pelicula_id: id }, transaction: t });

        // Insertar nuevas relaciones
        await PeliculaActor.bulkCreate(
            actores.map(a => ({ pelicula_id: id, actor_id: a.actor_id, personaje: a.personaje })),
            { transaction: t }
        );
        await PeliculaDirector.bulkCreate(
            directores.map(director_id => ({ pelicula_id: id, director_id })),
            { transaction: t }
        );
        await PeliculaCompania.bulkCreate(
            companias.map(compania_id => ({ pelicula_id: id, compania_id })),
            { transaction: t }
        );
        await PeliculaGenero.bulkCreate(
            generos.map(genero_id => ({ pelicula_id: id, genero_id })),
            { transaction: t }
        );
        await PeliculaIdioma.bulkCreate(
            idiomas.map(idioma_id => ({ pelicula_id: id, idioma_id })),
            { transaction: t }
        );

        await t.commit();
        res.json({ mensaje: 'Película actualizada', pelicula });
    } catch (error) {
        await t.rollback();
        console.error('Error al actualizar película:', error);
        res.status(500).json({ error: 'Error al actualizar película', detalle: error.message });
    }
};

// ✅ Eliminar película
const eliminarPelicula = async (req, res) => {
    const { id } = req.params;
    try {
        const pelicula = await Pelicula.findByPk(id);
        if (!pelicula) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }

        await pelicula.destroy();
        res.json({ mensaje: 'Película eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar película:', error);
        res.status(500).json({ error: 'Error al eliminar película', detalle: error.message });
    }
};

// 🔍 Buscar películas
const buscarPeliculas = async (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ error: 'Debe proporcionar un término de búsqueda (q)' });
    }

    try {
        const peliculas = await Pelicula.findAll({
            where: {
                [Op.or]: [
                    { titulo_espanol: { [Op.iLike]: `%${q}%` } },
                    { titulo_original: { [Op.iLike]: `%${q}%` } },
                    { sinopsis: { [Op.iLike]: `%${q}%` } }
                ]
            },
            order: [['id', 'DESC']]
        });

        res.json(peliculas);
    } catch (error) {
        console.error('Error al buscar películas:', error);
        res.status(500).json({ error: 'Error al buscar películas', detalle: error.message });
    }
};

module.exports = {
    crearPelicula,
    obtenerPeliculas,
    actualizarPelicula,
    eliminarPelicula,
    obtenerPeliculaPorId,
    buscarPeliculas,    
    obtenerPeliculasRecomendadas
};
