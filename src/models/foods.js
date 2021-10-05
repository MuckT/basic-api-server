'use strict'


const Foods = (sequelize, DataTypes) => sequelize.define('Food', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  inStock: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
})

module.exports = Foods
