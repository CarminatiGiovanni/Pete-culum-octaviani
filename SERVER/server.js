const express = require('express')
const app = express()
require('dotenv').config() //FIXME: remove before final version
const path = require('path')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

mongoose
    .connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('DB connected')
        //app.listen(PORT,() => console.log(`>Server is listening on PORT: ${PORT}`)) //FIXME: think about this way to lauch the server
    })
    .catch(err => console.log(err))

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'CLIENT')))

app.get('/a',(req,res) => {
    //res.send(JSON.stringify(req.params))
    const blog = new Blog({
        title: "HELLObhydf9ig9dW OLD",
        snippet:"about my self",
        body:"this is absolutely my first blog"
    })

    blog.save()
        .then((result) => {res.send(result)})
        .catch(err => console.log(err))
})

app.get('/all-blogs',(req,res) => {
    Blog.find()
        .then(result => {
            res.send(result)
        })
        .catch(err => console.log(err))
})

app.listen(PORT,() => console.log(`>Server is listening on PORT: ${PORT}`))