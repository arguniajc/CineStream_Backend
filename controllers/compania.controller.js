const { dbPrincipal } = require('../models');

// ✅ Obtener todas las compañías
const obtenerCompanias = async (req, res) => {
    try {
        const companias = await dbPrincipal.Compania.findAll({
            order: [['id', 'ASC']]
        });

        const companiasLimpias = companias.map(c => ({
            id: c.id,
            nombre: c.nombre,
            imagen_url: c.imagen_url
        }));

        res.json(companiasLimpias);
    } catch (error) {
        console.error('Error al obtener compañías:', error);
        res.status(500).json({ error: 'Error al obtener compañías', detalle: error.message });
    }
};

// ✅ Obtener compañía por ID
const obtenerCompaniaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const compania = await dbPrincipal.Compania.findByPk(id);

        if (!compania) {
            return res.status(404).json({ error: 'Compañía no encontrada' });
        }

        const companiaLimpia = {
            id: compania.id,
            nombre: compania.nombre,
            imagen_url: compania.imagen_url
        };

        res.json(companiaLimpia);
    } catch (error) {
        console.error('Error al obtener compañía:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

// ✅ Crear compañía
const crearCompania = async (req, res) => {
    const { nombre, imagen_url } = req.body;

    try {
        const existente = await dbPrincipal.Compania.findOne({ where: { nombre } });
        if (existente) {
            return res.status(400).json({ error: 'Ya existe una compañía con ese nombre' });
        }

        const nueva = await dbPrincipal.Compania.create({ nombre, imagen_url });
        res.status(201).json({ mensaje: 'Compañía creada', compania: nueva });
    } catch (error) {
        console.error('Error al crear compañía:', error);
        res.status(500).json({ error: 'Error al crear compañía', detalle: error.message });
    }
};

// ✅ Actualizar compañía
const actualizarCompania = async (req, res) => {
    const { id } = req.params;
    const { nombre, imagen_url } = req.body;

    try {
        const compania = await dbPrincipal.Compania.findByPk(id);

        if (!compania) {
            return res.status(404).json({ error: 'Compañía no encontrada' });
        }

        await compania.update({ nombre, imagen_url });
        res.json({ mensaje: 'Compañía actualizada', compania });
    } catch (error) {
        console.error('Error al actualizar compañía:', error);
        res.status(500).json({ error: 'Error al actualizar compañía', detalle: error.message });
    }
};

// ✅ Eliminar compañía
const eliminarCompania = async (req, res) => {
    const { id } = req.params;

    try {
        const compania = await dbPrincipal.Compania.findByPk(id);

        if (!compania) {
            return res.status(404).json({ error: 'Compañía no encontrada' });
        }

        await compania.destroy();
        res.json({ mensaje: 'Compañía eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar compañía:', error);
        res.status(500).json({ error: 'Error al eliminar compañía', detalle: error.message });
    }
};

module.exports = {
    obtenerCompanias,
    obtenerCompaniaPorId,
    crearCompania,
    actualizarCompania,
    eliminarCompania
};
