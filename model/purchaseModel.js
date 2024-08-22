const mongoose = require('mongoose');

const purchaseModel = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    idPurchase:{
        type:String,
    },
    price:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    DateCurrent:{
        type:String,
        required:true
    },
    DispatchTime:{
        type:String,
        required:true
    },
    DelivertyTime:{
        type:String,
        required:true
    }
})

module.exports= mongoose.model('purchase',purchaseModel)