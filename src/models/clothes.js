'use strict'

const Clothes = (sequelize, DataTypes) => sequelize.define('Clothes', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  designer: {
    type: DataTypes.STRING,
    allowNull: true
  }
})

module.exports = Clothes
