'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productbids extends Model {
    static associate() {
    }
  }
  Productbids.init({
    product_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
    bid: DataTypes.REAL
  }, {
    sequelize,
    tableName:"productbids",
    modelName: 'Productbids',
  });
  return Productbids;
};