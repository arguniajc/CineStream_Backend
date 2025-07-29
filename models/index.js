const { dbPrincipal, dbSecundaria, sequelize1, sequelize2 } = require('../config/database');
const { DataTypes } = require('sequelize');

const defineModels = (sequelizeInstance) => {
    const db = {};
    db.sequelize = sequelizeInstance;

    // Modelos
    db.Pelicula = require('./pelicula.model')(sequelizeInstance, DataTypes);
    db.Actor = require('./actor.model')(sequelizeInstance, DataTypes);
    db.Director = require('./director.model')(sequelizeInstance, DataTypes);
    db.Compania = require('./compania.model')(sequelizeInstance, DataTypes);
    db.Genero = require('./genero.model')(sequelizeInstance, DataTypes);
    db.Idioma = require('./idioma.model')(sequelizeInstance, DataTypes);
    db.Usuario = require('./usuario.model')(sequelizeInstance, DataTypes); 
    db.PeliculaActor = require('./pelicula_actor.model')(sequelizeInstance, DataTypes);
    db.PeliculaDirector = require('./pelicula_director.model')(sequelizeInstance, DataTypes);
    db.PeliculaCompania = require('./pelicula_compania.model')(sequelizeInstance, DataTypes);
    db.PeliculaGenero = require('./pelicula_genero.model')(sequelizeInstance, DataTypes);
    db.PeliculaIdioma = require('./pelicula_idioma.model')(sequelizeInstance, DataTypes);

    // Relaciones
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

    db.Pelicula.belongsToMany(db.Director, {
        through: db.PeliculaDirector,
        foreignKey: 'pelicula_id',
        otherKey: 'director_id',
        as: 'directores'
    });

    db.Pelicula.belongsToMany(db.Compania, {
        through: db.PeliculaCompania,
        foreignKey: 'pelicula_id',
        otherKey: 'compania_id',
        as: 'companias'
    });

    db.Pelicula.belongsToMany(db.Genero, {
        through: db.PeliculaGenero,
        foreignKey: 'pelicula_id',
        otherKey: 'genero_id',
        as: 'generos'
    });

    db.Pelicula.belongsToMany(db.Idioma, {
        through: db.PeliculaIdioma,
        foreignKey: 'pelicula_id',
        otherKey: 'idioma_id',
        as: 'idiomas'
    });

    return db;
};

// Cargar modelos para base principal y secundaria
const dbPrincipalModelos = defineModels(dbPrincipal);
const dbSecundariaModelos = defineModels(dbSecundaria);

module.exports = {
    dbPrincipal: dbPrincipalModelos,
    dbSecundaria: dbSecundariaModelos,
    sequelize1,
    sequelize2
};
