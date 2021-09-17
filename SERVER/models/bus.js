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
            type:[{String,String}],
            required:true
        },
        passengers:{
            type:[{String,Number}]
        }

    }
)

const Bus = mongoose.model('busses',bus);

module.exports = Bus