// DFS: Punto de entrada del servidor, configura Express y conecta a las bases de datos
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors());
app.use(express.json());

// 🔹 Conexión a bases de datos (principal y secundaria)
const { sequelize1, sequelize2 } = require('./models');  // <- actualizado

// DFS: Importar rutas
const authRoutes = require('./routes/auth.routes');
const testRoutes = require('./routes/test.routes');
const peliculaRoutes = require('./routes/pelicula.routes');
const peliculaRelacionRoutes = require('./routes/peliculaRelacion.routes'); 
const actorRoutes = require('./routes/actor.routes');
const directorRoutes = require('./routes/director.routes');
const companiaRoutes = require('./routes/compania.routes');
const generoRoutes = require('./routes/genero.routes');
const idiomaRoutes = require('./routes/idioma.routes');

// DFS: Configurar rutas
app.use('/api/auth', authRoutes);  
app.use('/api/test', testRoutes);
app.use('/api/peliculas', peliculaRoutes);
app.use('/api/peliculas', peliculaRelacionRoutes);
app.use('/api/actores', actorRoutes);
app.use('/api/directores', directorRoutes);
app.use('/api/companias', companiaRoutes);
app.use('/api/generos', generoRoutes);
app.use('/api/idiomas', idiomaRoutes);

// DFS: Arrancar servidor y conectar a ambas bases
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);

    try {
        await sequelize1.authenticate();
        console.log('✅ Conexión a Supabase (remota) exitosa');
    } catch (error) {
        console.error('❌ Error al conectar a Supabase:', error.message);
    }

    try {
        await sequelize2.authenticate();
        console.log('✅ Conexión a Base Local exitosa');
    } catch (error) {
        console.error('❌ Error al conectar a base local:', error.message);
    }
});
