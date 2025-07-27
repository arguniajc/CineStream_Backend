// controllers/actor.controller.js
const { Actor } = require('../models');

// Obtener todos los actores
const obtenerActores = async (req, res) => {
    try {
        const actores = await Actor.findAll({ order: [['id', 'DESC']] });
        res.json(actores);
    } catch (error) {
        console.error('Error al obtener actores:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

// Obtener actor por ID
const obtenerActorPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const actor = await Actor.findByPk(id);
        if (!actor) return res.status(404).json({ error: 'Actor no encontrado' });
        res.json(actor);
    } catch (error) {
        console.error('Error al obtener actor:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

// Crear actor
const crearActor = async (req, res) => {
    const { nombre, imagen_url } = req.body;
    try {
        const nuevoActor = await Actor.create({ nombre, imagen_url });
        res.status(201).json({ mensaje: 'Actor creado', actor: nuevoActor });
    } catch (error) {
        console.error('Error al crear actor:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

// Actualizar actor
const actualizarActor = async (req, res) => {
    const { id } = req.params;
    const { nombre, imagen_url } = req.body;
    try {
        const actor = await Actor.findByPk(id);
        if (!actor) return res.status(404).json({ error: 'Actor no encontrado' });

        await actor.update({ nombre, imagen_url });
        res.json({ mensaje: 'Actor actualizado', actor });
    } catch (error) {
        console.error('Error al actualizar actor:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

// Eliminar actor
const eliminarActor = async (req, res) => {
    const { id } = req.params;
    try {
        const actor = await Actor.findByPk(id);
        if (!actor) return res.status(404).json({ error: 'Actor no encontrado' });

        await actor.destroy();
        res.json({ mensaje: 'Actor eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar actor:', error);
        res.status(500).json({ error: 'Error interno', detalle: error.message });
    }
};

module.exports = {
    obtenerActores,
    obtenerActorPorId,
    crearActor,
    actualizarActor,
    eliminarActor
};
