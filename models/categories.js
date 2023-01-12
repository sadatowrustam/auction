'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Categories extends Model {
        static associate({ Subcategories, Products }) {
            this.hasMany(Subcategories, { foreignKey: "categoryId", as: "subcategories" })
            this.hasMany(Products, { foreignKey: "categoryId", as: "products" })
        }

    }
    Categories.init({
        category_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Category name cannot be null",
                },
                notEmpty: {
                    msg: "Category name cannot be empty",
                },
            },
        },
        image: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: "categories",
        modelName: 'Categories',
    });
    return Categories;
};