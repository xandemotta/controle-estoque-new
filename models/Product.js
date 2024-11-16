const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING
  },
  quantidade: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {});

module.exports = Product;
