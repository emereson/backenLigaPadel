const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const CalendaryImg = db.define('calendaryImg', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  calendaryImgUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  calendaryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'disabled'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = CalendaryImg;
