const { Sequelize } = require('sequelize');
require('dotenv').config();

// 🔹 Configuración para la base REMOTA (Supabase)
const sequelize1 = new Sequelize(
  process.env.DB1_NAME,
  process.env.DB1_USER,
  process.env.DB1_PASSWORD,
  {
    host: process.env.DB1_HOST,
    port: process.env.DB1_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  }
);

// 🔹 Configuración para la base LOCAL
const sequelize2 = new Sequelize(
  process.env.DB2_NAME,
  process.env.DB2_USER,
  process.env.DB2_PASSWORD,
  {
    host: process.env.DB2_HOST,
    port: process.env.DB2_PORT,
    dialect: 'postgres',
    logging: false
  }
);

// 🔄 Selección de principal/secundaria
let dbPrincipal, dbSecundaria;

if (process.env.USE_LOCAL_AS_PRIMARY === 'true') {
  dbPrincipal = sequelize2;
  dbSecundaria = sequelize1;
} else {
  dbPrincipal = sequelize1;
  dbSecundaria = sequelize2;
}

const baseActiva = process.env.USE_LOCAL_AS_PRIMARY === 'true' ? 'LOCAL (CineStream)' : 'REMOTA (Supabase)';
console.log(`📦 Base PRINCIPAL activa: ${baseActiva}`);

module.exports = {
  sequelize1,
  sequelize2,
  dbPrincipal,
  dbSecundaria
};
