const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const ListVersusImg = db.define('listVersusImg', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  listVersusImgUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  listVersusId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'disabled'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = ListVersusImg;
