// DFS: Controlador de autenticación - registro y login
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { dbPrincipal } = require('../models');  // Importar correctamente desde dbPrincipal

const registrarUsuario = async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    try {
        // Verificar si ya existe el email
        const existe = await dbPrincipal.Usuario.findOne({ where: { email } });
        if (existe) return res.status(400).json({ error: 'Email ya registrado' });

        // Encriptar password
        const password_hash = await bcrypt.hash(password, 10);

        const nuevoUsuario = await dbPrincipal.Usuario.create({ nombre, email, password_hash, rol });

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario: { id: nuevoUsuario.id, email, rol }
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error al registrar usuario', detalle: error.message });
    }
};

const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await dbPrincipal.Usuario.findOne({ where: { email } });
        if (!usuario) return res.status(400).json({ error: 'Credenciales inválidas' });

        const valido = await bcrypt.compare(password, usuario.password_hash);
        if (!valido) return res.status(400).json({ error: 'Credenciales inválidas' });

        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({ mensaje: 'Login exitoso', token });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error en login', detalle: error.message });
    }
};

module.exports = { registrarUsuario, loginUsuario };
