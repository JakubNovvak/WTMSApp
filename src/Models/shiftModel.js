const { DataTypes } = require('sequelize');
const sequelize = require('../Data/dbContext');


const Shift = sequelize.define('Shift', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    endTime: {
      type: DataTypes.TIME,
      allowNull: true,
    }
  }, {
  tableName: 'Shifts'
});

  Shift.associate = (models) => {
    Shift.belongsTo(models.User, { foreignKey: 'userId' });
  };

  //Synchronizacja Modelu z bazą danych - tworzenie tabeli, jeżeli nie istnieje

Shift.sync({force: false})
.then(() => {
  console.log("Tabela userów została zsynchornizowana.");
})
.catch((err) => {
  console.error("Błąd sychnronizacji bazy danych: ", err);
})

module.exports = Shift;