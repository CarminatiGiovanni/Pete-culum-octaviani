//...................................require.........................................
const express =             require('express')
const http =                require('http')
const path =                require('path')
const mongoose =            require('mongoose')
const databaseFunctions =   require('./functions/databaseFunctions')
const insertFunctions =     require('./functions/insertFunctions')
const {Server} =            require('socket.io')
const bodyParser =          require('body-parser')
const getPostFunctions =    require('./functions/getPostFunctions')
                            require('dotenv').config() //FIXME: remove before final version

//.................................const..........................................
const app = express()
const server = http.createServer(app)
const io = new Server(server)

const PORT = process.env.PORT || 3000

const busState = [] // [] //collect the number of people percent {busID:String,perc:Number}

global.activeBusses = [] //require('./test') // = []
global.activeChats = {} //list of string:lists of messages
//console.log(global.activeBusses)

//.....................database connection...................................
mongoose
    .connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('DB connected')
        databaseFunctions.find_the_next_bus()
        server.listen(PORT,() => console.log(`>Server is listening on PORT: ${PORT}`))
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

        io.to(socket.id).emit('old_messages',(global.activeChats[busId]))
    })

    socket.on('infopos',({busStop,lastPerc})=> { //i get the position and i emit that to all the room
        //console.log(busStop,lastPerc)
        let timeNow = new Date()
        let timestamp = timeNow.toTimeString().split(' ')[0].substring(0,5)
        io.to(busId).emit('update',{busStop: busStop, lastPerc: lastPerc,timestamp: timestamp})
        global.activeChats[busId].push({busStop: busStop, lastPerc: lastPerc,timestamp: timestamp})
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

app.get('/a',insertFunctions.insertBus)
app.get('/all-busses',databaseFunctions.selectAllFunction)
app.get('/bus/:id',(req,res) => {
    res.sendFile(path.join(__dirname,'/CLIENT/HTML/bus_position.html'))
})

app.get('/insertVespasianus',insertFunctions.insertVespasianus)

app.get('/insertFountains',insertFunctions.insertFountain)


app.post('/busPosition', getPostFunctions.busPosition)

app.post('/activeBusses',(req,res) => {
    res.json({'busses':global.activeBusses})
})