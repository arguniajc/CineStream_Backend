// DFS: Modelo de Actor
module.exports = (sequelize, DataTypes) => {
    const Actor = sequelize.define('Actor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        imagen_url: {
            type: DataTypes.TEXT
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
        tableName: 'actores',
        timestamps: false
    });

    return Actor;
};
