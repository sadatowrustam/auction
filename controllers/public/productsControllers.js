const {
    Products,
    Images,
} = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
exports. getProducts = catchAsync(async(req, res) => {
    const limit = req.query.limit || 10;
    const { offset } = req.query;
    var order, where;
    const products = await Products.findAll({
        isActive: true,
        order,
        limit,
        offset,
        include: [{
            model: Images,
            as: "images"
        }, ],
        where
    });
    return res.status(200).json(products);
});
// Search
exports.getOneProduct = catchAsync(async(req, res, next) => {
    const product_id = req.params.id
    const product = await Products.findOne({
        where: { product_id },
        include: [
            {
                model: Images,
                as: "images"
            }
        ]
    })
    if (!product) {
        return next(new AppError("Can't find product with that id"), 404);
    }

    return res.send({ product })
})
