const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const ResultsEvent = db.define('resultsEvent', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  typeEvent: {
    type: DataTypes.ENUM('Liga', 'Torneo', 'Americano'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'disabled'),
    allowNull: false,
    defaultValue: 'active',
  },
  important: {
    type: DataTypes.ENUM('yes', 'no'),
    allowNull: false,
  },
});

module.exports = ResultsEvent;
