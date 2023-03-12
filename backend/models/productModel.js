const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter product Name"],
        trim: true
    },
    description:{
        type:String,
        required:[true,"Please Enter product Description"]
    },
    originalPrice: {
        type: Number,
    },
    price:{
        type:Number,
        required:[true,"Please Enter product Price"],
        maxLength:[8,"Price cannot exceed 8 characters"]
    },
    // rating:{
    //     type:Number,
    //     default:0
    // },
    image: {
        type: String,
        required: true,
    },
    highestBidder: {
        type: String,
        default: "a",
    },
    bidders: [
        {
            user_id: {
                type: String,
            },
            user_Added_Amount: {
                type: Number,
            }
        }
    ],
    status: {
        type: String,
        required: true,
        default: "notSold",    
    },
    
    delivery_status : {
        type: String,
        default: "Not Processed Yet"
    },

    biddingStatus: {
        type: String,
        required: true,
        default: "true",
    },
    date : {
        type: String,
        required: true,
    },
    amount_returned: {
        type: String,
        required: true,
        default: "false",
    },
    // images:[
    //     {
    //         public_id:{
    //             type:String,
    //             // required:true
    //         },
    //         url:{
    //             type:String,
    //             // required:true
    //         }
    //     }
    // ],
    // category:{
    //     type:String,
    //     // required:[true,"Please Enter Product Category"],
    // },
    // Stock:{
    //     type:Number,
    //     requied:[true,"Please Enter product Stock"],
    //     maxLength:[4,"Stock cannot exceed 4 characters"],
    //     default:1
    // },
    // numOfReview:{
    //     type:Number,
    //     default:0
    // },
    // reviews:[
    //     {
    //         name:{
    //             type:String,
    //             required:true,
    //         },
    //         rating:{
    //             type:Number,
    //             required:true,
    //         },
    //         camment:{
    //             type:String,
    //             required:true
    //         }
    //     }
    // ],

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required: true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("Product",productSchema);