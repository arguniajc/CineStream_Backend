const { dbPrincipal } = require('../models');

// ✅ Obtener todos los géneros
const obtenerGeneros = async (req, res) => {
    try {
        const generos = await dbPrincipal.Genero.findAll({
            order: [['id', 'ASC']]
        });

        const generosLimpios = generos.map(g => ({
            id: g.id,
            nombre: g.nombre
        }));

        res.json(generosLimpios);
    } catch (error) {
        console.error('Error al obtener géneros:', error);
        res.status(500).json({ error: 'Error al obtener géneros', detalle: error.message });
    }
};

// ✅ Obtener género por ID
const obtenerGeneroPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const genero = await dbPrincipal.Genero.findByPk(id);

        if (!genero) {
            return res.status(404).json({ error: 'Género no encontrado' });
        }

        const generoLimpio = {
            id: genero.id,
            nombre: genero.nombre
        };

        res.json(generoLimpio);
    } catch (error) {
        console.error('Error al obtener género:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

// ✅ Crear género
const crearGenero = async (req, res) => {
    const { nombre } = req.body;

    try {
        const existente = await dbPrincipal.Genero.findOne({ where: { nombre } });
        if (existente) {
            return res.status(400).json({ error: 'Ya existe un género con ese nombre' });
        }

        const nuevo = await dbPrincipal.Genero.create({ nombre });
        res.status(201).json({ mensaje: 'Género creado', genero: nuevo });
    } catch (error) {
        console.error('Error al crear género:', error);
        res.status(500).json({ error: 'Error al crear género', detalle: error.message });
    }
};

// ✅ Actualizar género
const actualizarGenero = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    try {
        const genero = await dbPrincipal.Genero.findByPk(id);

        if (!genero) {
            return res.status(404).json({ error: 'Género no encontrado' });
        }

        await genero.update({ nombre });
        res.json({ mensaje: 'Género actualizado', genero });
    } catch (error) {
        console.error('Error al actualizar género:', error);
        res.status(500).json({ error: 'Error al actualizar género', detalle: error.message });
    }
};

// ✅ Eliminar género
const eliminarGenero = async (req, res) => {
    const { id } = req.params;

    try {
        const genero = await dbPrincipal.Genero.findByPk(id);

        if (!genero) {
            return res.status(404).json({ error: 'Género no encontrado' });
        }

        await genero.destroy();
        res.json({ mensaje: 'Género eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar género:', error);
        res.status(500).json({ error: 'Error al eliminar género', detalle: error.message });
    }
};

module.exports = {
    obtenerGeneros,
    obtenerGeneroPorId,
    crearGenero,
    actualizarGenero,
    eliminarGenero
};
