const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Inscription = db.define('inscription', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  RutPlayer1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobileNumber1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthDate1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  poloSize1: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'L',
  },
  category1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clubPlay1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  positionPlay1: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Ambos',
  },
  medicalProblem1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  RutPlayer2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobileNumber2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthDate2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  poloSize2: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'L',
  },
  category2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clubPlay2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  positionPlay2: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Ambos',
  },
  medicalProblem2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discountCoupon: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  playerImg: {
    type: DataTypes.STRING,
    defaultValue:
      'https://www.unheval.edu.pe/biblioteca/wp-content/uploads/2020/09/perfil.jpg',
  },
  status: {
    type: DataTypes.ENUM('active', 'removed', 'disabled'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = Inscription;
