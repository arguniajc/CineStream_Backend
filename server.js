// DFS: Punto de entrada del servidor, configura Express y conecta a la base de datos.
const express = require('express');
const app = express();
const { sequelize } = require('./models');
require('dotenv').config();

app.use(express.json());

// DFS: Importar rutas de autenticación
const authRoutes = require('./routes/auth.routes');
const testRoutes = require('./routes/test.routes');
const peliculaRoutes = require('./routes/pelicula.routes');
const actorRoutes = require('./routes/actor.routes');
const directorRoutes = require('./routes/director.routes');
const companiaRoutes = require('./routes/compania.routes');
const generoRoutes = require('./routes/genero.routes');
const idiomaRoutes = require('./routes/idioma.routes');


// DFS: Configurar rutas
app.use('/api/auth', authRoutes);  
app.use('/api/test', testRoutes);
app.use('/api/peliculas', peliculaRoutes);
app.use('/api/actores', actorRoutes);
app.use('/api/directores', directorRoutes);
app.use('/api/companias', companiaRoutes);
app.use('/api/generos', generoRoutes);
app.use('/api/idiomas', idiomaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos exitosa');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
});
