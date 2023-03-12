const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    
    customerName: {
        type: String, required: true,   
    },
    address: {
        type: String, required: true,
    },
    city: {
        type: String , required: true,
    },
    state: {
        type: String , required:true,
    },
    country: {
        type: String, required: true,
    },
    pinCode: {
        type: String, required: true,
    },
    phoneNo: {
        type: String, required: true,
    },
    
    productName:{
        type: String, required: true,
    },
    originalPrice: {
        type: Number, required: true,
    },
    soldPrice: {
        type:Number, required: true,
    },
    image :{
        type:String, required: true,
    },
    product_id: {
        type: String,
        required: true,
    },
    seller_id: {
        type: String,
        required: true,
    },
    buyer_id:{
        type: String,
        required: true,
    },
    // paymentInfo: {
    //     id: {
    //         type:String,
    //         required:true,
    //     },
    //     status: {
    //         type: String,
    //         required: true,
    //     },
    // },
    orderStatus:{
        type:String,
        required:true,
        default:"Not Processed Yet",
    },
    createdAt: {
        type: Date,
        default:Date.now,
    },
});

module.exports = mongoose.model("Order" , orderSchema);