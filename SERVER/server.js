const express = require('express')
const app = express()
require('dotenv').config() //FIXME: remove before final version
const path = require('path')
const mongoose = require('mongoose')
const Bus = require('./models/bus')

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
    const bus = new Bus({
        id:"AA123BB",
        hleaves:"15:30",
        day:"MON", //MON TUE WEN THU FRI SAT SUN
        stops:[
            {n:0,stop:'Piazza Brembana',h:'15:30'},
            {n:1,stop:'San Giovanni Bianco',h:'15:45'},
            {n:2,stop:'San Pellegrino',h:'16:00'},
            {n:3,stop:'Zogno',h:'16:15'},
            {n:4,stop:'Bergamo',h:'17:30'},
        ],
        passengers:{
            people:10,
            bags:5,
            suitcases:1,
            scooters:1,
            prams:0,
            strollers:0,
            dogs:0
        }
    })

    bus.save()
        .then((result) => {res.send(result)})
        .catch(err => console.log("error"))
})

app.get('/all-blogs',(req,res) => {
    Blog.find()
        .then(result => {
            res.send(result)
        })
        .catch(err => console.log(err))
})

app.listen(PORT,() => console.log(`>Server is listening on PORT: ${PORT}`))