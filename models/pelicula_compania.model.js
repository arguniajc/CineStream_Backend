// DFS: Modelo tabla intermedia pelicula_compania
module.exports = (sequelize, DataTypes) => {
    const PeliculaCompania = sequelize.define('PeliculaCompania', {
        pelicula_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        compania_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        tableName: 'pelicula_compania',
        timestamps: false
    });

    return PeliculaCompania;
};
