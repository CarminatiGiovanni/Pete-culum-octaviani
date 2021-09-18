const mongoose = require('mongoose')

const fountain = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true
        },
        coordX: {
            type:Number,
            required:true
        },
        coordY: {
            type:Number,
            required:true
        },
        closed: {
            type:Boolean,
            default:false
        },
        potable: {
            type:Boolean,
            required:true
        },
        description: String
    }
)

const Fountain = mongoose.model('fountains',fountain);

module.exports = Fountain