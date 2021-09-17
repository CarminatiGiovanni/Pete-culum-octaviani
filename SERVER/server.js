const express = require('express')
const app = express()
const http = require('http')
require('dotenv').config() //FIXME: remove before final version
const path = require('path')
const mongoose = require('mongoose')
const Bus = require('./models/bus')
const {Server} = require('socket.io')
const server = http.createServer(app)
const PORT = process.env.PORT || 3000
const io = new Server(server)

const busState = [] //collect the number of people percent {busID:String,perc:Number}

mongoose
    .connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('DB connected')
        //app.listen(PORT,() => console.log(`>Server is listening on PORT: ${PORT}`)) //FIXME: think about this way to lauch the server
    })
    .catch(err => console.log(err))

io.on('connection', (socket) => {
    let busId;
    socket.on('bus-id',(busid) => {
        socket.join(busid)
        if(busState.filter(element => element.busID === busid) === []) busState.push({busID: busId, lastperc: 0})
        busId = busid
    })

    socket.on('infopos',({busStop,lastPerc})=> { //i get the position and i emit that to all the room
        console.log(busStop,lastPerc)
        io.to(busId).emit('update',{busStop: busStop, lastPerc: lastPerc})
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    });
});

app.use(express.static(path.join(__dirname, 'CLIENT')))

app.get('/a',(req,res) => {
    //res.send(JSON.stringify(req.params))
    // const bus = new Bus({
    //     id:"AA123BB",
    //     hleaves:"15:30",
    //     day:"MON", //MON TUE WEN THU FRI SAT SUN
    //     stops:[
    //         {n:0,stop:'Piazza Brembana',h:'15:30'},
    //         {n:1,stop:'San Giovanni Bianco',h:'15:45'},
    //         {n:2,stop:'San Pellegrino',h:'16:00'},
    //         {n:3,stop:'Zogno',h:'16:15'},
    //         {n:4,stop:'Bergamo',h:'17:30'},
    //     ],
    //     passengers:{
    //         people:10,
    //         bags:5,
    //         suitcases:1,
    //         scooters:1,
    //         prams:0,
    //         strollers:0,
    //         dogs:0
    //     }
    // })

    // bus.save()
    //     .then((result) => {res.send(result)})
    //     .catch(err => console.log("error"))
})
app.get('/all-busses',(req,res) => {
    Bus.find()
        .then(result => {
            res.send(result)
        })
        .catch(err => console.log(err))
})

server.listen(PORT,() => console.log(`>Server is listening on PORT: ${PORT}`))