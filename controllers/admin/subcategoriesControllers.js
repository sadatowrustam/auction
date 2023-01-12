const fs = require('fs');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { Categories, Subcategories, Products, Stock } = require('../../models');
const sharp = require("sharp")
exports.addSubcategory = catchAsync(async(req, res, next) => {
    const { category_id, name} = req.body;
    const category = await Categories.findOne({
        where: { category_id },
    });
    if (!category)
        return next(new AppError('Category did not found with that ID', 404));

    const newSubcategory = await Subcategories.create({
        categoryId: category.id,
        name
    });

    return res.status(201).send(newSubcategory);
});

exports.editSubcategory = catchAsync(async(req, res, next) => {
    const { name } = req.body;
    const subcategory = await Subcategories.findOne({
        where: { subcategory_id: req.params.id },
    });
    if (!subcategory)
        return next(new AppError('Sub-category did not found with that ID', 404));
    await subcategory.update({name});

    return res.status(200).send(subcategory);
});

exports.deleteSubcategory = catchAsync(async(req, res, next) => {
    const subcategory = await Subcategories.findOne({
        where: { subcategory_id: req.params.id },
    });

    if (!subcategory)
        return next(new AppError('Sub-category did not found with that ID', 404));;
    await subcategory.destroy();
    return res.status(200).send('Successfully Deleted');
});
exports.getOne = catchAsync(async(req, res, next) => {
    let subcategory_id = req.params.id
    let subcategory = await Subcategories.findOne({ where: { subcategory_id } })
    res.status(200).send(subcategory)
})