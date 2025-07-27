// DFS: Define el modelo de la tabla usuarios y su esquema en Sequelize
module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        nombre: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
        password_hash: { type: DataTypes.TEXT, allowNull: false },
        rol: { type: DataTypes.STRING, allowNull: false, validate: { isIn: [['admin', 'viewer']] } },
        creado_en: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        actualizado_en: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, {
        tableName: 'usuarios',
        timestamps: false
    });

    return Usuario;
};
