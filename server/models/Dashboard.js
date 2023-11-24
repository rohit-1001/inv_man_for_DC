const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    data:[
        {
            month:{
                type:String,
                required: true
            },
            year:{
                type:String,
                required: true
            },
            monthly_data:{
                // revenue:{
                //     type: Number,
                //     required: true,
                //     default: 0
                // },	  
                profit:{
                    type: Number,
                    required: true,
                    default: 0
                },
                sales:{
                    type: Number,
                    required: true,
                    default: 0
                }
            }
        }   
    ]
})

const monthlyData = mongoose.model('monthlyData', dashboardSchema)
module.exports = monthlyData;