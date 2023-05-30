const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const ResultsEventImg = db.define('resultsEventImg', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  resultsEventImgUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resultsEventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'disabled'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = ResultsEventImg;
