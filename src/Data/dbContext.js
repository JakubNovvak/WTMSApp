const { Sequelize } = require('sequelize');

// Konfiguracja bazy danych
const sequelize = new Sequelize({
  dialect: 'sqlite',  // Możesz użyć również np. 'mysql', 'postgres', etc.
  storage: './database.sqlite',  // Określenie lokalizacji pliku bazy SQLite
});

module.exports = sequelize;