const Order = require("../models/orderModels");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

// Create new Order
exports.newOrder = catchAsyncError(async (req , res , next) => {
    
    const order = await Order.create(req.body);

    res.status(201).json({
        success: true,
        order,
    });
});

// Get Single Order
exports.getSingleOrder = catchAsyncError(async(req , res , next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});

// Get logged in user Orders
exports.myOrders = catchAsyncError(async(req , res , next) => {
    const order = await Order.find({user: req.user._id});

    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});

// Get all orders -- Admin
exports.getAllOrders = catchAsyncError(async(req , res , next) => {
    
    const apiFeature = new ApiFeatures(Order.find() , req.query).search().filter();
    const orders = await apiFeature.query;
    res.status(200).json({
        success: true,
        orders,
    });
});

// Update Order Status -- Admin
exports.updateOrder = catchAsyncError(async(req , res , next) => {
    let order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this id", 404));
    }

    order = await Order.findByIdAndUpdate(req.params.id , req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success: true,
        order
    });
});

async function updateStock(id , quantity){
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false});
}


// delete order -- Admin
exports.deleteOrder = catchAsyncError(async(req , res , next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this id", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });
});




