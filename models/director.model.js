// DFS: Modelo de Director
module.exports = (sequelize, DataTypes) => {
    const Director = sequelize.define('Director', {
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
        tableName: 'directores',
        timestamps: false
    });

    return Director;
};
