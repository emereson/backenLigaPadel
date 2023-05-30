const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const ListVersus = db.define('listVersus', {
  // id: {
  //   primaryKey: true,
  //   autoIncrement: true,
  //   allowNull: false,
  //   type: DataTypes.INTEGER,
  // },
  // calendaryId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },

  // hour: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // tennisCourt: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // idCouple1: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // scoreCouple1: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   defaultValue: '0',
  // },
  // idCouple2: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // scoreCouple2: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   defaultValue: '0',
  // },
  // status: {
  //   type: DataTypes.ENUM('active', 'inProgress', 'finished', 'disabled'),
  //   allowNull: false,
  //   defaultValue: 'active',
  // },
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

module.exports = ListVersus;
