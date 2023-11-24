const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    c_email: {
        type: String,
        required: true
    },
    v_email: {
        type: String,
        required: true
    },
    products:[ 
        {
            name:{
                type:String,
                required: true
            },
            quantity:{
                type:Number,
                required: true
            },
            pid:{
                type:String,
                required: true
            }
        }
    ],
    status:{
        type: String,
        default: "Requested",
        required: true
    }
})


const Order = mongoose.model('order', orderSchema);
module.exports = Order;