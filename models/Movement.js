const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Movement = sequelize.define('Movement', {
  tipo: {
    type: DataTypes.ENUM('entrada', 'saida'),
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tecnico: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {});

module.exports = Movement;
