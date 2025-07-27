// DFS: Modelo de la tabla peliculas
module.exports = (sequelize, DataTypes) => {
    const Pelicula = sequelize.define('Pelicula', {
        titulo_espanol: { type: DataTypes.STRING, allowNull: false },
        titulo_original: { type: DataTypes.STRING, allowNull: false },
        sinopsis: DataTypes.TEXT,
        fecha_estreno: DataTypes.DATE,
        pais_estreno: DataTypes.STRING,
        duracion_minutos: DataTypes.INTEGER,
        calificacion: DataTypes.DECIMAL(3, 1),
        trailer_url: DataTypes.TEXT,
        poster_url: DataTypes.TEXT,
        creado_en: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        actualizado_en: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, {
        tableName: 'peliculas',
        timestamps: false,
        indexes: [{ unique: true, fields: ['titulo_espanol', 'titulo_original'] }]
    });

    return Pelicula;
};
