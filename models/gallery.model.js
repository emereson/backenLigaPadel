const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Gallery = db.define('gallery', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
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

module.exports = Gallery;
