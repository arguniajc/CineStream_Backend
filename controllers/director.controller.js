const { Director } = require('../models');

// ✅ Obtener todos los directores
const obtenerDirectores = async (req, res) => {
    try {
        const directores = await Director.findAll({
            order: [['id', 'ASC']]
        });

        const directoresLimpios = directores.map(d => ({
            id: d.id,
            nombre: d.nombre,
            imagen_url: d.imagen_url
        }));

        res.json(directoresLimpios);
    } catch (error) {
        console.error('Error al obtener directores:', error);
        res.status(500).json({ error: 'Error al obtener directores', detalle: error.message });
    }
};

// ✅ Obtener director por ID
const obtenerDirectorPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const director = await Director.findByPk(id);

        if (!director) {
            return res.status(404).json({ error: 'Director no encontrado' });
        }

        const directorLimpio = {
            id: director.id,
            nombre: director.nombre,
            imagen_url: director.imagen_url
        };

        res.json(directorLimpio);
    } catch (error) {
        console.error('Error al obtener director:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

// ✅ Crear director
const crearDirector = async (req, res) => {
    const { nombre, imagen_url } = req.body;

    try {
        const existente = await Director.findOne({ where: { nombre } });
        if (existente) {
            return res.status(400).json({ error: 'Ya existe un director con ese nombre' });
        }

        const nuevo = await Director.create({ nombre, imagen_url });
        res.status(201).json({ mensaje: 'Director creado', director: nuevo });
    } catch (error) {
        console.error('Error al crear director:', error);
        res.status(500).json({ error: 'Error al crear director', detalle: error.message });
    }
};

// ✅ Actualizar director
const actualizarDirector = async (req, res) => {
    const { id } = req.params;
    const { nombre, imagen_url } = req.body;

    try {
        const director = await Director.findByPk(id);

        if (!director) {
            return res.status(404).json({ error: 'Director no encontrado' });
        }

        await director.update({ nombre, imagen_url });
        res.json({ mensaje: 'Director actualizado', director });
    } catch (error) {
        console.error('Error al actualizar director:', error);
        res.status(500).json({ error: 'Error al actualizar director', detalle: error.message });
    }
};

// ✅ Eliminar director
const eliminarDirector = async (req, res) => {
    const { id } = req.params;

    try {
        const director = await Director.findByPk(id);

        if (!director) {
            return res.status(404).json({ error: 'Director no encontrado' });
        }

        await director.destroy();
        res.json({ mensaje: 'Director eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar director:', error);
        res.status(500).json({ error: 'Error al eliminar director', detalle: error.message });
    }
};

module.exports = {
    obtenerDirectores,
    obtenerDirectorPorId,
    crearDirector,
    actualizarDirector,
    eliminarDirector
};
