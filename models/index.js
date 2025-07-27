// DFS: Inicializa Sequelize y carga todos los modelos.
const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');


// DFS: Definir modelos aquí (temporalmente vacío, se agregará cada modelo luego)

const db = {};
db.sequelize = sequelize;

// DFS: Carga modelos
db.Pelicula = require('./pelicula.model')(sequelize, DataTypes);
db.Actor = require('./actor.model')(sequelize, DataTypes);
db.Director = require('./director.model')(sequelize, DataTypes);
db.Compania = require('./compania.model')(sequelize, DataTypes);
db.Genero = require('./genero.model')(sequelize, DataTypes);
db.Idioma = require('./idioma.model')(sequelize, DataTypes);
db.Usuario = require('./usuario.model')(sequelize, DataTypes); 
db.PeliculaActor = require('./pelicula_actor.model')(sequelize, DataTypes);
db.PeliculaDirector = require('./pelicula_director.model')(sequelize, DataTypes);
db.PeliculaCompania = require('./pelicula_compania.model')(sequelize, DataTypes);
db.PeliculaGenero = require('./pelicula_genero.model')(sequelize, DataTypes);
db.PeliculaIdioma = require('./pelicula_idioma.model')(sequelize, DataTypes);


// DFS: Relaciones de Pelicula con actores
db.Pelicula.belongsToMany(db.Actor, {
    through: db.PeliculaActor,
    foreignKey: 'pelicula_id',
    as: 'actores'
});
db.Actor.belongsToMany(db.Pelicula, {
    through: db.PeliculaActor,
    foreignKey: 'actor_id',
    as: 'peliculas'
});

// DFS: Relaciones de Pelicula con directores
db.Pelicula.belongsToMany(db.Director, {
    through: db.PeliculaDirector,
    foreignKey: 'pelicula_id',
    otherKey: 'director_id',
    as: 'directores'
});
// DFS: Relaciones con compañias
db.Pelicula.belongsToMany(db.Compania, {
    through: db.PeliculaCompania,
    foreignKey: 'pelicula_id',
    otherKey: 'compania_id', 
    as: 'companias'
});

// DFS: Relaciones con generos
db.Pelicula.belongsToMany(db.Genero, {
    through: db.PeliculaGenero,
    foreignKey: 'pelicula_id',
    otherKey: 'genero_id', 
    as: 'generos'
});

// DFS: Relaciones con idiomas
db.Pelicula.belongsToMany(db.Idioma, {
    through: db.PeliculaIdioma,
    foreignKey: 'pelicula_id',
    otherKey: 'idioma_id', 
    as: 'idiomas'
});

// DFS: Exporta Sequelize y los modelos
module.exports = db;
