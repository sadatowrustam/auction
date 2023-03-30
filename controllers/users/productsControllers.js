const { Op } = require('sequelize');
const {
    Products,
    Categories,
    Brands,
    Images,
    Subcategories,
    Productbids,
    Notifications,
    Likedproducts
} = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
exports.getProducts = catchAsync(async(req, res) => {
    const limit = req.query.limit || 10;
    const { offset } = req.query ||0 ;
    var order, where;
    where.userId=req.user.id
    let products = await Products.findAll({
        order:[["updatedAt", "DESC"]],
        limit,
        offset,
        include: [{
                model: Images,
                as: "images"
            }
        ],
        where
    });
    return res.status(200).send(products);
});
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
    const myBid=await Productbids.findOne({userId:req.user.id,productId:product.id})
    const likeProduct=await Likedproducts.findOne({where:{userId:req.user.id,productId:product.id}})
    if(likeProduct) product.isLiked=true
    return res.send({ product,myBid })
})
exports.addProduct=catchAsync(async(req,res,next)=>{
    const category = await Categories.findOne({
        where: { category_id: req.body.category_id },
    });
    req.body.isActive = false
    req.body.userId=req.user.id
    if (!category)
        return next(new AppError('Category did not found with that ID', 404));
    if (req.body.subcategory_id) {
        const subcategory = await Subcategories.findOne({
            where: { subcategory_id: req.body.subcategory_id },
    });
    if (!subcategory)
        return next(new AppError('Sub-category did not found with that ID', 404));
    req.body.subcategoryId = subcategory.id;
    }
    if (req.body.brand_id) {
        const brand = await Brands.findOne({
            where: { brand_id: req.body.brand_id }
        })
        if (!brand)
            return next(new AppError("Brand did not found with that Id"), 404)
        req.body.brandId = brand.id
    }
    req.body.categoryId = category.id;
    const newProduct = await Products.create(req.body);
    return res.status(201).send(newProduct)
    
})
exports.placeBid=catchAsync(async (req,res,next)=>{
    const product = await Products.findOne({
        where: { product_id:req.params.id },
    })
    //notification ugratmaly
    const productbid=await Productbids.findOne({where:{user_id:req.user.user_id,product_id:product.product_id}});
    await Productbids.create({user_id:req.user.user_id,product_id:product.product_id,bid:req.body.bid})
    await product.update({
        last_price:req.body.bid,
        last_bidder:req.user.user_id
    })
    if (!product) {
        return next(new AppError("Can't find product with that id"), 404);
    }
    await Notifications.create({text:"Senin bidini gecdi",product_id:product.product_id,user_id:productbid.user_id})
    return res.status(200).send(product)
})
exports.getMyBids=catchAsync(async(req,res,next)=>{
    let array=[]
    const myBids = await Productbids.findAll({where:{user_id:req.user.user_id}})
    for(const myBid of myBids){
        const product=await Products.findOne({where:{product_id:myBid.product_id},include:{model:Images,as:"images"}})
        const obj={
            name:product.name,
            starting_price:product.starting_price,
            my_bid:myBid.bid,
            expire_date:product.expire_date,
            last_bid:product.last_bid,
            image:product.images[0].image 
        }
        array.push(obj)
    }
    return res.send(array)
})
exports.deleteBid=catchAsync(async(req,res,next)=>{
    const product = await Products.findOne({
        where: { product_id:req.params.id },
        include: [
            {
                model: Images,
                as: "images"
            }
        ]
    })
    const productbid=await Productbids.findOne({where: { product_id:product.product_id,user_id:req.user.user_id}})
    if(product.last_bid==productbid.bid){
        const productbids=await Productbids.findAll({where:{product_id:product.product_id},order:[["bid","DESC"]],limit:2})
        await product.update({last_bid:productbids[1].bid})
        await Notifications.create({text:"Senin bidini in uly bid boldy",product_id:product.product_id,user_id:productbid.user_id})
    }
    await productbid.destroy()
    return res.send("Sucess")
})
 