const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const GalleryImg = db.define('galleryImg', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  galleryImgUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  galleryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'disabled'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = GalleryImg;
