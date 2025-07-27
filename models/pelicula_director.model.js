// DFS: Modelo tabla intermedia pelicula_director
module.exports = (sequelize, DataTypes) => {
    const PeliculaDirector = sequelize.define('PeliculaDirector', {
        pelicula_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        director_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        tableName: 'pelicula_director',
        timestamps: false
    });

    return PeliculaDirector;
};
