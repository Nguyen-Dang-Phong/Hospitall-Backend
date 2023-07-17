'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class allcode extends Model {
    static associate(models) {
    }
  };
  allcode.init({
    key: DataTypes.STRING,
    type: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'allcode',
  });
  return allcode;
};