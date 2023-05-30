const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const DatePayments = db.define('datePayments', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typePay: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transactionAmount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receivedAmount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  collectorId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = DatePayments;
