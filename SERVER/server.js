//...................................require.........................................
const express =             require('express')
const http =                require('http')
const path =                require('path')
const mongoose =            require('mongoose')
const Bus =                 require('./models/bus')
const databaseFunctions =   require('./functions/databaseFunctions')
const {Server} =            require('socket.io')
const bodyParser =          require('body-parser')
const url =                 require('url')
const { type } = require('os')
                            require('dotenv').config() //FIXME: remove before final version

//.................................const..........................................
const app = express()
const server = http.createServer(app)
const io = new Server(server)

const PORT = process.env.PORT || 3000

const busState = [] //collect the number of people percent {busID:String,perc:Number}

//FIXME: delete this hard-programmed code
global.activeBusses = require('./test')
//console.log(global.activeBusses)

//.....................database connection...................................
mongoose
    .connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('DB connected')
        databaseFunctions.find_the_next_bus()
        //app.listen(PORT,() => console.log(`>Server is listening on PORT: ${PORT}`)) //FIXME: think about this way to lauch the server
    })
    .catch(err => console.log(err))

//.........................socket io backend.....................................................
io.on('connection', (socket) => {
    let busId;
    console.log('user has connected')
    socket.on('bus-id',(busid) => {
        //console.log(busid)
        socket.join(busid)
        if(busState.filter(element => element.busID === busid) === []) busState.push({busID: busId, lastperc: 0})
        busId = busid
    })

    socket.on('infopos',({busStop,lastPerc})=> { //i get the position and i emit that to all the room
        //console.log(busStop,lastPerc)
        let timeNow = new Date()
        let timestamp = timeNow.toTimeString().split(' ')[0].substring(0,5)
        io.to(busId).emit('update',{busStop: busStop, lastPerc: lastPerc,timestamp: timestamp})
    })

    socket.on('leaveRoom',(msg)=> {
        socket.leave(busId)
        busid = undefined
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
        socket.leave(busId)
    });
});

//......................EXPRESS.................................
app.use(express.static(path.join(__dirname, 'CLIENT')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/a',databaseFunctions.insertFunction)
app.get('/all-busses',databaseFunctions.selectAllFunction)
app.get('/bus/:id',(req,res) => {
    //console.log(req.params.id)
    res.sendFile(path.join(__dirname,'/CLIENT/HTML/bus_position.html'))
})


app.post('/busPosition', (req,res) => {
    //console.log(req.body)
    const [busSearched] = global.activeBusses.filter(el => el.id === req.body.id)
    //console.log(busSearched)
    if(busSearched === undefined) res.json({'error' : 'error'})
    else res.json(busSearched)
})

app.post('/activeBusses',(req,res) => {
    res.json({'busses':global.activeBusses})
})


server.listen(PORT,() => console.log(`>Server is listening on PORT: ${PORT}`))