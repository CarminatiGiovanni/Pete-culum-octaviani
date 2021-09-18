const mongoose = require('mongoose')

const vespasianus = new mongoose.Schema(
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
        forDisable: {
            type:Boolean,
            required:true
        },
        description: String
    }
)

const Vespasianus = mongoose.model('vespasiani',vespasianus);

module.exports = Vespasianus