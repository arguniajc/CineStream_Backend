// DFS: Modelo de tabla intermedia pelicula_actor con campo personaje
module.exports = (sequelize, DataTypes) => {
    const PeliculaActor = sequelize.define('PeliculaActor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pelicula_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        actor_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        personaje: {
            type: DataTypes.STRING
        },
        creado_en: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        actualizado_en: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'pelicula_actor',
        timestamps: false,
        indexes: [
            { unique: true, fields: ['pelicula_id', 'actor_id'] }
        ]
    });

    return PeliculaActor;
};
