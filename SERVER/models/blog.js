const mongoose = require('mongoose')
//const Schema = mongoose.Schema

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    snippet:{
        type: String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
}, {timestamps: true}); //Schema({object with data}, {options})

const Blog = mongoose.model('blogs',blogSchema) //looks for the collection blogs in the DB

module.exports = Blog