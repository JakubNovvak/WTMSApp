const { Sequelize } = require('sequelize');

// --- Konfiguracja bazy danych
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

module.exports = sequelize;