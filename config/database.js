// DFS: Configuración de conexión Sequelize usando variables de entorno
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false, // DFS: Desactiva logs SQL en consola
    }
);

module.exports = { sequelize };
