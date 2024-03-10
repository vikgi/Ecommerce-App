const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorhandler");
const cloudinary = require("cloudinary");


//Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    let images = [];
    if(typeof req.body.images === "string"){
        images.push(req.body.images);
    }
    else{
        images = req.body.images;
    }

    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLink.push({
            public_id: result.public_id,
            url: result.url,
        });
    }

    req.body.images = imagesLink;
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});



//get all products

exports.getAllProducts = catchAsyncErrors(async (req, res) =>{
    const resultPerPage = 2;
    const productCount = await Product.countDocuments();

    //without pagination
    const apiFeature1 = new ApiFeatures(Product.find(), req.query).search().filter()
    
    let products_no_pagination = await apiFeature1.query;
    let filteredProductsCount = products_no_pagination.length;
    //with pagination
    const apiFeature2 = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
     //after applying pagination
    const products = await apiFeature2.query;

    res.status(200).json({
        sucess:true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount,
    });

});


//get all products --Admin

exports.getAdminProducts = catchAsyncErrors(async (req, res) =>{
    const products = await Product.find();
    res.status(200).json({
        sucess:true,
        products,
    });

});

// Update Product --Admin


exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("product not found", 404));
    }

    let images = [];
    if(typeof req.body.images === "string"){
        images.push(req.body.images);
    }
    else{
        images = req.body.images;
    }


    if(images !== undefined){

        for (let i = 0; i < product.images.length; i++){
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        
        }

        const imagesLink = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLink.push({
                public_id: result.public_id,
                url: result.url,
            });
        }

    req.body.images = imagesLink;
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success: true,
        product
    })
});

//Delete Product
exports.deleteProduct = catchAsyncErrors(async(req, res, next) => {
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("product not found", 404));
    }

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        
    }

    await Product.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success:true,
        message: "product deleted successfully"
    })
});

exports.getProductDetails = catchAsyncErrors(async (req, res, next) =>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product not found", 404));
    }

    res.status(200).json({
        success:true,
        product
    })

});

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const {rating, comment, productId} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach((rev) => {
            if(rev.user.toString() === req.user._id.toString())
            (rev.rating = rating), (rev.comment = comment);
        });
    }
    else{
        product.reviews.push(review);
        product.numofReviews = product.reviews.length
    }
    
    let avg = 0;

    product.reviews.forEach(rev => {
        avg += rev.rating
    })
    product.ratings = avg/ product.reviews.length;

    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success: true,
    })
})  

//Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

//Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());




    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating
    });

    let ratings = 0;

    if(reviews.length === 0){
        ratings = 0;
    }
    else{
        ratings = avg/reviews.length;
    }

    const numofReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numofReviews,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });



    res.status(200).json({
        success: true,
    });
})