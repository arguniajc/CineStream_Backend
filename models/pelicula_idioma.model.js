// DFS: Modelo tabla intermedia pelicula_idioma
module.exports = (sequelize, DataTypes) => {
    const PeliculaIdioma = sequelize.define('PeliculaIdioma', {
        pelicula_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        idioma_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        tableName: 'pelicula_idioma',
        timestamps: false
    });

    return PeliculaIdioma;
};
