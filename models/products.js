'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Products extends Model {
        static associate({ Users, Categories, Subcategories,Images }) {
            this.belongsTo(Categories, { foreignKey: "categoryId", as: "category" })
            this.belongsTo(Subcategories, { foreignKey: "subcategoryId", as: "subcategory" })
            this.hasMany(Images, { foreignKey: "productId", as: "images" })
            // this.belongsToMany(Users, { through: "Likedproducts", as: "liked_users", foreignKey: "productId" })
        }
    }
    Products.init({
        product_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Product name cannot be null",
                },
                notEmpty: {
                    msg: "Product name cannot be empty",
                },
            },
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Title cannot be null",
                },
                notEmpty: {
                    msg: "Title cannot be empty",
                },
            },
        },
        starting_price: {
            type: DataTypes.REAL
        },
        last_price:{
            type:DataTypes.REAL
        },
        isActive: { 
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        admin_note:{
            type:DataTypes.TEXT,
        },
        last_bidder:{
            type:DataTypes.STRING
        },
        expire_date:{
             type:DataTypes.STRING    
        },
        categoryId: {
            type: DataTypes.INTEGER,
        },
        subcategoryId: {
            type: DataTypes.INTEGER
        },
        isLiked:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        isFinished:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    }, {
        sequelize,
        tableName: "products",
        modelName: 'Products',
    });
    return Products;
};