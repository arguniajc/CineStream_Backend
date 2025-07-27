const { Idioma } = require('../models');

// ✅ Obtener todos los idiomas
const obtenerIdiomas = async (req, res) => {
    try {
        const idiomas = await Idioma.findAll({
            order: [['id', 'ASC']]
        });

        const idiomasLimpios = idiomas.map(i => ({
            id: i.id,
            nombre: i.nombre
        }));

        res.json(idiomasLimpios);
    } catch (error) {
        console.error('Error al obtener idiomas:', error);
        res.status(500).json({ error: 'Error al obtener idiomas', detalle: error.message });
    }
};

// ✅ Obtener idioma por ID
const obtenerIdiomaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const idioma = await Idioma.findByPk(id);

        if (!idioma) {
            return res.status(404).json({ error: 'Idioma no encontrado' });
        }

        const idiomaLimpio = {
            id: idioma.id,
            nombre: idioma.nombre
        };

        res.json(idiomaLimpio);
    } catch (error) {
        console.error('Error al obtener idioma:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

// ✅ Crear idioma
const crearIdioma = async (req, res) => {
    const { nombre } = req.body;

    try {
        const existente = await Idioma.findOne({ where: { nombre } });
        if (existente) {
            return res.status(400).json({ error: 'Ya existe un idioma con ese nombre' });
        }

        const nuevo = await Idioma.create({ nombre });
        res.status(201).json({ mensaje: 'Idioma creado', idioma: nuevo });
    } catch (error) {
        console.error('Error al crear idioma:', error);
        res.status(500).json({ error: 'Error al crear idioma', detalle: error.message });
    }
};

// ✅ Actualizar idioma
const actualizarIdioma = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    try {
        const idioma = await Idioma.findByPk(id);

        if (!idioma) {
            return res.status(404).json({ error: 'Idioma no encontrado' });
        }

        await idioma.update({ nombre });
        res.json({ mensaje: 'Idioma actualizado', idioma });
    } catch (error) {
        console.error('Error al actualizar idioma:', error);
        res.status(500).json({ error: 'Error al actualizar idioma', detalle: error.message });
    }
};

// ✅ Eliminar idioma
const eliminarIdioma = async (req, res) => {
    const { id } = req.params;

    try {
        const idioma = await Idioma.findByPk(id);

        if (!idioma) {
            return res.status(404).json({ error: 'Idioma no encontrado' });
        }

        await idioma.destroy();
        res.json({ mensaje: 'Idioma eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar idioma:', error);
        res.status(500).json({ error: 'Error al eliminar idioma', detalle: error.message });
    }
};

module.exports = {
    obtenerIdiomas,
    obtenerIdiomaPorId,
    crearIdioma,
    actualizarIdioma,
    eliminarIdioma
};
