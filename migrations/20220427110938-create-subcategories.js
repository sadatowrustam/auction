'use strict';
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('subcategories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            subcategory_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Subcategory name cannot be null",
                    },
                    notEmpty: {
                        msg: "Subcategory name cannot be empty",
                    },
                },
            },
            categoryId: {
                type: DataTypes.INTEGER
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
        await queryInterface.dropTable('subcategories');
    }
};