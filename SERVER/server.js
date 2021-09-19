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
//const generateAndSave =     require('./testing/populateDb')
                            require('dotenv').config() //FIXME: remove before final version

//.................................const..........................................
const app = express()
const server = http.createServer(app)
const io = new Server(server)

const PORT = process.env.PORT || 3000

const busState = [] // [] //collect the number of people percent {busID:String,perc:Number}

global.activeBusses = [] //require('./test') // = []
global.activeChats = {} //list of string:lists of messages


// global.activeBusses.forEach(element => {
//     global.activeChats[element.id] = []
// });

// console.log(activeChats)

//console.log(global.activeBusses)

//.....................database connection...................................
mongoose
    .connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('DB connected')
        databaseFunctions.find_the_next_bus()

        //generateAndSave()

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
        //console.log(busId)
        try{global.activeChats[busId].push({busStop: busStop, lastPerc: lastPerc,timestamp: timestamp})}catch(e){console.log('error')}
    })

    socket.on('leaveRoom',(msg)=> {
        socket.leave(busId)
        busId = undefined
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
        socket.leave(busId)
    });
});

//......................EXPRESS.................................

app.use(express.static(path.join(__dirname,'/CLIENT'))) //FOR CSS
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',(req,res) => {
    console.log('hellow orld') 
    res.sendFile(path.join(__dirname,'/CLIENT/index.html'))
})
app.get('/CURSOR',(req,res) => {
    res.sendFile(path.join(__dirname,'/CLIENT/HTML/bus_list.html'))
})

app.get('/all-busses',databaseFunctions.selectAllFunction)
app.get('/bus/:id',(req,res) => {
    res.sendFile(path.join(__dirname,'/CLIENT/HTML/bus_position.html'))
})

app.get('/jsonToAddToDB',(req,res) => res.sendFile(path.join(__dirname,'CLIENT','HTML','insert.html')))


app.post('/busPosition', getPostFunctions.busPosition)
app.post('/jsonToAddToDB',(req,res) => {
    //console.log(req.body.data)
    if(req.body.pw === process.env.PWinsert) insertFunctions.insertBus(req.body.data)
    res.status(200)
})

app.post('/activeBusses',(req,res) => {
    res.json({'busses':global.activeBusses})
})