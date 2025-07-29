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

// 🔄 Selección de sequelize principal/secundaria
let sequelizePrincipal, sequelizeSecundaria;

if (process.env.USE_LOCAL_AS_PRIMARY === 'true') {
  sequelizePrincipal = sequelize2;
  sequelizeSecundaria = sequelize1;
} else {
  sequelizePrincipal = sequelize1;
  sequelizeSecundaria = sequelize2;
}

const baseActiva = process.env.USE_LOCAL_AS_PRIMARY === 'true' ? 'LOCAL (CineStream)' : 'REMOTA (Supabase)';
console.log(`📦 Base PRINCIPAL activa: ${baseActiva}`);

// Exportar las instancias de Sequelize
module.exports = {
  sequelize1,
  sequelize2,
  sequelizePrincipal,
  sequelizeSecundaria
};
