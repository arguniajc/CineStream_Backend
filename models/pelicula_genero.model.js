// DFS: Modelo tabla intermedia pelicula_genero
module.exports = (sequelize, DataTypes) => {
    const PeliculaGenero = sequelize.define('PeliculaGenero', {
        pelicula_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        genero_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        tableName: 'pelicula_genero',
        timestamps: false
    });

    return PeliculaGenero;
};
