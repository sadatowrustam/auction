'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notifications.init({
    text: DataTypes.TEXT,
    product_id: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {
    sequelize,
    tableName:"notifications",
    modelName: 'Notifications',
  });
  return Notifications;
};