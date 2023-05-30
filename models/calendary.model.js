const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Calendary = db.define('calendary', {
  // id: {
  //   primaryKey: true,
  //   autoIncrement: true,
  //   allowNull: false,
  //   type: DataTypes.INTEGER,
  // },
  // eventId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
  // date: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // place: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },

  // hour: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // category: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },

  // status: {
  //   type: DataTypes.ENUM('active', 'inProgress', 'finished', 'disabled'),
  //   allowNull: false,
  //   defaultValue: 'active',
  // },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
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

module.exports = Calendary;
