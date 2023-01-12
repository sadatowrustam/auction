'use strict';

module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
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
            admin_note:{
                type:DataTypes.TEXT,
            },
            categoryId: {
                type: DataTypes.INTEGER,
            },
            subcategoryId: {
                type: DataTypes.INTEGER
            },
            isActive:{
                type:DataTypes.BOOLEAN,
            },
            last_bidder:{
                type:DataTypes.STRING
            },
            expire_date:{
                type:DataTypes.STRING    
           },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        });
    },
    async down(queryInterface, DataTypes) {
        await queryInterface.dropTable('products');
    }
};