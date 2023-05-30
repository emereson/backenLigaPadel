const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Event = db.define('event', {
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
  subTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  place: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typeEvent: {
    type: DataTypes.ENUM('Liga', 'Torneo', 'Americano'),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rules: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  generalConditions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  requirements: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  changesCancellations: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  coverImg: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:
      'https://www.researchgate.net/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png',
  },
  startDateEvent: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endDateEvent: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rutPlayerLocked1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rutPlayerLocked2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rutPlayerLocked3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rutPlayerLocked4: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rutPlayerLocked5: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  damasA: {
    type: DataTypes.ENUM('yes', 'no'),
    allowNull: true,
    defaultValue: 'no',
  },
  damasB: {
    type: DataTypes.ENUM('yes', 'no'),
    allowNull: true,
    defaultValue: 'no',
  },
  damasC: {
    type: DataTypes.ENUM('yes', 'no'),
    allowNull: true,
    defaultValue: 'no',
  },
  damasD: {
    type: DataTypes.ENUM('yes', 'no'),
    allowNull: true,
    defaultValue: 'no',
  },
  maculina1ra: {
    type: DataTypes.ENUM('yes', 'no'),
    allowNull: true,
    defaultValue: 'no',
  },
  maculina2da: {
    type: DataTypes.ENUM('yes', 'no'),
    allowNull: true,
    defaultValue: 'no',
  },
  maculina3ra: {
    type: DataTypes.ENUM('yes', 'no'),
    allowNull: true,
    defaultValue: 'no',
  },
  maculina4ta: {
    type: DataTypes.ENUM('yes', 'no'),
    allowNull: true,
    defaultValue: 'no',
  },
  maculina5ta: {
    type: DataTypes.ENUM('yes', 'no'),
    allowNull: true,
    defaultValue: 'no',
  },
  maculina6ta: {
    type: DataTypes.ENUM('yes', 'no'),
    allowNull: true,
    defaultValue: 'no',
  },
  mixta: {
    type: DataTypes.ENUM('yes', 'no'),
    allowNull: true,
    defaultValue: 'no',
  },
  coupon1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  discount1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  coupon2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  discount2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('active', 'inProgress', 'finished'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = Event;
