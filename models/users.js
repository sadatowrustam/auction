'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {

        static associate({ Orderproducts, Products }) {
            // this.hasMany(Orderproducts, { foreignKey: "userId", as: "user_order_products" })
            // this.belongsToMany(Products, { through: "Productbids", as: "liked_products", foreignKey: "userId" })
        }
    }
    Users.init({
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        username: DataTypes.STRING,
        nickname: DataTypes.STRING,
        user_phone: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
        address:DataTypes.STRING
    }, {
        sequelize,
        tableName: "users",
        modelName: 'Users',
    });
    return Users;
};