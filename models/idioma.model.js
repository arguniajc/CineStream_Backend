// DFS: Modelo de Idioma
module.exports = (sequelize, DataTypes) => {
    const Idioma = sequelize.define('Idioma', {
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
        creado_en: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        actualizado_en: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'idiomas',
        timestamps: false
    });

    return Idioma;
};
