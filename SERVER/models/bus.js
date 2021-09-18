const mongoose = require('mongoose')

const bus = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true
        },
        hleaves:{
            type:String,
            required:true
        },
        day:{
            type:String,
            required:true
        },
        stops:{
            type:[{n:Number,stop:String,h:String}],
            required:true
        }
    }
)

const Bus = mongoose.model('busses',bus);

module.exports = Bus