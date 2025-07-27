// DFS: Modelo de Compañía
module.exports = (sequelize, DataTypes) => {
    const Compania = sequelize.define('Compania', {
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
        tableName: 'companias',
        timestamps: false
    });

    return Compania;
};
