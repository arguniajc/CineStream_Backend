// DFS: Define rutas públicas para registro y login
const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controllers/auth.controller');

router.post('/register', registrarUsuario);  // solo para crear usuarios manualmente
router.post('/login', loginUsuario);

module.exports = router;
